"use client";

import React, { useEffect, useState } from "react";
import { useDistrictExplorer } from "../contexts/DistrictExplorerContext";
import { FeaturedLeaderCard, MemberCard } from "./MemberCard";
import { Users, AlertCircle, MapPin, Loader2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DistrictMembersSection({ isNepali }) {
  const { selectedDistrictSlug } = useDistrictExplorer();
  
  const [district, setDistrict] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!selectedDistrictSlug) {
      setDistrict(null);
      setMembers([]);
      setIsExpanded(false);
      return;
    }

    let isMounted = true;

    async function fetchDistrictData() {
      setLoading(true);
      setError(false);
      try {
        const distRes = await fetch(`/api/public/districts/${selectedDistrictSlug}`);
        if (!distRes.ok) throw new Error("Failed to fetch district");
        const distData = await distRes.json();
        
        const memRes = await fetch(`/api/public/members?district=${selectedDistrictSlug}&level=DISTRICT`);
        if (!memRes.ok) throw new Error("Failed to fetch members");
        const memData = await memRes.json();

        if (isMounted) {
          if (distData.success) setDistrict(distData.data);
          if (memData.success) {
            setMembers(memData.data);
            setIsExpanded(false);
          }
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDistrictData();

    return () => { isMounted = false; };
  }, [selectedDistrictSlug]);

  if (!selectedDistrictSlug) return null;

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            <p>{isNepali ? "जिल्ला डेटा लोड गर्न सकिएन।" : "Failed to load district data."}</p>
          </div>
        </div>
      </section>
    );
  }

  const districtName = district ? (isNepali ? district.name?.np || district.name?.en : district.name?.en) : "";

  const getAlphabets = (isNepali) => {
    if (isNepali) {
      return ["All", "अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "क्ष", "त्र", "ज्ञ"];
    }
    return ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
  };

  const alphabets = getAlphabets(isNepali);

  const filteredMembers = members.filter(member => {
    if (selectedLetter === "All") return true;
    const nameStr = isNepali ? member.name?.np || member.name?.en : member.name?.en;
    if (!nameStr) return false;
    return nameStr.trim().toUpperCase().startsWith(selectedLetter);
  });

  return (
    <section id="district-members" className="pb-24 pt-8 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-32"
            >
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </motion.div>
          ) : district ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* District Banner (Overview) */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    {districtName}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{isNepali ? "जिल्ला कमिटी" : "District Committee"}</span>
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 leading-none">{district.stats?.totalMembers || 0}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                      {isNepali ? "सदस्यहरू" : "Members"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Members Grid */}
              {filteredMembers.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg font-medium bg-slate-50 rounded-3xl border border-slate-100">
                  {isNepali ? "यस जिल्लामा कुनै सदस्य फेला परेन।" : "No members found in this district."}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-12"
                >
                  {(() => {
                    const featuredMembers = filteredMembers.filter(m => {
                      if (m.position_id?.weight === 1 || m.position_id?.displayGroup === "featured") return true;
                      const posNameEn = m.position?.en || "";
                      return posNameEn.toLowerCase() === "president" || posNameEn.toLowerCase() === "district president";
                    });
                    const restMembers = filteredMembers.filter(m => !featuredMembers.includes(m));

                    const totalToShow = isExpanded ? filteredMembers.length : 6;
                    const visibleFeatured = featuredMembers.slice(0, totalToShow);
                    const visibleRest = restMembers.slice(0, Math.max(0, totalToShow - visibleFeatured.length));

                    return (
                      <>
                        {visibleFeatured.length > 0 && (
                          <div className="flex flex-wrap justify-center w-full gap-6">
                            {visibleFeatured.map((member) => (
                              <div key={member._id} className="w-full sm:w-[360px]">
                                <FeaturedLeaderCard member={member} isNepali={isNepali} />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                          {visibleRest.map(member => (
                            <div key={member._id} className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-18px)] lg:w-[calc(20%-19.2px)]">
                              <MemberCard member={member} isNepali={isNepali} />
                            </div>
                          ))}
                        </div>

                        {/* View More CTA */}
                        {filteredMembers.length > 6 && !isExpanded && (
                          <div className="flex justify-center mt-6 mb-4">
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

                        {filteredMembers.length > 6 && isExpanded && (
                          <div className="flex justify-center mt-6 mb-4">
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
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
