"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteMemberAction } from "@/actions/member.actions";

export const DeleteMemberButton = ({ id, name }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteMemberAction(id);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.message || "Failed to delete member.");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred while deleting the member.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-gray-500 hover:text-red-600 disabled:opacity-50"
      title="Delete Member"
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
};
