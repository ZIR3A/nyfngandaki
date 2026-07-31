"use client";

import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function MembersCTA({ isNepali }) {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#0a1e4a] shadow-xl isolate flex flex-col sm:flex-row items-center justify-between p-8 md:p-10 text-white relative">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10 w-full md:w-auto">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 shrink-0">
          <Users className="w-8 h-8 text-blue-300" />
        </div>
        
        <div className="space-y-1">
          <div className="text-sm font-bold text-blue-200 tracking-wider">
            {isNepali ? "अभियानको हिस्सा बन्नुहोस्" : "Be a part of the movement"}
          </div>
          <h2 className="text-3xl font-black text-white">
            {isNepali ? "युवा संघ गण्डकीमा जोडिनुहोस्" : "Join NYFN Gandaki"}
          </h2>
          <p className="text-sm text-blue-100/80 font-medium">
            {isNepali 
              ? "गण्डकी प्रदेशको प्रगतिशील र समृद्ध भविष्यका लागि सँगै अघि बढौं।" 
              : "Let's work together for a progressive and prosperous Gandaki Province."}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mt-0 relative z-10 shrink-0 w-full sm:w-auto">
        <Link
          href={`/${isNepali ? "np" : "en"}/contact`}
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "h-14 px-8 rounded-full text-base font-bold bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-[#0a1e4a] transition-all w-full sm:w-auto flex items-center justify-center gap-2 group"
          )}
        >
          {isNepali ? "सहभागी हुनुहोस्" : "Get Involved"}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
