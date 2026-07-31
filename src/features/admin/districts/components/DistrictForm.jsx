"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createDistrictAction, updateDistrictAction } from "@/actions/district.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { Input } from "@/components/ui/input";

export function DistrictForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    try {
      let res;
      if (initialData) {
        res = await updateDistrictAction(initialData._id, formData);
      } else {
        res = await createDistrictAction(formData);
      }

      if (res.success) {
        router.push("/admin/districts");
      } else {
        setError(res.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{initialData ? "Edit District" : "Add New District"}</h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="space-y-6">
            <LocalizedInput
              label="District Name"
              placeholder={{ en: "e.g. Kaski", np: "उदा. कास्की" }}
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Slug</label>
              <Input
                placeholder="e.g. kaski"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '') })}
                required
              />
              <p className="text-xs text-gray-500">Unique identifier used in URLs (e.g. /districts/kaski)</p>
            </div>

            <LocalizedTextarea
              label="Short Description"
              placeholder={{ en: "Brief overview of the district...", np: "जिल्लाको संक्षिप्त परिचय..." }}
              value={formData.shortDescription}
              onChange={(val) => setFormData({ ...formData, shortDescription: val })}
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Status</label>
              <select
                className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          <Button type="button" variant="outline" onClick={() => router.push("/admin/districts")} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Saving..." : "Save District"}
          </Button>
        </div>
      </form>
    </div>
  );
}
