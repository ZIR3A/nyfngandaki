import { MemberService } from "@/services/MemberService";
import { eventService } from "@/features/events/services/eventService";

export const dynamic = "force-dynamic";

export async function GET() {
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
            ne: `${baseUrl}/np${route === "/" ? "" : route}`,
            "x-default": `${baseUrl}/en${route === "/" ? "" : route}`,
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
                  ne: `${baseUrl}/np/members/${member.slug}`,
                  "x-default": `${baseUrl}/en/members/${member.slug}`,
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
                  ne: `${baseUrl}/np/events/${event.slug}`,
                  "x-default": `${baseUrl}/en/events/${event.slug}`,
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

  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  sitemapUrls.forEach((item) => {
    xml += `  <url>\n`;
    const lastModDate = item.lastModified ? new Date(item.lastModified) : new Date();
    const isoDate = isNaN(lastModDate.getTime()) ? new Date().toISOString() : lastModDate.toISOString();
    
    xml += `    <loc>${item.url}</loc>\n`;
    xml += `    <lastmod>${isoDate}</lastmod>\n`;
    xml += `    <changefreq>${item.changeFrequency}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    
    if (item.alternates && item.alternates.languages) {
      Object.entries(item.alternates.languages).forEach(([lang, href]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />\n`;
      });
    }
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
