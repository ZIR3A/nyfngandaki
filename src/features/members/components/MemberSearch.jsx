"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, User, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MemberSearch({ isNepali, locale = "en", className }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasSearched, setHasSearched] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Debounced Search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/public/members/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsSearching(false);
        setHasSearched(true);
        setActiveIndex(-1);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        window.location.href = `/${locale}/members/${results[activeIndex].slug}`;
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getName = (member) => isNepali && member.name?.np ? member.name.np : member.name?.en || "";
  const getPosition = (member) => isNepali && member.position?.np ? member.position.np : member.position?.en || "";
  const getDistrict = (member) => isNepali && member.district?.name?.np ? member.district.name.np : member.district?.name?.en || member.province || "";

  return (
    <div className={cn("relative w-full mx-auto", className)} ref={dropdownRef}>
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        <div className="relative group flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            className="w-full pl-10 pr-10 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-base placeholder:text-muted-foreground"
            placeholder={isNepali ? "नाम, पद वा जिल्लाबाट खोज्नुहोस्..." : "Search by name, position, or district..."}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            role="combobox"
            aria-controls="search-results"
          />

          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            {isSearching ? (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            ) : query ? (
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <button 
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-card border border-border/60 rounded-xl hover:bg-muted transition-colors font-medium text-foreground cursor-pointer whitespace-nowrap"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          {isNepali ? "फिल्टर" : "Filters"}
        </button>
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim().length >= 2 && (
        <div 
          id="search-results"
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-background border border-border shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
        >
          <div className="max-h-[400px] overflow-y-auto p-2">
            {!isSearching && hasSearched && results.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center text-muted-foreground">
                <User className="h-10 w-10 mb-3 opacity-40" />
                <p className="font-medium text-foreground">{isNepali ? "कुनै सदस्य फेला परेन" : "No members found"}</p>
                <p className="text-sm mt-1 opacity-80">
                  {isNepali ? "फरक हिज्जे प्रयास गर्नुहोस् वा अर्को नाम खोज्नुहोस्।" : "Try a different spelling or keyword."}
                </p>
              </div>
            ) : (
              <ul className="space-y-1">
                {results.map((member, idx) => (
                  <li key={member._id} role="option" aria-selected={activeIndex === idx}>
                    <Link
                      href={`/${locale}/members/${member.slug}`}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer",
                        activeIndex === idx ? "bg-primary/5 border border-primary/20" : "hover:bg-muted border border-transparent"
                      )}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => setIsOpen(false)}
                    >
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0 border border-border">
                        {member.photo ? (
                          <img src={member.photo} alt={getName(member)} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                            {getName(member).charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{getName(member)}</h4>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 truncate bg-muted/50 px-2 py-0.5 rounded-md">
                            <Briefcase className="w-3 h-3" />
                            {getPosition(member)}
                          </span>
                          {getDistrict(member) && (
                            <span className="flex items-center gap-1.5 truncate bg-muted/50 px-2 py-0.5 rounded-md">
                              <MapPin className="w-3 h-3" />
                              {getDistrict(member)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {results.length > 0 && (
            <div className="px-4 py-3 bg-muted/30 border-t border-border flex justify-between items-center text-xs text-muted-foreground font-medium">
              <span>{results.length} {isNepali ? "नतिजाहरू" : "results found"}</span>
              <span className="flex items-center gap-2">
                {isNepali ? "नेभिगेट गर्न ⬆ ⬇ थिच्नुहोस्, छनोट गर्न ↵ Enter थिच्नुहोस्" : "Press ⬆ ⬇ to navigate, ↵ Enter to select"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
