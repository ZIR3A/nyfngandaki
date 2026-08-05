"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deletePositionAction } from "@/actions/position.actions";

export function DeletePositionButton({ id }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this position?")) return;
    
    setIsDeleting(true);
    try {
      const res = await deletePositionAction(id);
      if (res.success) {
        toast.success("Success", { description: res.message || "Position deleted successfully" });
      } else {
        toast.error("Error", { 
          description: res.errors?.length 
            ? `${res.message}\nDetails: ${res.errors.join(", ")}` 
            : res.message || "Failed to delete position" 
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
      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
      title="Delete Position"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
