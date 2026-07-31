"use client";

import React, { useEffect, useState } from "react";
import { useDistrictExplorer } from "../contexts/DistrictExplorerContext";
import { FeaturedLeaderCard } from "./FeaturedLeaderCard";
import { LeadershipCard } from "./LeadershipCard";
import { CompactMemberCard } from "./CompactMemberCard";
import { Users, AlertCircle, MapPin, Loader2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DistrictMembersSection({ isNepali }) {
  const { selectedDistrictSlug } = useDistrictExplorer();
  
  const [district, setDistrict] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState("All");

  useEffect(() => {
    if (!selectedDistrictSlug) {
      setDistrict(null);
      setMembers([]);
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
          if (memData.success) setMembers(memData.data);
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

              {/* Alphabet Filter */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    {isNepali ? "वर्णानुक्रम अनुसार खोज्नुहोस्" : "Browse Alphabetically"}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {alphabets.map(letter => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                        selectedLetter === letter
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
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
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                  {filteredMembers.map(member => (
                    <CompactMemberCard key={member._id} member={member} isNepali={isNepali} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
