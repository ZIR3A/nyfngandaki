"use client";

import { useState } from "react";
import { MemberCard } from "@/components/shared/MemberCard";
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
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMembers.map((member) => {
                // Map the mongoose model to the MemberCard prop structure
                const displayMember = {
                  id: member.slug || member._id.toString(),
                  name: isNepali && member.name.np ? member.name.np : member.name.en,
                  position: isNepali && member.position.np ? member.position.np : member.position.en,
                  district: member.district?.name?.en || member.province || "Gandaki",
                  photoUrl: member.photo,
                  phone: member.phone,
                  email: member.email,
                  facebook: member.facebook
                };

                return (
                  <MemberCard key={displayMember.id} member={displayMember} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
