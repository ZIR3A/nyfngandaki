"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createDistrictAction, updateDistrictAction } from "@/actions/district.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
export function DistrictForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: {
      en: initialData?.name?.en || "",
      np: initialData?.name?.np || "",
    },
    shortDescription: {
      en: initialData?.shortDescription?.en || "",
      np: initialData?.shortDescription?.np || "",
    },
    slug: initialData?.slug || "",
    status: initialData?.status || "Active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (initialData) {
        res = await updateDistrictAction(initialData._id, formData);
      } else {
        res = await createDistrictAction(formData);
      }

      if (res.success) {
        toast.success("Success", { description: res.message || "District saved successfully." });
        router.push("/admin/districts");
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/districts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {initialData ? "Edit District" : "Add New District"}
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
              Manage district information.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" size="crm-primary" asChild>
            <Link href="/admin/districts">Cancel</Link>
          </Button>
          <Button 
            onClick={() => document.getElementById("district-form").requestSubmit()} 
            disabled={loading} 
            variant="crm-primary" size="crm-primary"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {initialData ? "Update District" : "Save District"}
          </Button>
        </div>
      </div>

      <form id="district-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800">
          <div className="space-y-6">
            <LocalizedInput
              label="District Name"
              placeholder={{ en: "e.g. Kaski", np: "उदा. कास्की" }}
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Slug</label>
              <Input
                placeholder="e.g. kaski"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '') })}
                required
              />
              <p className="text-xs text-gray-500 dark:text-slate-400">Unique identifier used in URLs (e.g. /districts/kaski)</p>
            </div>

            <LocalizedTextarea
              label="Short Description"
              placeholder={{ en: "Brief overview of the district...", np: "जिल्लाको संक्षिप्त परिचय..." }}
              value={formData.shortDescription}
              onChange={(val) => setFormData({ ...formData, shortDescription: val })}
            />

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

      </form>
    </div>
  );
}
