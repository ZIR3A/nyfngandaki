"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createPositionAction, updatePositionAction } from "@/actions/position.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { toast } from "sonner";

export function PositionForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: {
      en: initialData?.name?.en || "",
      np: initialData?.name?.np || "",
    },
    weight: initialData?.weight || 0,
    displayGroup: initialData?.displayGroup || "committee",
    status: initialData?.status || "Active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (initialData) {
        res = await updatePositionAction(initialData._id, formData);
      } else {
        res = await createPositionAction(formData);
      }

      if (res.success) {
        toast.success("Success", { description: res.message || "Position saved successfully." });
        router.push("/admin/positions");
      } else {
        toast.error("Error", { 
          description: res.errors?.length 
            ? `${res.message}\nDetails: ${res.errors.join(", ")}` 
            : res.message || "Something went wrong." 
        });
      }
    } catch (err) {
      toast.error("Error", { description: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{initialData ? "Edit Position" : "Add New Position"}</h1>
        </div>
      </div>



      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800">
          <div className="space-y-6">
            <LocalizedInput
              label="Position Name"
              placeholder={{ en: "e.g. Chairperson", np: "उदा. अध्यक्ष" }}
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Display Weight (Hierarchy order)</label>
              <input
                type="number"
                className="w-full flex h-10 rounded-md border border-input dark:border-slate-700 bg-background dark:bg-slate-900 px-3 py-2 text-sm text-foreground dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
              />
              <p className="text-xs text-gray-500 dark:text-slate-400">Lower numbers appear first. e.g. 1 for Chairperson.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Display Group</label>
              <select
                className="w-full flex h-10 rounded-md border border-input dark:border-slate-700 bg-background dark:bg-slate-900 px-3 py-2 text-sm text-foreground dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.displayGroup}
                onChange={(e) => setFormData({ ...formData, displayGroup: e.target.value })}
              >
                <option value="featured">Featured Leader (e.g. Chairperson)</option>
                <option value="leadership">Leadership Row (e.g. Vice Chair, Secretary)</option>
                <option value="executive">Executive Grid</option>
                <option value="committee">Committee Grid</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-slate-400">Dictates how this position is visually presented on the public directory.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Status</label>
              <select
                className="w-full flex h-10 rounded-md border border-input dark:border-slate-700 bg-background dark:bg-slate-900 px-3 py-2 text-sm text-foreground dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/positions")} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Saving..." : "Save Position"}
          </Button>
        </div>
      </form>
    </div>
  );
}
