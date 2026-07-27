import { PageHeader } from "@/components/shared/PageHeader";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone, FileText, Building2, User, Globe } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  
  await connectToDatabase();
  const member = await Member.findOne({ slug }).lean();
  
  if (!member) {
    return { title: "Member Not Found | NYFN Gandaki" };
  }
  
  const name = locale === "np" && member.name.np ? member.name.np : member.name.en;
  
  return { 
    title: `${name} | NYFN Gandaki`,
    description: locale === "np" && member.seo?.description?.np ? member.seo.description.np : (member.seo?.description?.en || `Profile of ${name}`)
  };
}

export default async function MemberProfilePage({ params }) {
  const { slug, locale } = await params;
  const isNepali = locale === "np";

  await connectToDatabase();
  const member = await Member.findOne({ slug }).populate("district").lean();

  if (!member) {
    notFound();
  }

  const fullName = isNepali && member.name.np ? member.name.np : member.name.en;
  const role = isNepali && member.position.np ? member.position.np : member.position.en;
  const districtName = member.district ? (isNepali && member.district.name.np ? member.district.name.np : member.district.name.en) : (member.province || "Gandaki");
  const biography = isNepali && member.biography?.np ? member.biography.np : member.biography?.en;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
      <PageHeader 
        title={isNepali ? "सदस्य विवरण" : "Member Profile"}
        subtitle={fullName}
        breadcrumbItems={[
          { label: isNepali ? "गृहपृष्ठ" : "Home", href: `/${locale}` },
          { label: isNepali ? "सदस्यहरू" : "Members", href: `/${locale}/members` },
          { label: fullName, href: `/${locale}/members/${slug}`, active: true }
        ]}
      />

      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          
          <div className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row transition-colors">
            
            {/* Left: Photo & Quick Contact */}
            <div className="w-full md:w-2/5 lg:w-1/3 bg-gray-50 dark:bg-gray-900/50 p-8 lg:p-12 border-r border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="relative h-64 w-64 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-lg mb-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                {member.photo ? (
                  <Image 
                    src={member.photo} 
                    alt={fullName} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <User className="h-24 w-24 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">{fullName}</h1>
              <p className="text-[#1546B0] dark:text-blue-400 font-bold mb-4">{role}</p>
              
              <div className="flex gap-3 mb-8">
                {member.facebook && (
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#1546B0] dark:text-blue-400 hover:bg-[#1546B0] hover:text-white dark:hover:bg-blue-500 transition-colors">
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>

              <div className="w-full space-y-4 text-left border-t border-gray-200 dark:border-gray-700 pt-8 mt-auto">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0" />
                  <span className="text-sm font-medium">{districtName} {isNepali ? "जिल्ला" : "District"}</span>
                </div>
                {member.email && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <span className="text-sm font-medium break-all">{member.email}</span>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0" />
                    <span className="text-sm font-medium">{member.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Biography & Details */}
            <div className="w-full md:w-3/5 lg:w-2/3 p-8 lg:p-16">
              
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-[#1546B0] dark:text-blue-400" />
                  {isNepali ? "जीवनी" : "Biography"}
                </h3>
                {biography ? (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                    {biography}
                  </p>
                ) : (
                  <p className="text-gray-400 dark:text-gray-600 italic">{isNepali ? "कुनै जीवनी उपलब्ध छैन।" : "No biography available."}</p>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
