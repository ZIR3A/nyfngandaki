"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLeadershipMessagesTable({ messages }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredMessages = useMemo(() => {
    return messages.filter(msg => {
      // Status filter
      if (filterStatus !== "all" && msg.status !== filterStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const memberNameEn = (msg.is_custom_person ? msg.custom_name_en : msg.member_id?.name?.en)?.toLowerCase() || "";
        const memberNameNp = (msg.is_custom_person ? msg.custom_name_np : msg.member_id?.name?.np)?.toLowerCase() || "";
        const shortMessageEn = msg.short_message_en?.toLowerCase() || "";
        const position = (msg.is_custom_person ? msg.custom_position_en : msg.member_id?.position_id?.name?.en)?.toLowerCase() || "";
        
        if (!memberNameEn.includes(query) && !memberNameNp.includes(query) && !shortMessageEn.includes(query) && !position.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [messages, searchQuery, filterStatus]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leadership message?")) return;
    try {
      const res = await fetch(`/api/crm/leadership-messages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to delete message");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by member, position, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-40 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Member</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Position</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-center">Homepage</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-center">About</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-center">Order</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <tr key={msg._id} className="hover:bg-gray-50/50 transition-colors bg-white">
                  <td className="px-6 py-4">
                    {msg.map ? null : null /* Just a spacer comment */}
                    <div className="flex items-center gap-3">
                      {(msg.is_custom_person ? msg.custom_photo : msg.member_id?.photo) ? (
                        <div className="w-10 h-10 relative overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                          <Image 
                            src={msg.is_custom_person ? msg.custom_photo : msg.member_id.photo} 
                            alt={msg.is_custom_person ? msg.custom_name_en : msg.member_id?.name?.en || "Leader"} 
                            fill
                            className="object-cover object-top" 
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                          {(msg.is_custom_person ? msg.custom_name_en : msg.member_id?.name?.en)?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{msg.is_custom_person ? msg.custom_name_en : (msg.member_id?.name?.en || "Unknown")}</div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px]">{msg.short_message_en}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {msg.is_custom_person ? msg.custom_position_en : (msg.member_id?.position_id?.name?.en || "N/A")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {msg.homepage_visible ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs">
                        ×
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {msg.about_visible ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs">
                        ×
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      msg.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 
                      msg.status === 'draft' ? 'bg-gray-50 text-gray-700 border-gray-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {msg.display_order}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/leadership-messages/${msg._id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Delete" onClick={() => handleDelete(msg._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Search className="h-8 w-8 text-gray-300 mb-3" />
                    <p className="text-base font-medium text-gray-900 mb-1">No messages found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
