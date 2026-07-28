import HomeClient from "@/features/home/components/HomeClient";
import { MemberService } from "@/services/MemberService";
import { SiteSettingService } from "@/services/SiteSettingService";
import { ActivityService } from "@/services/ActivityService";
import { EventService } from "@/services/EventService";
import { ResourceService } from "@/services/ResourceService";
import { DistrictService } from "@/services/DistrictService";

export default async function Home({ params }) {
  // Extract locale from params or default to 'en'
  const locale = await params?.locale || "en";
  
  let featuredMembers = [];
  let settings = null;
  let activities = [];
  let events = [];
  let resources = [];
  let districts = [];

  try {
    const rawMembers = await MemberService.getFeaturedMembers(6);
    featuredMembers = rawMembers.map(m => ({
      ...m,
      _id: m._id.toString(),
      district: m.district ? { ...m.district, _id: m.district._id.toString() } : null
    }));

    const rawSettings = await SiteSettingService.getSettings();
    if (rawSettings) {
      rawSettings._id = rawSettings._id.toString();
      settings = rawSettings;
    }

    const rawActivities = await ActivityService.getFeaturedActivities(3);
    activities = rawActivities.map(a => ({ ...a, _id: a._id.toString() }));

    const rawEvents = await EventService.getFeaturedEvents(3);
    events = rawEvents.map(e => ({ ...e, _id: e._id.toString() }));

    const rawResources = await ResourceService.getFeaturedResources(4);
    resources = rawResources.map(r => ({ ...r, _id: r._id.toString() }));

    const rawDistricts = await DistrictService.getAll();
    districts = rawDistricts.map(d => ({ ...d, _id: d._id.toString() }));

  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <main className="flex-1">
      <HomeClient 
        locale={locale} 
        settings={settings}
        featuredMembers={featuredMembers} 
        activities={activities}
        events={events}
        resources={resources}
        districts={districts}
      />
    </main>
  );
}
