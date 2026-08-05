"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2, User, Building, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Inline debounce for safety
function useDebounceValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function GlobalMemberSearch({ isNepali }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 300);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    let isMounted = true;
    
    async function searchMembers() {
      setLoading(true);
      try {
        const res = await fetch(`/api/public/members/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        
        if (isMounted) {
          if (data.success) {
            setResults(data.data);
            setIsOpen(true);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    searchMembers();

    return () => { isMounted = false };
  }, [debouncedQuery]);

  // Group results
  const centralMembers = results.filter(m => m.organizationLevel === 'Central');
  const provinceMembers = results.filter(m => m.organizationLevel === 'Province' || m.organizationLevel === 'PROVINCE');
  const districtMembers = results.filter(m => m.organizationLevel === 'District' || m.organizationLevel === 'DISTRICT');

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? <span key={index} className="bg-yellow-200 dark:bg-yellow-900/50 text-gray-900 dark:text-yellow-100 px-0.5 rounded">{part}</span> : part
    );
  };

  return (
    <div className="relative z-50 w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          )}
        </div>
        
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 text-base bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl leading-5 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm group-focus-within:shadow-md dark:text-white"
          placeholder={isNepali ? "सदस्य, पद वा जिल्ला खोज्नुहोस्..." : "Search members, positions, or districts..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        
        {/* Keyboard shortcut hint */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none hidden sm:flex">
          <span className="text-xs text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded bg-gray-50 dark:bg-gray-800">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden max-h-[70vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          
          {results.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              {isNepali ? "कुनै नतिजा फेला परेन।" : "No results found."}
            </div>
          ) : (
            <div className="py-2">
              
              {/* Central Results */}
              {centralMembers.length > 0 && (
                <div className="mb-4">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                    <Building className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <h4 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {isNepali ? "केन्द्रीय कमिटी" : "Central Committee"}
                    </h4>
                  </div>
                  <ul className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {centralMembers.map(member => (
                      <MemberSearchResultItem key={member._id} member={member} isNepali={isNepali} query={query} highlightText={highlightText} />
                    ))}
                  </ul>
                </div>
              )}

              {/* Province Results */}
              {provinceMembers.length > 0 && (
                <div className="mb-4">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {isNepali ? "प्रदेश कमिटी" : "Province Committee"}
                    </h4>
                  </div>
                  <ul className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {provinceMembers.map(member => (
                      <MemberSearchResultItem key={member._id} member={member} isNepali={isNepali} query={query} highlightText={highlightText} />
                    ))}
                  </ul>
                </div>
              )}

              {/* District Results */}
              {districtMembers.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <h4 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {isNepali ? "जिल्ला कमिटीहरू" : "District Committees"}
                    </h4>
                  </div>
                  <ul className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {districtMembers.map(member => (
                      <MemberSearchResultItem key={member._id} member={member} isNepali={isNepali} query={query} highlightText={highlightText} />
                    ))}
                  </ul>
                </div>
              )}
              
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MemberSearchResultItem({ member, isNepali, query, highlightText }) {
  const name = isNepali ? member.name?.np || member.name?.en : member.name?.en;
  let position = "";
  if (member.position_id && member.position_id.name) {
    position = isNepali ? member.position_id.name.np || member.position_id.name.en : member.position_id.name.en;
  } else if (member.position) {
    position = isNepali ? member.position.np || member.position.en : member.position.en;
  }
  
  const district = member.district?.name ? (isNepali ? member.district.name.np || member.district.name.en : member.district.name.en) : "";

  return (
    <li>
      <Link 
        href={`/${isNepali ? "np" : "en"}/members/${member.slug}`}
        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
          {member.photo || member.profilePhotoId ? (
            <Image 
              src={member.photo || "/placeholder.jpg"}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <User className="w-5 h-5" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
            {highlightText(name, query)}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {highlightText(position, query)}
            </p>
            {district && (
              <>
                <span className="text-gray-300 dark:text-gray-700">&bull;</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-semibold">
                  {highlightText(district, query)}
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
