"use client";

import React, { useEffect, useState } from "react";
import { FeaturedLeaderCard } from "./FeaturedLeaderCard";
import { LeadershipCard } from "./LeadershipCard";
import { CompactMemberCard } from "./CompactMemberCard";
import { AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function ProvinceCommitteeSection({ isNepali }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProvinceMembers() {
      try {
        const res = await fetch("/api/public/members/province");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.success) {
          setMembers(data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProvinceMembers();
  }, []);

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            <p>{isNepali ? "प्रदेश समितिका सदस्यहरू लोड गर्न सकिएन।" : "Failed to load Province Committee members."}</p>
          </div>
        </div>
      </section>
    );
  }

  // 1. Group members by displayGroup or weight === 1
  const featuredMembers = members.filter(m => m.position_id?.weight === 1 || m.position_id?.displayGroup === "featured");
  const leadershipMembers = members.filter(m => m.position_id?.weight !== 1 && m.position_id?.displayGroup === "leadership");
  const executiveMembers = members.filter(m => m.position_id?.weight !== 1 && m.position_id?.displayGroup === "executive");
  
  // Fallback: any member without a specific group, or explicitly 'committee'
  const committeeMembers = members.filter(m => 
    m.position_id?.weight !== 1 && 
    !["featured", "leadership", "executive"].includes(m.position_id?.displayGroup)
  );

  // Helper to group members by their exact position name (useful for leadership row spacing)
  const groupByName = (membersArray) => {
    return membersArray.reduce((acc, m) => {
      const posName = m.position_id?.name?.en || m.position?.en || "Other";
      if (!acc[posName]) acc[posName] = [];
      acc[posName].push(m);
      return acc;
    }, {});
  };

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
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            {isNepali ? "गण्डकी प्रदेश कमिटी" : "Gandaki Province Committee"}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
            {isNepali ? "कुनै सदस्य फेला परेन।" : "No members found."}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-24 md:space-y-32"
          >
            {/* 1. Featured Leader (e.g., Chairperson) */}
            {featuredMembers.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-12">
                {featuredMembers.map(member => (
                  <FeaturedLeaderCard key={member._id} member={member} isNepali={isNepali} />
                ))}
              </motion.div>
            )}

            {/* 2. Leadership Row (e.g., Vice Chairs, Secretaries) */}
            {leadershipMembers.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-12">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 max-w-[80px]" />
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center">
                    {isNepali ? "पदाधिकारीहरू" : "OFFICE BEARERS"}
                  </h3>
                  <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 max-w-[80px]" />
                </div>
                
                {/* Group leadership by position name so they form clean rows */}
                {Object.entries(groupByName(leadershipMembers)).map(([posName, groupMembers], idx) => (
                  <div key={idx} className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {groupMembers.map(member => (
                      <LeadershipCard key={member._id} member={member} isNepali={isNepali} />
                    ))}
                  </div>
                ))}
                
                <div className="flex justify-center mt-12">
                  <button className="px-6 py-2.5 rounded-full border border-blue-200 text-blue-600 text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                    {isNepali ? "सबै पदाधिकारीहरू हेर्नुहोस्" : "View All Office Bearers"}
                    <span className="text-blue-400">→</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. Executive Members Grid */}
            {executiveMembers.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 max-w-[100px]" />
                  <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest text-center">
                    {isNepali ? "सचिवालय सदस्यहरू" : "Executive Members"}
                  </h3>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 max-w-[100px]" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {executiveMembers.map(member => (
                    <CompactMemberCard key={member._id} member={member} isNepali={isNepali} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. Committee Members Grid */}
            {committeeMembers.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 max-w-[100px]" />
                  <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest text-center">
                    {isNepali ? "प्रदेश कमिटी सदस्यहरू" : "Committee Members"}
                  </h3>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 max-w-[100px]" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
                  {committeeMembers.map(member => (
                    <CompactMemberCard key={member._id} member={member} isNepali={isNepali} />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
