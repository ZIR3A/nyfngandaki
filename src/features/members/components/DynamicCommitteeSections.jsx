"use client";

import React, { useEffect, useState } from "react";
import { MemberCard, FeaturedLeaderCard } from "./MemberCard";
import { AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function CommitteeSection({ committee, isNepali }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const members = committee.members || [];
  const departments = committee.departments || [];

  const isCentralCommittee = committee.organizationLevel === "Central" || committee.organizationLevel === "CENTRAL" || committee.name?.en?.toLowerCase().includes("central");

  // Find the absolute top main leader based on committee type
  const mainLeader = members.find(m => {
    const posNameEn = m.position_id?.name?.en || m.position?.en || "";
    const posLower = posNameEn.toLowerCase().trim();
    
    if (isCentralCommittee) {
      // Province Incharge is the main person on central committee. 
      // Strictly avoid 'sub incharge', 'sahaincharge', etc.
      return posLower === "incharge" || posLower === "province incharge" || posLower === "province incharge";
    } else {
      // For province or other committees, President is usually the main person
      return posLower === "president";
    }
  });

  // Other featured members but excluding the mainLeader
  const featuredMembers = members.filter(m => {
    if (mainLeader && m._id === mainLeader._id) return false;
    
    const posNameEn = m.position_id?.name?.en || m.position?.en || "";
    const posLower = posNameEn.toLowerCase().trim();
    
    // Explicitly reject sub incharge from getting the featured large card
    if (posLower.includes("sub") || posLower.includes("deputy") || posLower.includes("saha")) {
      return false;
    }
    
    if (m.position_id?.weight === 1 || m.position_id?.displayGroup === "featured") return true;
    
    // If President is already mainLeader, feature the strict Incharge here, or vice versa
    return posLower === "president" || posLower === "incharge" || posLower === "province incharge" || posLower === "province incharge";
  });
  
  const restMembers = members.filter(m => 
    (!mainLeader || m._id !== mainLeader._id) && !featuredMembers.includes(m)
  );

  const totalToShow = isExpanded ? members.length : 6;
  
  // We need to carefully slice the arrays based on totalToShow.
  let remainingQuota = totalToShow;
  
  const showMainLeader = mainLeader && remainingQuota > 0;
  if (showMainLeader) remainingQuota--;
  
  const visibleFeatured = featuredMembers.slice(0, remainingQuota);
  remainingQuota -= visibleFeatured.length;
  
  const visibleRest = restMembers.slice(0, Math.max(0, remainingQuota));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 last:border-0">
      <div className="container mx-auto px-4 max-w-7xl">
        {!isCentralCommittee && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              {isNepali ? committee.name?.np : committee.name?.en}
            </h2>
            {committee.description && (
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                {isNepali ? committee.description?.np : committee.description?.en}
              </p>
            )}
          </div>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-12"
        >
          {showMainLeader && (
            <div className="flex flex-col items-center mb-4">
              <div className="w-full sm:w-[360px]">
                <FeaturedLeaderCard member={mainLeader} isNepali={isNepali} />
              </div>
            </div>
          )}

          {visibleFeatured.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center w-full gap-6 md:gap-8">
                {visibleFeatured.map(member => (
                  <div key={member._id} className="w-full sm:w-[360px]">
                    <FeaturedLeaderCard member={member} isNepali={isNepali} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibleRest.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {visibleRest.map(member => (
                <div key={member._id} className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-18px)] lg:w-[calc(20%-19.2px)]">
                  <MemberCard member={member} isNepali={isNepali} />
                </div>
              ))}
            </div>
          )}

          {/* View More CTA */}
          {members.length > 6 && !isExpanded && (
            <div className="flex justify-center mt-4 mb-4">
              <button 
                onClick={() => setIsExpanded(true)}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm md:text-base font-bold text-white transition-all duration-300 bg-[#1546B0] rounded-[20px] hover:bg-[#0D2E78] focus:outline-none cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                {isNepali ? "थप सदस्यहरू हेर्नुहोस्" : "View More Members"}
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
          
          
          {members.length > 6 && isExpanded && (
            <div className="flex justify-center mt-4 mb-4">
              <button 
                onClick={() => setIsExpanded(false)}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 transition-all duration-300 bg-slate-100 dark:bg-slate-800 rounded-[20px] hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none cursor-pointer shadow-sm hover:shadow-md"
              >
                {isNepali ? "कम देखाउनुहोस्" : "Show Less"}
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          )}

          {departments.map(dept => (
            <div key={dept._id} className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                  {isNepali ? dept.name?.np : dept.name?.en}
                </h3>
                {dept.description && (
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {isNepali ? dept.description?.np : dept.description?.en}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {dept.members.map(member => (
                  <div key={member._id} className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-18px)] lg:w-[calc(20%-19.2px)]">
                    <MemberCard member={member} isNepali={isNepali} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function DynamicCommitteeSections({ isNepali }) {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCommittees() {
      try {
        const res = await fetch("/api/public/committees/with-members");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.success) {
          // We only render non-District committees here, as District is handled by the Explorer
          const nonDistrictCommittees = data.data.filter(c => 
            c.organizationLevel !== "District" && c.organizationLevel !== "DISTRICT"
          );
          setCommittees(nonDistrictCommittees);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCommittees();
  }, []);

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            <p>{isNepali ? "समितिहरू लोड गर्न सकिएन।" : "Failed to load committees."}</p>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (committees.length === 0) {
    return null; // Don't render anything if no non-district committees have members
  }

  return (
    <>
      {committees.map((committee) => (
        <CommitteeSection key={committee._id} committee={committee} isNepali={isNepali} />
      ))}
    </>
  );
}
