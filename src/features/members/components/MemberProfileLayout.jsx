"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, User, Award, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedMembers } from "./RelatedMembers";

export function MemberProfileLayout({ member, relatedMembers, isNepali }) {
  const name = isNepali ? member.name?.np || member.name?.en : member.name?.en;
  
  let position = "";
  if (member.position_id && member.position_id.name) {
    position = isNepali ? member.position_id.name.np || member.position_id.name.en : member.position_id.name.en;
  } else if (member.position) {
    position = isNepali ? member.position.np || member.position.en : member.position.en;
  }

  let department = "";
  if (member.department_id && member.department_id.name) {
    department = isNepali ? member.department_id.name.np || member.department_id.name.en : member.department_id.name.en;
  }
  
  const biography = isNepali ? member.biography?.np || member.biography?.en : member.biography?.en;
  const districtName = member.district?.name ? (isNepali ? member.district.name.np || member.district.name.en : member.district.name.en) : null;
  const districtSlug = member.district?.slug;
  const orgLevel = member.organizationLevel || "Province";
  const orgBadgeText = orgLevel === "PROVINCE" 
    ? (isNepali ? "प्रदेश कमिटी" : "Province Committee") 
    : (isNepali ? "जिल्ला कमिटी" : "District Committee");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Banner Section */}
      <div className="w-full h-[30vh] md:h-[45vh] bg-gradient-to-br from-primary/90 to-primary/60 relative">
        {member.coverPhoto && (
          <div className="w-full h-full relative overflow-hidden group">
            <Image 
              src={member.coverPhoto} 
              alt={`${name} Cover`} 
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-60 mix-blend-overlay" 
            />
          </div>
        )}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
          <Link href={`/${isNepali ? "np" : "en"}/members`} className="inline-flex items-center gap-2 px-4 py-2 bg-background/20 hover:bg-background/40 backdrop-blur-md rounded-full text-white transition-colors text-sm font-semibold cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            {isNepali ? "डाइरेक्टरीमा फर्कनुहोस्" : "Back to Directory"}
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 -mt-24 md:-mt-32 relative z-20 pb-20">
        
        {/* 2. Profile Header Card */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="bg-background border border-border/50 rounded-[2rem] shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start"
        >
          {/* Avatar */}
          <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full border-4 md:border-8 border-background bg-muted relative overflow-hidden shadow-lg mt-[-80px] md:mt-0">
            {member.photo ? (
              <div className="w-full h-full relative overflow-hidden group">
                <Image 
                  src={member.photo} 
                  alt={name} 
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary/30">
                <User className="w-20 h-20" />
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full pt-2">
            <h1 className="text-3xl md:text-5xl font-black text-foreground">{name}</h1>
            <p className="text-xl md:text-2xl font-bold text-primary mt-2">{position}</p>
            
            {department && (
              <p className="text-md md:text-lg font-semibold text-slate-500 mt-1 uppercase tracking-wide">
                {department}
              </p>
            )}
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${orgLevel === 'Central' ? 'bg-red-50 text-red-700 border-red-100' : (orgLevel === 'Province' || orgLevel === 'PROVINCE') ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                    {orgLevel === 'Central' ? (isNepali ? 'केन्द्रीय कमिटी' : 'Central Committee') : (orgLevel === 'Province' || orgLevel === 'PROVINCE') ? (isNepali ? 'प्रदेश कमिटी' : 'Province Committee') : (isNepali ? 'जिल्ला कमिटी' : 'District Committee')}
                  </span>
              
              {districtName && orgLevel === 'DISTRICT' && (
                <Link 
                  href={`/${isNepali ? "np" : "en"}/members?district=${districtSlug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-primary/10 border border-border/80 text-foreground transition-colors rounded-xl text-sm font-bold cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  {districtName}
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
          
          {/* Biography Column (col-span-2) */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-background border border-border/50 rounded-[2rem] p-6 md:p-10 shadow-sm"
            >
              <h2 className="text-2xl font-extrabold text-foreground mb-6">
                {isNepali ? "जीवनी" : "Biography"}
              </h2>
              {biography ? (
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {biography}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  {isNepali ? "यस सदस्यको लागि कुनै जीवनी उपलब्ध छैन।" : "No biography available for this member."}
                </p>
              )}
            </motion.section>
          </div>

          {/* Sidebar Info Column (col-span-1) */}
          <div className="space-y-8">
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-background border border-border/50 rounded-[2rem] p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-xl font-extrabold text-foreground mb-6">
                {isNepali ? "सम्पर्क विवरण" : "Contact Information"}
              </h2>
              
              <div className="space-y-4">
                {member.phone && member.showPhonePublic ? (
                  <a href={`tel:${member.phone}`} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground transition-colors group cursor-pointer">
                    <div className="p-2 rounded-full bg-background group-hover:bg-primary-foreground/20 text-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{member.phone}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 text-muted-foreground">
                    <div className="p-2 rounded-full bg-background">
                      <Phone className="w-5 h-5 opacity-50" />
                    </div>
                    <span className="text-sm font-medium italic">{isNepali ? "गोप्य राखिएको छ" : "Hidden for privacy"}</span>
                  </div>
                )}

                {member.email && member.showEmailPublic ? (
                  <a href={`mailto:${member.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground text-foreground transition-colors group cursor-pointer">
                    <div className="p-2 rounded-full bg-background group-hover:bg-primary-foreground/20 text-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-semibold break-all">{member.email}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 text-muted-foreground">
                    <div className="p-2 rounded-full bg-background">
                      <Mail className="w-5 h-5 opacity-50" />
                    </div>
                    <span className="text-sm font-medium italic">{isNepali ? "गोप्य राखिएको छ" : "Hidden for privacy"}</span>
                  </div>
                )}
                
                {member.facebook && (
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-600 dark:bg-blue-900/10 dark:hover:bg-blue-600 text-blue-700 dark:text-blue-400 hover:text-white transition-colors group cursor-pointer">
                    <div className="p-2 rounded-full bg-white dark:bg-black/20 group-hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{isNepali ? "फेसबुक प्रोफाइल" : "Facebook Profile"}</span>
                  </a>
                )}
              </div>
            </motion.section>
          </div>
        </div>

        {/* 4. Related Members Section */}
        <RelatedMembers members={relatedMembers} isNepali={isNepali} />

      </div>
    </div>
  );
}
