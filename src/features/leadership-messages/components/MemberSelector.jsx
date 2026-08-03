"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Check, Loader2, X } from "lucide-react";
import { searchMembersAction } from "@/actions/member.actions";

export function MemberSelector({ value, onChange, disabled, existingMessageError }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch options when query changes
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const res = await searchMembersAction(query);
        if (res.success) {
          setOptions(res.data);
        }
      } catch (error) {
        console.error("Failed to search members", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      if (isOpen) fetchOptions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, isOpen]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Linked Member <span className="text-red-500">*</span>
      </label>
      
      {value ? (
        // Selected State
        <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            {value.photo ? (
              <img src={value.photo} alt={value.name?.en} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {value.name?.en?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                {value.name?.en}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {value.position_id?.name?.en || "Member"}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {value.organizationLevel === "DISTRICT" ? `District: ${value.district?.name?.en || 'Unknown'}` : "Province Committee"}
              </div>
            </div>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        // Search State
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member by name, position, or district..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              disabled={disabled}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-slate-400" />
            )}
          </div>

          {/* Dropdown Options */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {options.length > 0 ? (
                options.map((member) => (
                  <button
                    key={member._id}
                    type="button"
                    onClick={() => {
                      onChange(member);
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="w-full text-left flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800"
                  >
                    {member.photo ? (
                      <img src={member.photo} alt={member.name?.en} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {member.name?.en?.charAt(0) || "U"}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-sm text-slate-900 dark:text-white">
                        {member.name?.en}
                      </div>
                      <div className="text-xs text-slate-500">
                        {member.position_id?.name?.en || "Member"} • {member.organizationLevel === "DISTRICT" ? member.district?.name?.en : "Province"}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-slate-500">
                  {loading ? "Searching..." : "No members found."}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {existingMessageError && (
        <p className="mt-1 text-sm text-red-500">{existingMessageError}</p>
      )}
    </div>
  );
}
