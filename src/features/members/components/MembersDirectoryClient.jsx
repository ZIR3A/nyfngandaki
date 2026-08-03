"use client";

import { useState } from "react";
import { MemberCard, FeaturedLeaderCard } from "./MemberCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Search, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MembersDirectoryClient({ initialMembers, isNepali }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  const filteredMembers = initialMembers.filter((member) => {
    const name = isNepali && member.name.np ? member.name.np : member.name.en;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Simplistic district match for now, could be improved based on reference object
    const matchesDistrict = districtFilter ? member.district === districtFilter : true;

    return matchesSearch && matchesDistrict;
  });

  return (
    <section className="py-12 lg:py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-32 transition-colors">
            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
              <Filter className="h-5 w-5 text-[#1546B0] dark:text-blue-400" />
              <h3 className="font-extrabold text-lg">Filters</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Search Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1546B0]/20 focus:border-[#1546B0] dark:focus:ring-blue-500/20 dark:focus:border-blue-500 transition-all text-sm dark:text-white"
                  />
                </div>
              </div>

              <Button className="w-full bg-[#1546B0] hover:bg-[#0D2E78] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors">
                Apply Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* Directory Grid */}
        <div className="flex-grow">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Showing <strong className="text-gray-900 dark:text-white">{filteredMembers.length}</strong> members
            </p>
          </div>

          {filteredMembers.length === 0 ? (
            <EmptyState 
              title="No Members Found"
              description="No members match your current filter criteria."
              icon={<Users className="h-8 w-8 text-gray-400" />}
            />
          ) : (
            <div className="flex flex-col gap-12">
              {(() => {
                const featuredMembers = filteredMembers.filter(m => {
                  if (m.position_id?.weight === 1 || m.position_id?.displayGroup === "featured") return true;
                  const posNameEn = m.position?.en || "";
                  return posNameEn.toLowerCase() === "president";
                });
                const restMembers = filteredMembers.filter(m => !featuredMembers.includes(m));

                return (
                  <>
                    {featuredMembers.length > 0 && (
                      <div className="flex flex-wrap justify-center w-full gap-6">
                        {featuredMembers.map((member) => (
                          <div key={member._id} className="w-full sm:w-[360px]">
                            <FeaturedLeaderCard member={member} isNepali={isNepali} />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                      {restMembers.map((member) => (
                        <div key={member._id} className="w-full">
                          <MemberCard member={member} isNepali={isNepali} />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
