"use client";

import { useEffect, useState, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Users, MapPin, Award, UserCheck, AlertCircle } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";

function AnimatedCounter({ value }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;
    
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (val) => {
        node.textContent = Math.round(val).toLocaleString();
      }
    });
    
    return () => controls.stop();
  }, [value, inView]);
  
  return <span ref={nodeRef}>0</span>;
}

export function DirectoryStatistics({ isNepali }) {
  const { data: json, error, isLoading } = useSWR("/api/public/members/statistics", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-card shadow-sm border border-border/30 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between animate-pulse min-h-[180px]">
            <div className="w-12 h-12 bg-muted rounded-2xl mb-6" />
            <div className="space-y-3">
              <div className="h-8 w-1/2 bg-muted rounded-lg" />
              <div className="h-4 w-3/4 bg-muted rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || (json && !json.success)) {
    return (
      <div className="w-full bg-destructive/5 border border-destructive/20 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
        <div>
          <h3 className="text-lg font-semibold text-destructive">
            {isNepali ? "तथ्याङ्क लोड गर्न सकिएन" : "Failed to load statistics"}
          </h3>
          <p className="text-destructive/80 mt-1">
            {isNepali ? "कृपया पृष्ठ रिफ्रेस गर्नुहोस् वा फेरि प्रयास गर्नुहोस्।" : "Please refresh the page or try again later."}
          </p>
        </div>
      </div>
    );
  }

  const data = json?.data;

  if (!data || (data.totalMembers === 0 && data.totalDistricts === 0)) {
    return (
      <div className="w-full border-2 border-dashed border-border rounded-[2rem] p-12 flex flex-col items-center justify-center text-center">
        <Users className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">
          {isNepali ? "कुनै तथ्याङ्क उपलब्ध छैन" : "No statistics available"}
        </h3>
      </div>
    );
  }

  const stats = [
    {
      id: "total-members",
      value: data.totalMembers,
      label: isNepali ? "जम्मा सदस्यहरू" : "Total Members",
      icon: Users,
      color: "text-[#1546B0]", // Primary Blue
      bg: "bg-[#1546B0]/10"
    },
    {
      id: "active-members",
      value: data.activeMembers,
      label: isNepali ? "सक्रिय सदस्यहरू" : "Active Members",
      icon: UserCheck,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      id: "office-bearers",
      value: data.officeBearers,
      label: isNepali ? "पदाधिकारीहरू" : "Office Bearers",
      icon: Award,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      id: "total-districts",
      value: data.totalDistricts,
      label: isNepali ? "जिल्ला कमिटीहरू" : "District Committees",
      icon: MapPin,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div 
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-white dark:bg-card shadow-sm hover:shadow-md border border-border/40 hover:border-primary/20 rounded-2xl p-5 md:p-6 flex items-center gap-5 transition-all duration-300"
          >
            <div className={`p-4 rounded-[1.25rem] ${stat.bg} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
              <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-none">
                <AnimatedCounter value={stat.value} />
              </h3>
              <p className="text-xs md:text-sm font-semibold text-muted-foreground mt-1.5">
                {stat.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
