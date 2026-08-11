"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/features/events/validations/event.validation";
import { createEventAction } from "@/features/events/actions/event.actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import EventFormTabs from "@/features/events/components/admin/EventFormTabs";
import EventActionButtons from "@/features/events/components/admin/EventActionButtons";
import BasicTab from "@/features/events/components/admin/tabs/BasicTab";
import ContentTab from "@/features/events/components/admin/tabs/ContentTab";
import ScheduleTab from "@/features/events/components/admin/tabs/ScheduleTab";
import LocationTab from "@/features/events/components/admin/tabs/LocationTab";
import GalleryTab from "@/features/events/components/admin/tabs/GalleryTab";
import SEOTab from "@/features/events/components/admin/tabs/SEOTab";
import SettingsTab from "@/features/events/components/admin/tabs/SettingsTab";

const TAB_COMPONENTS = {
  basic: BasicTab,
  content: ContentTab,
  schedule: ScheduleTab,
  location: LocationTab,
  gallery: GalleryTab,
  seo: SEOTab,
  settings: SettingsTab,
};

export default function CreateEventPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  
  // Initialize react-hook-form with Zod validation
  const methods = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: "Upcoming",
      title: { en: "", np: "" },
      summary: { en: "", np: "" },
      description: { en: "", np: "" },
      venue: { name: { en: "", np: "" } },
      organizer: { en: "", np: "" },
      duration: { en: "", np: "" },
      contact: { phone: "", email: "", website: "" },
      isFeatured: false,
      tags: "",
    },
    mode: "onBlur"
  });

  const { handleSubmit, formState: { isSubmitting, isDirty, errors } } = methods;

  // Browser level unsaved changes warning
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
    const result = await createEventAction(data);
    if (result.success) {
      router.push("/admin/events");
    } else {
      alert(`Error creating event: ${result.error}`);
    }
  };

  const handleTabChange = (newTab) => {
    // Custom internal tab navigation warning could go here
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
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Create New Event</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  Fill out the form across the tabs to publish a new event.
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
              {/* Show general validation errors if submit failed and errors exist */}
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

