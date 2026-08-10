"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Mail, Eye, Trash2, Filter } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Messages</h1>
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

        {/* Table Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:grid">
          <div className="col-span-3">Sender</div>
          <div className="col-span-4">Subject</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        {messages.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No messages found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {messages.map((message) => (
              <div key={message._id} className={`p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${message.status === 'Unread' ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                <div className="col-span-1 md:col-span-3">
                  <div className={`font-medium ${message.status === 'Unread' ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                    {message.name}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {message.email}
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-4 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {message.subject}
                </div>
                
                <div className="col-span-1 md:col-span-2 text-sm text-slate-500">
                  {new Date(message.createdAt).toLocaleDateString()}
                </div>
                
                <div className="col-span-1 md:col-span-1 flex justify-start md:justify-center">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    message.status === 'Unread' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : message.status === 'Archived'
                      ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  }`}>
                    {message.status}
                  </span>
                </div>
                
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end gap-2">
                  {message.status === 'Unread' && (
                    <Button size="sm" variant="outline" className="h-8 text-xs bg-white dark:bg-slate-900" onClick={() => handleStatusChange(message._id, "Read")}>
                      Mark Read
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                    <Link href={`/admin/contact-messages/${message._id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(message._id)} disabled={isDeleting}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

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
