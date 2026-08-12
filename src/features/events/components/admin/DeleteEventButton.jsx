"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteEventAction } from "@/features/events/actions/event.actions";

export function DeleteEventButton({ id, title }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the event "${title}"?`)) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteEventAction(id);
      if (res.success) {
        toast.success("Event deleted successfully");
      } else {
        toast.error(res.error || "Failed to delete event");
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
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
      title="Delete Event"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
