"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteDistrictAction } from "@/actions/district.actions";

export function DeleteDistrictButton({ id }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this district?")) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteDistrictAction(id);
      if (res.success) {
        toast.success("Success", { description: res.message || "District deleted successfully" });
      } else {
        toast.error("Error", { 
          description: res.errors?.length 
            ? `${res.message}\nDetails: ${res.errors.join(", ")}` 
            : res.message || "Failed to delete district" 
        });
      }
    } catch (err) {
      toast.error("Error", { description: err.message || "An unexpected error occurred" });
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
      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer disabled:opacity-50"
      title="Delete District"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
