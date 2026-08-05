"use client";

import React, { useEffect, useState } from "react";
import { MemberCard, FeaturedLeaderCard } from "./MemberCard";
import { AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function CommitteeSection({ committee, isNepali }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const members = committee.members || [];
  const departments = committee.departments || [];

  // Group members by displayGroup or weight === 1
  const featuredMembers = members.filter(m => {
    if (m.position_id?.weight === 1 || m.position_id?.displayGroup === "featured") return true;
    const posNameEn = m.position_id?.name?.en || m.position?.en || "";
    return posNameEn.toLowerCase() === "president" || posNameEn.toLowerCase() === "incharge" || posNameEn.toLowerCase().includes("incharge");
  });
  
  const restMembers = members.filter(m => !featuredMembers.includes(m));

  const totalToShow = isExpanded ? members.length : 11;
  const visibleFeatured = featuredMembers.slice(0, totalToShow);
  const visibleRest = restMembers.slice(0, Math.max(0, totalToShow - visibleFeatured.length));

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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-12"
        >
          {visibleFeatured.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center w-full gap-6 md:gap-8">
                {visibleFeatured.map(member => (
                  <motion.div key={member._id} variants={itemVariants} className="w-full sm:w-[360px]">
                    <FeaturedLeaderCard member={member} isNepali={isNepali} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {visibleRest.map(member => (
              <motion.div key={member._id} variants={itemVariants} className="w-full">
                <MemberCard member={member} isNepali={isNepali} />
              </motion.div>
            ))}
          </div>

          {/* View More CTA */}
          {members.length > 11 && !isExpanded && (
            <motion.div variants={itemVariants} className="flex justify-center mt-4 mb-4">
              <button 
                onClick={() => setIsExpanded(true)}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm md:text-base font-bold text-white transition-all duration-300 bg-[#1546B0] rounded-[20px] hover:bg-[#0D2E78] focus:outline-none cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                {isNepali ? "थप सदस्यहरू हेर्नुहोस्" : "View More Members"}
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          )}
          
          
          {members.length > 11 && isExpanded && (
            <motion.div variants={itemVariants} className="flex justify-center mt-4 mb-4">
              <button 
                onClick={() => setIsExpanded(false)}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 transition-all duration-300 bg-slate-100 dark:bg-slate-800 rounded-[20px] hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none cursor-pointer shadow-sm hover:shadow-md"
              >
                {isNepali ? "कम देखाउनुहोस्" : "Show Less"}
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </motion.div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {dept.members.map(member => (
                  <motion.div key={member._id} variants={itemVariants} className="w-full">
                    <MemberCard member={member} isNepali={isNepali} />
                  </motion.div>
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
