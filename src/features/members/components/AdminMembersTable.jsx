"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Edit, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteMemberButton } from "@/features/members/components/DeleteMemberButton";

export function AdminMembersTable({ members, districts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      // Level filter
      if (filterLevel !== "all" && member.organizationLevel !== filterLevel) {
        return false;
      }

      // District filter
      if (filterDistrict !== "all") {
        const memberDistrictId = member.district?._id?.toString() || member.district?.toString();
        if (memberDistrictId !== filterDistrict) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameEn = member.name?.en?.toLowerCase() || "";
        const nameNp = member.name?.np?.toLowerCase() || "";
        const position = member.position_id?.name?.en?.toLowerCase() || "";
        const committee = member.committee_id?.name?.en?.toLowerCase() || "";
        
        if (!nameEn.includes(query) && !nameNp.includes(query) && !position.includes(query) && !committee.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [members, searchQuery, filterDistrict]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search members by name or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-gray-500 hidden sm:block" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="w-full sm:w-40 py-2 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Levels</option>
            <option value="PROVINCE">Province</option>
            <option value="DISTRICT">District</option>
          </select>
          
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="w-full sm:w-48 py-2 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Districts</option>
            {districts.map(d => (
              <option key={d._id.toString()} value={d._id.toString()}>{d.name?.en} ({d.name?.np})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Name (English)</th>
              <th className="px-6 py-4">Level</th>
              <th className="px-6 py-4">Committee</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">District</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                  No members found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {member.name?.en || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${member.organizationLevel === 'Central' ? 'bg-red-50 text-red-700 border-red-100' : (member.organizationLevel === 'Province' || member.organizationLevel === 'PROVINCE') ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                      {member.organizationLevel || "Province"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {member.committee_id?.name?.en || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {member.department_id?.name?.en || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {member.position_id?.name?.en || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {(member.organizationLevel === 'Central' || member.organizationLevel === 'Province' || member.organizationLevel === 'PROVINCE') ? (
                      <span className="text-gray-400 italic">N/A</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                        {member.district?.name?.en || "Unassigned"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/members/${member._id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteMemberButton id={member._id.toString()} name={member.name?.en || "this member"} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
