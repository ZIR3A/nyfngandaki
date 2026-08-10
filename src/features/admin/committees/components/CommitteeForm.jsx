"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createCommitteeAction, updateCommitteeAction } from "@/actions/committee.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { CommitteeDepartmentsTab } from "./CommitteeDepartmentsTab";
import { toast } from "sonner";

export function CommitteeForm({ initialData = null }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || { en: "", np: "" },
    organizationLevel: initialData?.organizationLevel || "Province",
    displayOrder: initialData?.displayOrder || 0,
    status: initialData?.status || "Active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (initialData) {
        res = await updateCommitteeAction(initialData._id, formData);
      } else {
        res = await createCommitteeAction(formData);
      }

      if (res.success) {
        toast.success("Success", { description: res.message || "Committee saved successfully." });
        router.push("/admin/committees");
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
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{initialData ? "Edit Committee" : "Add New Committee"}</h1>
        </div>
      </div>



      {initialData && (
        <div className="flex space-x-1 border-b border-gray-200 dark:border-slate-800 mb-6">
          <button
            type="button"
            className={`py-2 px-4 border-b-2 text-sm font-medium ${activeTab === 'basic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Information
          </button>
          <button
            type="button"
            className={`py-2 px-4 border-b-2 text-sm font-medium ${activeTab === 'departments' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-600'}`}
            onClick={() => setActiveTab("departments")}
          >
            Departments
          </button>
        </div>
      )}

      <div style={{ display: activeTab === 'basic' ? 'block' : 'none' }}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800">
          <div className="space-y-6">
            <LocalizedInput
              label="Committee Name"
              placeholder={{ en: "e.g. Executive Committee", np: "उदा. कार्यसमिति" }}
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Organization Level</label>
              <select
                className="w-full flex h-10 rounded-md border border-input dark:border-slate-700 bg-background dark:bg-slate-900 px-3 py-2 text-sm text-foreground dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.organizationLevel}
                onChange={(e) => setFormData({ ...formData, organizationLevel: e.target.value })}
                required
              >
                <option value="Central">Central</option>
                <option value="Province">Province</option>
                <option value="District">District</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Display Order (Ascending)</label>
              <input
                type="number"
                className="w-full flex h-10 rounded-md border border-input dark:border-slate-700 bg-background dark:bg-slate-900 px-3 py-2 text-sm text-foreground dark:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              />
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
          <Button type="button" variant="outline" onClick={() => router.push("/admin/committees")} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Saving..." : "Save Committee"}
          </Button>
        </div>
        </form>
      </div>

      {initialData && activeTab === 'departments' && (
        <CommitteeDepartmentsTab committee={initialData} />
      )}
    </div>
  );
}
