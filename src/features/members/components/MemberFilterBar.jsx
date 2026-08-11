"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose 
} from "@/components/ui/drawer";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock data for filters
const filterOptions = {
  districts: [
    { value: "kaski", en: "Kaski", np: "कास्की" },
    { value: "syangja", en: "Syangja", np: "स्याङ्जा" },
    { value: "tanahun", en: "Tanahun", np: "तनहुँ" },
    { value: "gorkha", en: "Gorkha", np: "गोरखा" },
    { value: "lamjung", en: "Lamjung", np: "लमजुङ" },
    { value: "nawalpur", en: "Nawalpur", np: "नवलपुर" },
    { value: "mustang", en: "Mustang", np: "मुस्ताङ" },
    { value: "myagdi", en: "Myagdi", np: "म्याग्दी" },
    { value: "parbat", en: "Parbat", np: "पर्वत" },
    { value: "baglung", en: "Baglung", np: "बागलुङ" },
    { value: "manang", en: "Manang", np: "मनाङ" },
  ],
  positions: [
    { value: "chairperson", en: "Chairperson", np: "अध्यक्ष" },
    { value: "vice-chairperson", en: "Vice Chairperson", np: "उपाध्यक्ष" },
    { value: "secretary", en: "Secretary", np: "सचिव" },
    { value: "joint-secretary", en: "Joint Secretary", np: "सह-सचिव" },
    { value: "treasurer", en: "Treasurer", np: "कोषाध्यक्ष" },
    { value: "member", en: "Member", np: "सदस्य" },
  ],
  committees: [
    { value: "province", en: "Province Committee", np: "प्रदेश कमिटी" },
    { value: "district", en: "District Committee", np: "जिल्ला कमिटी" },
    { value: "ward", en: "Ward Committee", np: "वडा कमिटी" },
  ],
  statuses: [
    { value: "active", en: "Active", np: "सक्रिय" },
    { value: "inactive", en: "Inactive", np: "निष्क्रिय" },
  ]
};

export function MemberFilterBar({ isNepali, className }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state to manage filter selections
  const [filters, setFilters] = useState({
    district: searchParams.get("district") || "",
    position: searchParams.get("position") || "",
    committee: searchParams.get("committee") || "",
    status: searchParams.get("status") || "",
  });

  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update URL whenever filters change
  const applyFilters = useCallback((newFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] && newFilters[key] !== "all") {
        params.set(key, newFilters[key]);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    applyFilters(updated);
  };

  const clearFilters = () => {
    const cleared = { district: "", position: "", committee: "", status: "" };
    setFilters(cleared);
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Object.values(filters).some(val => val && val !== "all");

  const renderFilterSelect = (key, label, options) => (
    <div className="flex flex-col gap-1.5 min-w-[160px] flex-1">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
        {label}
      </label>
      <Select value={filters[key] || "all"} onValueChange={(val) => handleFilterChange(key, val)}>
        <SelectTrigger className="w-full bg-background border-border/60 focus:ring-primary/20 h-11 rounded-xl cursor-pointer">
          <SelectValue placeholder={isNepali ? "सबै" : "All"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="cursor-pointer font-medium text-primary">
            {isNepali ? "सबै (All)" : "All"}
          </SelectItem>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
              {isNepali ? opt.np : opt.en}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  if (!isMounted) return null; // Avoid hydration mismatch

  return (
    <div className={cn("w-full py-1", className)}>
      {/* Desktop & Tablet View (Hidden on mobile) */}
      <div className="hidden md:flex flex-row items-end gap-4 w-full">
        {renderFilterSelect("district", isNepali ? "जिल्ला" : "District", filterOptions.districts)}
        {renderFilterSelect("position", isNepali ? "पद" : "Position", filterOptions.positions)}
        {renderFilterSelect("committee", isNepali ? "कमिटी" : "Committee", filterOptions.committees)}
        {renderFilterSelect("status", isNepali ? "स्थिति" : "Status", filterOptions.statuses)}
        
        <Button 
          variant="outline" size="crm-primary" 
          onClick={clearFilters}
          className="h-11 px-6 bg-white dark:bg-card border-border/60 hover:bg-muted text-foreground flex items-center gap-2 rounded-xl cursor-pointer ml-auto"
        >
          <X className="w-4 h-4" />
          {isNepali ? "हटाउनुहोस्" : "Reset"}
        </Button>
      </div>

      {/* Mobile View: Bottom Sheet Drawer */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="crm-primary" className="w-full h-12 rounded-xl border-border/80 shadow-sm flex items-center justify-center gap-2 bg-background text-foreground cursor-pointer">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-semibold">{isNepali ? "फिल्टर गर्नुहोस्" : "Filters"}</span>
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4 pb-6 pt-2">
            <DrawerHeader className="px-0 pt-0 text-left">
              <DrawerTitle className="text-xl font-bold flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                {isNepali ? "फिल्टर विकल्पहरू" : "Filter Options"}
              </DrawerTitle>
            </DrawerHeader>
            
            <div className="flex flex-col gap-6 py-4">
              {renderFilterSelect("district", isNepali ? "जिल्ला" : "District", filterOptions.districts)}
              {renderFilterSelect("position", isNepali ? "पद" : "Position", filterOptions.positions)}
              {renderFilterSelect("committee", isNepali ? "कमिटी" : "Committee", filterOptions.committees)}
              {renderFilterSelect("status", isNepali ? "स्थिति" : "Status", filterOptions.statuses)}
            </div>

            <DrawerFooter className="px-0 pt-4 flex-row gap-3">
              <Button 
                variant="outline" size="crm-primary" 
                onClick={clearFilters}
                className="flex-1 h-12 rounded-xl cursor-pointer"
                disabled={!hasActiveFilters}
              >
                {isNepali ? "रिसेट" : "Reset"}
              </Button>
              <DrawerClose asChild>
                <Button className="flex-1 h-12 rounded-xl cursor-pointer">
                  {isNepali ? "लागू गर्नुहोस्" : "Apply"}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
