"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/features/events/validations/event.validation";
import { updateEventAction } from "@/features/events/actions/event.actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import EventFormTabs from "./EventFormTabs";
import EventActionButtons from "./EventActionButtons";
import BasicTab from "./tabs/BasicTab";
import ContentTab from "./tabs/ContentTab";
import ScheduleTab from "./tabs/ScheduleTab";
import LocationTab from "./tabs/LocationTab";
import GalleryTab from "./tabs/GalleryTab";
import SEOTab from "./tabs/SEOTab";
import SettingsTab from "./tabs/SettingsTab";

const TAB_COMPONENTS = {
  basic: BasicTab,
  content: ContentTab,
  schedule: ScheduleTab,
  location: LocationTab,
  gallery: GalleryTab,
  seo: SEOTab,
  settings: SettingsTab,
};

export default function EditEventForm({ event }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  
  // Clean dates for the form
  const formattedStartDate = event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : "";
  const formattedEndDate = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : "";

  // Format media for AdvancedMediaPicker
  const formattedMedia = (event.media || []).map(m => ({
    _id: m._id?.toString() || m.url,
    url: m.url,
    originalName: m.title?.en || '',
    mimeType: m.type === 'video' ? 'video/mp4' : m.type === 'document' ? 'application/pdf' : 'image/jpeg',
    isFeatured: event.coverImage === m.url,
    caption: {
      en: m.title?.en || '',
      np: m.title?.np || ''
    }
  }));

  // Initialize react-hook-form with Zod validation
  const methods = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ...event,
      category: event.category?._id?.toString() || event.category || "",
      district: event.district?._id?.toString() || event.district || "",
      media: formattedMedia,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      tags: Array.isArray(event.tags) ? event.tags.join(', ') : event.tags || "",
    },
    mode: "onBlur"
  });

  const { handleSubmit, formState: { isSubmitting, isDirty, errors } } = methods;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const onSubmit = async (data) => {
    const result = await updateEventAction(event._id, data);
    if (result.success) {
      router.push("/admin/events");
    } else {
      alert(`Error updating event: ${result.error}`);
    }
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-[calc(100vh-100px)]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 shrink-0">
            <div className="flex items-center gap-4">
              <Link href="/admin/events">
                <Button type="button" variant="outline" size="icon" className="h-9 w-9 rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Event</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  Update the details for this event across the tabs.
                </p>
              </div>
            </div>
            <EventActionButtons isSubmitting={isSubmitting} isDirty={isDirty} />
          </div>

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
            {/* Sidebar Tabs */}
            <EventFormTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Tab Content Area */}
            <div className="flex-1 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-y-auto p-6 md:p-8">
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-900/50">
                  <strong>Please fix validation errors in the following fields:</strong>
                  <ul className="list-disc pl-5 mt-2">
                    {Object.keys(errors).map(key => (
                      <li key={key}>{key}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <ActiveComponent />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
