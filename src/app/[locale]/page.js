import HomeClient from "@/features/home/components/HomeClient";
import { MemberService } from "@/services/MemberService";

export const dynamic = "force-dynamic";
import { SiteSettingService } from "@/services/SiteSettingService";
import { ActivityService } from "@/services/ActivityService";
import { eventService } from "@/features/events/services/eventService";
import { ResourceService } from "@/services/ResourceService";
import { DistrictService } from "@/services/DistrictService";
import { BannerService } from "@/services/BannerService";

export default async function Home({ params }) {
  // Extract locale from params or default to 'en'
  const { locale = "en" } = await params;
  
  let featuredMembers = [];
  let settings = null;
  let chairperson = null;
  let activities = [];
  let events = [];
  let resources = [];
  let districts = [];
  let banners = [];

  try {
    const rawMembers = await MemberService.getFeaturedMembers(6);
    featuredMembers = JSON.parse(JSON.stringify(rawMembers));

    const rawChairperson = await MemberService.getChairperson();
    if (rawChairperson) {
      chairperson = JSON.parse(JSON.stringify(rawChairperson));
    }

    const rawSettings = await SiteSettingService.getSettings();
    if (rawSettings) {
      settings = JSON.parse(JSON.stringify(rawSettings));
    }

    const rawActivities = await ActivityService.getFeaturedActivities(3);
    activities = JSON.parse(JSON.stringify(rawActivities));

    const rawEvents = await eventService.getEvents({ limit: 4, sort: '-startDate' });
    events = JSON.parse(JSON.stringify(rawEvents.events));

    const rawResources = await ResourceService.getFeaturedResources(4);
    resources = JSON.parse(JSON.stringify(rawResources));

    const rawDistricts = await DistrictService.getAll();
    districts = JSON.parse(JSON.stringify(rawDistricts));

    const rawBanners = await BannerService.getActive();
    banners = JSON.parse(JSON.stringify(rawBanners));

  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <main className="flex-1">
      <HomeClient 
        locale={locale} 
        settings={settings}
        chairperson={chairperson}
        featuredMembers={featuredMembers} 
        activities={activities}
        events={events}
        resources={resources}
        districts={districts}
        banners={banners}
      />
    </main>
  );
}
