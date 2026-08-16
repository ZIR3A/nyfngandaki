import { MemberService } from "@/services/MemberService";
import { eventService } from "@/features/events/services/eventService";

export default async function sitemap() {
  const baseUrl = "https://nyfngandaki.org";
  const locales = ["en", "np"];
  
  const staticRoutes = [
    "/",
    "/about",
    "/members",
    "/districts",
    "/events",
    "/contact"
  ];
  
  const sitemapUrls = [];
  
  // Add static routes for each locale
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapUrls.push({
        url: `${baseUrl}/${locale}${route === "/" ? "" : route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route === "/" ? "" : route}`,
            np: `${baseUrl}/np${route === "/" ? "" : route}`,
          },
        },
      });
    });
  });

  try {
    // Add dynamic members
    const members = await MemberService.getAllMembers();
    if (members && Array.isArray(members)) {
      members.forEach((member) => {
        if (member.slug) {
          locales.forEach((locale) => {
            sitemapUrls.push({
              url: `${baseUrl}/${locale}/members/${member.slug}`,
              lastModified: member.updatedAt || new Date(),
              changeFrequency: "weekly",
              priority: 0.6,
              alternates: {
                languages: {
                  en: `${baseUrl}/en/members/${member.slug}`,
                  np: `${baseUrl}/np/members/${member.slug}`,
                },
              },
            });
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching members for sitemap", error);
  }

  try {
    // Add dynamic events
    // Requesting a high limit to get all events for sitemap
    const eventsData = await eventService.getEvents({ limit: 1000 });
    if (eventsData && eventsData.events && Array.isArray(eventsData.events)) {
      eventsData.events.forEach((event) => {
        if (event.slug) {
          locales.forEach((locale) => {
            sitemapUrls.push({
              url: `${baseUrl}/${locale}/events/${event.slug}`,
              lastModified: event.updatedAt || new Date(),
              changeFrequency: "monthly",
              priority: 0.7,
              alternates: {
                languages: {
                  en: `${baseUrl}/en/events/${event.slug}`,
                  np: `${baseUrl}/np/events/${event.slug}`,
                },
              },
            });
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching events for sitemap", error);
  }

  return sitemapUrls;
}
