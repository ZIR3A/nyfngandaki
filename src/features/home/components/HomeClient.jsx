"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { en } from "@/localization/dictionaries/en";
import { np } from "@/localization/dictionaries/np";

// Import all the new modular homepage sections
import HeroSection from "./HeroSection";
import OrganizationOverview from "./OrganizationOverview";
import ChairpersonSection from "@/components/shared/ChairpersonSection";

import StatisticsSection from "./StatisticsSection";
import OrganizationStructure from "@/components/shared/OrganizationStructure";
import FeaturedLeadership from "./FeaturedLeadership";
import InteractiveDistrictMap from "./InteractiveDistrictMap";
import ActivitiesSection from "./ActivitiesSection";
import EventsSection from "./EventsSection";
import ResourcesSection from "./ResourcesSection";
import CTASection from "./CTASection";

export default function HomeClient({ 
  locale, 
  settings,
  chairperson,
  featuredMembers, 
  events, 
  activities,
  resources,
  districts,
  banners
}) {
  const { language } = useLanguage();
  
  // Select the appropriate dictionary based on the current language
  const dictionary = language === 'np' ? np : en;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
      {/* 1. Immersive Hero Experience */}
      <HeroSection dictionary={dictionary} settings={settings} banners={banners} />

      {/* 2. Organization Overview */}
      <OrganizationOverview dictionary={dictionary} settings={settings} />

      {/* 3. Chairperson Message */}
      <ChairpersonSection dictionary={dictionary} chairperson={chairperson} />



      {/* 5. Organization Structure */}
      <OrganizationStructure dictionary={dictionary} />

      {/* 7. Featured Leadership */}
      <FeaturedLeadership dictionary={dictionary} featuredMembers={featuredMembers} />

      {/* 8. Interactive District Map */}
      <InteractiveDistrictMap dictionary={dictionary} settings={settings} districts={districts} />

      {/* 9. Social Impact Activities */}
      <ActivitiesSection dictionary={dictionary} activities={activities} />

      {/* 10. Upcoming Events */}
      <EventsSection dictionary={dictionary} events={events} />

      {/* 11. Official Resources */}
      <ResourcesSection dictionary={dictionary} resources={resources} />

      {/* 12. Call to Action */}
      <CTASection dictionary={dictionary} settings={settings} />
    </div>
  );
}
