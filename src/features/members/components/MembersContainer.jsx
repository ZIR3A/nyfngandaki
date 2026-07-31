"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { MemberCard, MemberCardSkeleton } from "./MemberCard";

function MemberGroup({ id, title, members, isNepali }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(`member-group-${id}`);
    if (saved !== null) {
      setIsExpanded(saved === "true");
    }
  }, [id]);

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    localStorage.setItem(`member-group-${id}`, next.toString());
  };

  if (members.length === 0) return null;
  if (!isMounted) return null;

  return (
    <div className="mb-8 w-full bg-white dark:bg-card border border-border/40 rounded-[2rem] p-6 lg:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">
            {title}
          </h3>
          <span className="bg-[#1546B0]/10 text-[#1546B0] text-xs font-bold px-2 py-0.5 rounded-full">
            {members.length}
          </span>
        </div>
        
        <button 
          onClick={toggle}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-muted text-sm font-semibold text-foreground cursor-pointer transition-colors"
        >
          {isNepali ? "लुकाउनुहोस्" : "Toggle"}
          {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {members.map((member) => (
                <MemberCard key={member._id} member={member} isNepali={isNepali} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MembersContainer({ isNepali }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const url = `/api/public/members?${params.toString()}`;

  const { data: json, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false, // Optimizes performance
    dedupingInterval: 60000, // Caches for 1 minute before checking again
  });

  const [activeTab, setActiveTab] = useState("bearers"); // 'bearers' or 'members'

  const members = json?.data || [];

  // Memoize grouping logic for performance
  const groups = useMemo(() => {
    const grouped = {
      chairperson: [],
      viceChairpersons: [],
      secretary: [],
      treasurer: [],
      officeBearers: [],
      committeeMembers: [],
    };

    members.forEach((member) => {
      const posEn = member.position?.en?.toLowerCase() || "";
      
      if (member.isChairperson || (posEn.includes("chairperson") && !posEn.includes("vice"))) {
        grouped.chairperson.push(member);
      } else if (posEn.includes("vice chairperson") || posEn.includes("vice-chairperson")) {
        grouped.viceChairpersons.push(member);
      } else if (posEn.includes("secretary") && !posEn.includes("joint")) {
        grouped.secretary.push(member);
      } else if (posEn.includes("treasurer") && !posEn.includes("joint")) {
        grouped.treasurer.push(member);
      } else if (
        member.isFeaturedOnHome || 
        posEn.includes("joint") || 
        (!posEn.includes("member") && !member.position?.np?.includes("सदस्य"))
      ) {
        grouped.officeBearers.push(member);
      } else {
        grouped.committeeMembers.push(member);
      }
    });
    return grouped;
  }, [members]);

  if (isLoading) {
    return (
      <div className="w-full space-y-8">
        {[1, 2, 3].map((group) => (
          <div key={group}>
            <div className="w-48 h-8 bg-muted animate-pulse rounded-md mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((card) => (
                <MemberCardSkeleton key={card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || (json && !json.success)) {
    return (
      <div className="w-full p-12 flex flex-col items-center justify-center text-center bg-destructive/5 rounded-3xl border border-destructive/20">
        <p className="text-lg font-bold text-destructive mb-2">
          {isNepali ? "सदस्यहरू लोड गर्न सकिएन" : "Failed to load members"}
        </p>
        <p className="text-sm text-destructive/80 mb-6">
          {isNepali ? "सर्भरमा समस्या आयो।" : "A server error occurred."}
        </p>
        <button 
          onClick={() => mutate()} 
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-destructive text-destructive-foreground font-bold rounded-xl hover:bg-destructive/90 transition-colors shadow-sm"
        >
          {isNepali ? "पुन: प्रयास गर्नुहोस्" : "Retry"}
        </button>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="w-full p-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-border rounded-[2rem]">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          {isNepali ? "कुनै सदस्य फेला परेन" : "No Members Found"}
        </h3>
        <p className="text-muted-foreground text-sm">
          {isNepali 
            ? "तपाईंको खोजी वा फिल्टरसँग मेल खाने कुनै सदस्य छैन।" 
            : "There are no members matching your current filters or search."}
        </p>
      </div>
    );
  }

  // Get district name from the first member if a specific district is selected
  const isAllDistricts = !params.get("district") || params.get("district") === "all";
  let headerTitleEn = "Gandaki Province Committee";
  let headerTitleNp = "गण्डकी प्रदेश कमिटी";
  
  if (!isAllDistricts && members.length > 0) {
    const districtNameEn = members[0]?.district?.name?.en;
    const districtNameNp = members[0]?.district?.name?.np;
    if (districtNameEn) headerTitleEn = `${districtNameEn} District Committee`;
    if (districtNameNp) headerTitleNp = `${districtNameNp} जिल्ला कमिटी`;
  }

  return (
    <div className="w-full flex flex-col">
      {/* District Header */}
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {isNepali ? headerTitleNp : headerTitleEn}
        </h2>
        <p className="text-muted-foreground text-sm">
          {isNepali 
            ? `जम्मा सदस्यहरू: ${members.length}` 
            : `Total Members: ${members.length}`}
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 mb-8 bg-white dark:bg-card p-1.5 rounded-xl border border-border/40 inline-flex w-fit">
        <button
          onClick={() => setActiveTab("bearers")}
          className={cn(
            "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer",
            activeTab === "bearers" 
              ? "bg-[#1546B0] text-white shadow-sm" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {isNepali ? "पदाधिकारीहरू" : "Office Bearers"}
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={cn(
            "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer",
            activeTab === "members" 
              ? "bg-[#1546B0] text-white shadow-sm" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {isNepali ? "सदस्यहरू" : "Members"}
        </button>
      </div>

      {/* Content */}
      <div className="w-full">
        {activeTab === "bearers" && (
          <div className="flex flex-col gap-8">
            <MemberGroup 
              id="chair" 
              title={isNepali ? "अध्यक्ष" : "Chairperson"} 
              members={groups.chairperson} 
              isNepali={isNepali} 
            />
            <MemberGroup 
              id="vice-chair" 
              title={isNepali ? "उपाध्यक्षहरू" : "Vice Chairpersons"} 
              members={groups.viceChairpersons} 
              isNepali={isNepali} 
            />
            <MemberGroup 
              id="secretary" 
              title={isNepali ? "सचिव" : "Secretary"} 
              members={groups.secretary} 
              isNepali={isNepali} 
            />
            <MemberGroup 
              id="treasurer" 
              title={isNepali ? "कोषाध्यक्ष" : "Treasurer"} 
              members={groups.treasurer} 
              isNepali={isNepali} 
            />
            <MemberGroup 
              id="bearers" 
              title={isNepali ? "अन्य पदाधिकारीहरू" : "Office Bearers"} 
              members={groups.officeBearers} 
              isNepali={isNepali} 
            />
          </div>
        )}
        
        {activeTab === "members" && (
          <MemberGroup 
            id="members" 
            title={isNepali ? "कमिटी सदस्यहरू" : "Committee Members"} 
            members={groups.committeeMembers} 
            isNepali={isNepali} 
          />
        )}
      </div>
    </div>
  );
}
