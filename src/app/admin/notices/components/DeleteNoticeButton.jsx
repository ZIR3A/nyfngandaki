"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteNoticeAction } from "@/actions/notice.actions";

export default function DeleteNoticeButton({ id, title }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the notice: "${title}"?`)) {
      return;
    }
    
    setIsDeleting(true);
    const result = await deleteNoticeAction(id);
    setIsDeleting(false);
    
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message || "Failed to delete notice");
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer disabled:opacity-50" 
      title="Delete"
    >
      <Trash2 className={`w-4 h-4 ${isDeleting ? "animate-pulse" : ""}`} />
    </button>
  );
}
