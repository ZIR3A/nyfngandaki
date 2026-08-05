"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDepartmentsAction, createDepartmentAction, updateDepartmentAction, deleteDepartmentAction } from "@/actions/department.actions";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { toast } from "sonner";

export function CommitteeDepartmentsTab({ committee }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  
  const [formData, setFormData] = useState({
    name: { en: "", np: "" },
    description: { en: "", np: "" },
    displayOrder: 0,
    status: "Active"
  });
  const [saving, setSaving] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    const res = await getDepartmentsAction(committee._id);
    if (res.success) {
      setDepartments(res.data);
      setError(null);
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDepartments();
  }, [committee._id]);

  const openAddModal = () => {
    setEditingDepartment(null);
    setFormData({
      name: { en: "", np: "" },
      description: { en: "", np: "" },
      displayOrder: departments.length,
      status: "Active"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditingDepartment(dept);
    setFormData({
      name: dept.name,
      description: dept.description,
      displayOrder: dept.displayOrder,
      status: dept.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = { ...formData, committee_id: committee._id };
    
    try {
      let res;
      if (editingDepartment) {
        res = await updateDepartmentAction(editingDepartment._id, payload);
      } else {
        res = await createDepartmentAction(payload);
      }
      
      if (res.success) {
        toast.success("Success", { description: res.message || (editingDepartment ? "Department updated" : "Department created") });
        setIsModalOpen(false);
        fetchDepartments();
      } else {
        toast.error("Error", { 
          description: res.errors?.length 
            ? `${res.message}\nDetails: ${res.errors.join(", ")}` 
            : res.message || "Failed to save department" 
        });
      }
    } catch (err) {
      toast.error("Error", { description: err.message || "An unexpected error occurred" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department? This cannot be undone.")) return;
    
    try {
      const res = await deleteDepartmentAction(id, committee._id);
      if (res.success) {
        toast.success("Success", { description: res.message || "Department deleted successfully" });
        fetchDepartments();
      } else {
        toast.error("Error", { 
          description: res.errors?.length 
            ? `${res.message}\nDetails: ${res.errors.join(", ")}` 
            : res.message || "Failed to delete department" 
        });
      }
    } catch (err) {
      toast.error("Error", { description: err.message || "An unexpected error occurred" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Departments</h2>
          <p className="text-sm text-gray-500">Manage departments (bibhag) under this committee</p>
        </div>
        <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="p-0">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="p-6 text-red-500 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        ) : departments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No departments found for this committee.</p>
            <Button variant="link" onClick={openAddModal} className="text-blue-600 mt-2">
              Create the first department
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-4 font-bold">Name (EN/NP)</th>
                  <th className="px-6 py-4 font-bold text-center">Display Order</th>
                  <th className="px-6 py-4 font-bold text-center">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departments.map((dept) => (
                  <tr key={dept._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{dept.name?.en}</div>
                      <div className="text-gray-500">{dept.name?.np}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                      {dept.displayOrder}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${dept.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {dept.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer" onClick={() => openEditModal(dept)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer" onClick={() => handleDelete(dept._id)} disabled={saving}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-900">
                {editingDepartment ? "Edit Department" : "Add Department"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <LocalizedInput
                label="Department Name"
                placeholder={{ en: "e.g. IT Department", np: "सूचना प्रविधि विभाग" }}
                value={formData.name}
                onChange={(val) => setFormData({ ...formData, name: val })}
                required
              />

              <LocalizedTextarea
                label="Description"
                placeholder={{ en: "Brief description...", np: "छोटो विवरण..." }}
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val })}
                rows={3}
              />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Display Order</label>
                  <Input 
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Status</label>
                  <select 
                    className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {saving ? "Saving..." : "Save Department"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
