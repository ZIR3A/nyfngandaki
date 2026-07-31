"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createCommitteeAction, updateCommitteeAction } from "@/actions/committee.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";

export function CommitteeForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: {
      en: initialData?.name?.en || "",
      np: initialData?.name?.np || "",
    },
    organizationLevel: initialData?.organizationLevel || "PROVINCE",
    status: initialData?.status || "Active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      if (initialData) {
        res = await updateCommitteeAction(initialData._id, formData);
      } else {
        res = await createCommitteeAction(formData);
      }

      if (res.success) {
        router.push("/admin/committees");
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
          <h1 className="text-2xl font-extrabold text-gray-900">{initialData ? "Edit Committee" : "Add New Committee"}</h1>
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
              label="Committee Name"
              placeholder={{ en: "e.g. Executive Committee", np: "उदा. कार्यसमिति" }}
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Organization Level</label>
              <select
                className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.organizationLevel}
                onChange={(e) => setFormData({ ...formData, organizationLevel: e.target.value })}
                required
              >
                <option value="PROVINCE">Province</option>
                <option value="DISTRICT">District</option>
              </select>
            </div>

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
          <Button type="button" variant="outline" onClick={() => router.push("/admin/committees")} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Saving..." : "Save Committee"}
          </Button>
        </div>
      </form>
    </div>
  );
}
