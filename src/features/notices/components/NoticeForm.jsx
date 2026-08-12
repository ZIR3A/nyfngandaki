"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { LocalizedInput } from "@/features/admin/about/components/shared/LocalizedInput";
import { LocalizedTextarea } from "@/features/admin/about/components/shared/LocalizedTextarea";
import { MediaPicker } from "@/features/storage/components/MediaPicker";
import { createNoticeAction, updateNoticeAction } from "@/actions/notice.actions";
import { Calendar, Image as ImageIcon, Video, FileText, Settings, AlignLeft, AlertTriangle, ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Basic schema for Notice
const noticeSchema = z.object({
  title: z.object({
    en: z.string().min(1, "English title is required"),
    np: z.string().min(1, "Nepali title is required"),
  }),
  summary: z.object({
    en: z.string().optional(),
    np: z.string().optional(),
  }),
  content: z.object({
    en: z.string().optional(),
    np: z.string().optional(),
  }),
  type: z.enum(["text", "image", "pdf", "video", "mixed"]),
  priority: z.enum(["critical", "high", "normal", "low"]),
  status: z.enum(["draft", "scheduled", "published", "expired", "archived"]),
  popupEnabled: z.boolean().default(false),
  displayFrequency: z.enum(["once", "session", "daily", "always"]),
  popupDelay: z.number().min(0).default(2),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  attachments: z.array(z.any()).optional(),
  externalUrl: z.string().optional().nullable()
});

export function NoticeForm({ initialData }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;
  const [showTypeWarning, setShowTypeWarning] = useState(false);
  const [pendingType, setPendingType] = useState(null);

  const defaultValues = initialData ? {
    ...initialData,
    startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
    endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : "",
    attachments: initialData.attachments || [],
    externalUrl: initialData.attachments?.find(a => a.externalUrl)?.externalUrl || ""
  } : {
    title: { en: "", np: "" },
    summary: { en: "", np: "" },
    content: { en: "", np: "" },
    type: "text",
    priority: "normal",
    status: "draft",
    popupEnabled: false,
    displayFrequency: "once",
    popupDelay: 2,
    startDate: "",
    endDate: "",
    attachments: [],
    externalUrl: ""
  };

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    resolver: zodResolver(noticeSchema),
    defaultValues,
  });

  const watchType = watch("type");
  const watchPopupEnabled = watch("popupEnabled");
  const watchAttachments = watch("attachments") || [];
  const watchContent = watch("content");

  const handleTypeChangeRequest = (e) => {
    const newType = e.target.value;
    const currentType = watchType;
    if (newType === currentType) return;

    const hasContent = !!(watchContent?.en || watchContent?.np);
    const hasAttachments = watchAttachments.length > 0;
    
    let willLoseData = false;
    if (currentType === 'text' && hasContent && ['image', 'pdf', 'video'].includes(newType)) willLoseData = true;
    if (['image', 'pdf', 'video'].includes(currentType) && hasAttachments && newType === 'text') willLoseData = true;

    if (willLoseData) {
      setPendingType(newType);
      setShowTypeWarning(true);
    } else {
      setValue("type", newType);
      // Clean up attachments if moving to text
      if (newType === 'text') {
        setValue("attachments", []);
      }
    }
  };

  const confirmTypeChange = () => {
    setValue("type", pendingType);
    if (pendingType === 'text') {
      setValue("attachments", []);
      setValue("externalUrl", "");
    }
    if (['image', 'pdf', 'video'].includes(pendingType)) {
      setValue("content", { en: "", np: "" });
      setValue("attachments", []);
      setValue("externalUrl", "");
    }
    setShowTypeWarning(false);
    setPendingType(null);
  };

  const cancelTypeChange = () => {
    setShowTypeWarning(false);
    setPendingType(null);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Format attachments for backend NoticeAttachmentSchema
      let formattedAttachments = [];
      
      if (data.type === 'video' && data.externalUrl) {
        formattedAttachments.push({
          type: 'video',
          externalUrl: data.externalUrl,
          displayOrder: 0
        });
      }
      
      if (data.attachments && data.attachments.length > 0) {
        data.attachments.forEach((asset, index) => {
          formattedAttachments.push({
            type: asset.mimeType?.startsWith('image/') ? 'image' 
                 : asset.mimeType?.startsWith('video/') ? 'video' 
                 : asset.mimeType === 'application/pdf' ? 'pdf' 
                 : data.type === 'mixed' ? 'image' : data.type, // fallback
            storageId: asset.storageId?._id || asset.storageId || asset._id,
            displayOrder: formattedAttachments.length + index
          });
        });
      }

      // Clean dates
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        attachments: formattedAttachments
      };

      let result;
      if (isEditing) {
        result = await updateNoticeAction(initialData._id, formattedData);
      } else {
        result = await createNoticeAction(formattedData);
      }

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/notices");
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to save notice.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract initial media picker data
  const getInitialMediaData = () => {
    if (!initialData || !initialData.attachments) return [];
    return initialData.attachments
      .filter(a => a.storageId)
      .map(a => a.storageId); // assuming populated
  };

  return (
    <>
      {/* Type Change Warning Modal */}
      {showTypeWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Change Notice Type?</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Changing the notice type may remove media or content that is no longer applicable to the new type. Do you want to continue?
            </p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={cancelTypeChange} className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg">Cancel</button>
              <button type="button" onClick={confirmTypeChange} className="px-4 py-2 text-white bg-amber-600 hover:bg-amber-700 rounded-lg">Continue</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/notices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {isEditing ? "Edit Notice" : "Create Notice"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                {isEditing ? "Update an existing public announcement." : "Create a new announcement for the public website."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" size="crm-primary" onClick={() => router.push("/admin/notices")}>
              Cancel
            </Button>
            <Button 
              onClick={() => document.getElementById("notice-form").requestSubmit()} 
              disabled={isSubmitting} 
              variant="crm-primary" size="crm-primary"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {isEditing ? "Update Notice" : "Create Notice"}
            </Button>
          </div>
        </div>

      <form id="notice-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. Basic Information */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <AlignLeft className="w-5 h-5 mr-2 text-slate-400" />
            Basic Information
          </h2>
          
          <div className="space-y-6">
            <LocalizedInput
              label="Notice Title"
              value={watch("title")}
              onChange={(val) => setValue("title", val, { shouldValidate: true })}
              required
            />

            <LocalizedTextarea
              label="Short Summary"
              value={watch("summary")}
              onChange={(val) => setValue("summary", val)}
              rows={2}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Notice Type
                </label>
                <select
                  value={watchType}
                  onChange={handleTypeChangeRequest}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white"
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                  <option value="mixed">Mixed Content</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Content & Media (Dynamic) */}
        {(watchType === 'text' || watchType === 'mixed') && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-slate-400" />
              Content
            </h2>
            <LocalizedTextarea
              label="Notice Content"
              value={watch("content")}
              onChange={(val) => setValue("content", val)}
              rows={8}
              description="Basic HTML formatting is supported. Line breaks will be preserved."
            />
          </div>
        )}

        {['image', 'pdf', 'video', 'mixed'].includes(watchType) && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              {watchType === 'video' ? <Video className="w-5 h-5 mr-2 text-slate-400" /> : <ImageIcon className="w-5 h-5 mr-2 text-slate-400" />}
              {watchType === 'image' ? 'Notice Image' : watchType === 'pdf' ? 'Notice PDF' : watchType === 'video' ? 'Notice Video' : 'Media Attachments'}
            </h2>
            
            {watchType === 'video' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  External Video URL (e.g. YouTube)
                </label>
                <input
                  type="text"
                  {...register("externalUrl")}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white mb-4"
                />
                <div className="flex items-center">
                  <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
                  <span className="px-4 text-sm text-slate-500">OR UPLOAD VIDEO</span>
                  <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
                </div>
              </div>
            )}

            <MediaPicker
              name="attachments"
              module="notices"
              multiple={watchType === 'mixed'}
              accept={
                watchType === 'image' ? 'image/*' :
                watchType === 'pdf' ? 'application/pdf' :
                watchType === 'video' ? 'video/*' :
                'image/*,application/pdf,video/*'
              }
              initialData={getInitialMediaData()}
              onUpload={(asset) => {
                const current = watch("attachments") || [];
                setValue("attachments", watchType === 'mixed' ? [...current, asset] : [asset]);
              }}
              onRemove={(id) => {
                const current = watch("attachments") || [];
                setValue("attachments", current.filter(a => (a._id || a.storageId?._id || a.storageId) !== id));
              }}
            />
          </div>
        )}

        {/* 3. Popup Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-slate-400" />
            Popup Settings
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="popupEnabled"
                {...register("popupEnabled")}
                className="w-5 h-5 rounded border-slate-300 text-[#1546B0] focus:ring-[#1546B0]"
              />
              <label htmlFor="popupEnabled" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Enable Initial Popup (Show this notice when visitors land on the website)
              </label>
            </div>

            {watchPopupEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Display Frequency
                  </label>
                  <select
                    {...register("displayFrequency")}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white"
                  >
                    <option value="once">Show Once only (Never again after closing)</option>
                    <option value="session">Every Browser Session (Shows once per visit)</option>
                    <option value="daily">Once Per Day (Shows again the next day)</option>
                    <option value="always">Always Show (Every time page refreshes)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Popup Delay (Seconds)
                  </label>
                  <input
                    type="number"
                    {...register("popupDelay", { valueAsNumber: true })}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Publishing */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-slate-400" />
            Publishing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="expired">Expired</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate")}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                {...register("endDate")}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

      </form>
      </div>
    </>
  );
}
