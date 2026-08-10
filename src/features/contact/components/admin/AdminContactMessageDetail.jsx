"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Mail, Phone, Calendar, User, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteContactMessageAction, updateMessageStatusAction } from "@/actions/contact.actions";

export function AdminContactMessageDetail({ message: initialMessage }) {
  const router = useRouter();
  const [message, setMessage] = useState(initialMessage);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this message? This action cannot be undone.")) return;
    setIsDeleting(true);
    
    const res = await deleteContactMessageAction(message._id);
    
    if (res.success) {
      toast.success("Success", { description: res.message });
      router.push("/admin/contact-messages");
    } else {
      toast.error("Error", { description: res.message });
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    const res = await updateMessageStatusAction(message._id, newStatus);
    if (res.success) {
      toast.success("Success", { description: res.message });
      setMessage({ ...message, status: newStatus });
    } else {
      toast.error("Error", { description: res.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-white dark:bg-slate-900" asChild>
          <Link href="/admin/contact-messages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Message Details</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {message.status !== "Archived" ? (
            <Button variant="outline" onClick={() => handleStatusChange("Archived")} className="bg-white dark:bg-slate-900">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
          ) : (
            <Button variant="outline" onClick={() => handleStatusChange("Read")} className="bg-white dark:bg-slate-900">
              Move to Inbox
            </Button>
          )}
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Header section with metadata */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl uppercase shadow-inner">
              {message.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {message.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400 mt-1">
                <a href={`mailto:${message.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {message.email}
                </a>
                {message.phone && (
                  <a href={`tel:${message.phone}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    {message.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-2 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(message.createdAt).toLocaleString()}
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex justify-center ${
              message.status === 'Unread' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                : message.status === 'Archived'
                ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            }`}>
              {message.status}
            </span>
          </div>
        </div>

        {/* Message Content */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            Subject: {message.subject}
          </h3>
          
          <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-slate-700 dark:text-slate-300">
            {message.message}
          </div>
        </div>
      </div>
    </div>
  );
}
