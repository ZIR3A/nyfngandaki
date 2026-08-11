"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Mail, Eye, Trash2, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteContactMessageAction, updateMessageStatusAction } from "@/actions/contact.actions";

export function AdminContactMessagesTable({ initialData = [], pagination, searchParams }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState(false);
  const [query, setQuery] = useState(searchParams.search || "");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (query) params.set("search", query);
    else params.delete("search");
    params.set("page", "1");
    router.push(`/admin/contact-messages?${params.toString()}`);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (status && status !== "all") params.set("status", status);
    else params.delete("status");
    params.set("page", "1");
    router.push(`/admin/contact-messages?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`/admin/contact-messages?${params.toString()}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setIsDeleting(true);
    
    const res = await deleteContactMessageAction(id);
    
    if (res.success) {
      toast.success("Success", { description: res.message });
      setMessages(messages.filter((m) => m._id !== id));
    } else {
      toast.error("Error", { description: res.message });
    }
    
    setIsDeleting(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await updateMessageStatusAction(id, newStatus);
    if (res.success) {
      toast.success("Success", { description: res.message });
      setMessages(messages.map(m => m._id === id ? { ...m, status: newStatus } : m));
    } else {
      toast.error("Error", { description: res.message });
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Contact Messages</h1>
          <p className="text-slate-500 mt-2">Manage incoming public inquiries and feedback.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap gap-4 items-center">
          <form onSubmit={handleSearch} className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
            />
          </form>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={searchParams.status || "all"} 
              onChange={handleStatusFilter}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Statuses</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4">Sender</th>
                <th scope="col" className="px-6 py-4">Subject</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr key={message._id} className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className={`font-medium ${message.status === 'Unread' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                      {message.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" />
                      {message.email}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {message.subject}
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      message.status === 'Unread' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : message.status === 'Archived'
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedMessage(message)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                        title="View Message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteMessage(message._id)}
                        disabled={deleting === message._id}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50"
                        title="Delete Message"
                      >
                        {deleting === message._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination?.totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="bg-white dark:bg-slate-900"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="bg-white dark:bg-slate-900"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
