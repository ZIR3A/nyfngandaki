"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, Mail, Users, Award, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function DistrictInfoPanel({ isNepali, className }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("district");
  
  const [district, setDistrict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug || slug === "all") {
      setDistrict(null);
      return;
    }

    const fetchDistrict = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/public/districts/${slug}`);
        const json = await res.json();
        if (json.success) {
          setDistrict(json.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDistrict();
  }, [slug]);

  if (!slug || slug === "all") return null;

  if (loading) {
    return (
      <div className={cn("w-full bg-background border border-border/60 rounded-3xl p-6 shadow-sm animate-pulse mb-8", className)}>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-48 h-32 bg-muted rounded-2xl shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="h-8 w-1/3 bg-muted rounded-md" />
            <div className="h-4 w-full bg-muted rounded-md" />
            <div className="h-4 w-2/3 bg-muted rounded-md" />
            <div className="flex gap-4 pt-2">
              <div className="h-10 w-24 bg-muted rounded-xl" />
              <div className="h-10 w-24 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !district) {
    return (
      <div className={cn("w-full bg-destructive/5 border border-destructive/20 rounded-3xl p-6 text-center text-destructive mb-8", className)}>
        <p className="font-medium">{isNepali ? "जिल्ला विवरण लोड गर्न सकिएन" : "Failed to load district details"}</p>
      </div>
    );
  }

  const name = isNepali ? district.name?.np : district.name?.en;
  const desc = isNepali ? district.description?.np : district.description?.en;
  const address = isNepali ? district.officeAddress?.np : district.officeAddress?.en;

  // --- Mobile Content (Vertical Card inside Accordion) ---
  const MobileContent = () => (
    <div className="flex flex-col gap-5 pt-2 pb-4">
      <div className="w-full h-36 rounded-2xl overflow-hidden bg-muted relative border border-border/50">
        {district.coverImage ? (
          <img src={district.coverImage} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5 text-primary/40">
            <ImageIcon className="w-8 h-8 mb-2" />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-foreground">{name}</h2>
        {desc && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground leading-none">{district.stats.totalMembers}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 font-semibold">{isNepali ? "सदस्यहरू" : "Members"}</p>
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400 shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground leading-none">{district.stats.officeBearers}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 font-semibold">{isNepali ? "पदाधिकारीहरू" : "Bearers"}</p>
          </div>
        </div>
      </div>

      {(address || district.phone || district.email) && (
        <div className="space-y-3 pt-3 border-t border-border/50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{isNepali ? "सम्पर्क" : "Contact"}</h4>
          {address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground font-medium">{address}</span>
            </div>
          )}
          {district.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a href={`tel:${district.phone}`} className="text-foreground hover:text-primary transition-colors font-medium">{district.phone}</a>
            </div>
          )}
          {district.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a href={`mailto:${district.email}`} className="text-foreground hover:text-primary transition-colors font-medium break-all">{district.email}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // --- Desktop Content (Horizontal Banner) ---
  const DesktopContent = () => (
    <div className={cn("hidden lg:flex w-full bg-background border border-border/60 rounded-[2rem] shadow-sm p-4 gap-6 sticky top-[220px] z-30 mb-8 overflow-hidden items-stretch", className)}>
      {/* Left: Cover Image */}
      <div className="w-[280px] shrink-0 rounded-2xl overflow-hidden bg-muted relative border border-border/50">
        {district.coverImage ? (
          <img src={district.coverImage} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5 text-primary/40">
            <ImageIcon className="w-10 h-10 mb-2" />
          </div>
        )}
        {/* Gradient overlay for text readability if we wanted, but we keep text outside */}
      </div>

      {/* Center: Info */}
      <div className="flex-1 flex flex-col justify-center py-2 min-w-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {isNepali ? "जिल्ला कमिटी" : "District Committee"}
        </div>
        <h2 className="text-3xl font-extrabold text-foreground truncate">{name}</h2>
        {desc && <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2 pr-4">{desc}</p>}
        
        {/* Contact Strip */}
        <div className="flex items-center gap-6 mt-4 text-sm font-medium">
          {address && (
            <div className="flex items-center gap-2 text-foreground/80">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{address}</span>
            </div>
          )}
          {district.phone && (
            <div className="flex items-center gap-2 text-foreground/80">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>{district.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Stats Column */}
      <div className="w-[180px] shrink-0 flex flex-col gap-3 justify-center border-l border-border/50 pl-6">
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-3">
          <p className="text-2xl font-black text-blue-700 dark:text-blue-400 leading-none">{district.stats.totalMembers}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <p className="text-[10px] uppercase tracking-widest text-blue-600/70 dark:text-blue-400/70 font-bold">{isNepali ? "सदस्यहरू" : "Members"}</p>
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-3">
          <p className="text-2xl font-black text-amber-700 dark:text-amber-400 leading-none">{district.stats.officeBearers}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <p className="text-[10px] uppercase tracking-widest text-amber-600/70 dark:text-amber-400/70 font-bold">{isNepali ? "पदाधिकारीहरू" : "Bearers"}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile view */}
      <div className="block lg:hidden w-full mb-8">
        <Accordion type="single" collapsible className="w-full bg-background border border-border/60 rounded-[2rem] px-5 shadow-sm">
          <AccordionItem value="info" className="border-none">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">{name}</h3>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{isNepali ? "जिल्ला विवरण देखाउनुहोस्" : "View District Details"}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <MobileContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Desktop view */}
      <DesktopContent />
    </>
  );
}
