"use client";

import React, { useEffect, useState } from "react";
import { MemberCard, MemberCardSkeleton, FeaturedLeaderCard } from "./MemberCard";
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
  const featuredMembers = members.filter(m => {
    if (m.position_id?.weight === 1 || m.position_id?.displayGroup === "featured") return true;
    const posNameEn = m.position_id?.name?.en || m.position?.en || "";
    return posNameEn.toLowerCase() === "president";
  });
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
            className="flex flex-col gap-12"
          >
            {featuredMembers.length > 0 && (
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center w-full gap-6 md:gap-8">
                  {featuredMembers.map(member => (
                    <motion.div key={member._id} variants={itemVariants} className="w-full sm:w-[360px]">
                      <FeaturedLeaderCard member={member} isNepali={isNepali} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {members.filter(m => !featuredMembers.includes(m)).map(member => (
                <motion.div key={member._id} variants={itemVariants} className="w-full">
                  <MemberCard member={member} isNepali={isNepali} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
