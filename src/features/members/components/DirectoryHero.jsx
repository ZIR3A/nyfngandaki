"use client";

import React, { useEffect, useState, useRef } from "react";
import { Users, MapPin, Award } from "lucide-react";
import { animate, useInView } from "framer-motion";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { GlobalMemberSearch } from "./GlobalMemberSearch";
import InternalPageHero from "@/components/shared/InternalPageHero";

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

export function DirectoryHero({ isNepali }) {
  const { data: json } = useSWR("/api/public/members/statistics", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  const stats = json?.data || { totalMembers: 0, totalDistricts: 0, officeBearers: 0 };

  const breadcrumbItems = [
    { label: isNepali ? 'गृहपृष्ठ' : 'Home', href: `/${isNepali ? "np" : "en"}` },
    { label: isNepali ? 'सदस्य निर्देशिका' : 'Members Directory' },
  ];

  const statsPills = [
    { 
      icon: <MapPin className="w-5 h-5" />, 
      label: isNepali ? 'जिल्लाहरू' : 'DISTRICTS', 
      value: <AnimatedCounter value={stats.totalDistricts || 11} />, 
      color: 'blue' 
    },
    { 
      icon: <Award className="w-5 h-5" />, 
      label: isNepali ? 'प्रदेश कमिटी' : 'PROVINCE COMMITTEE', 
      value: <AnimatedCounter value={1} />, 
      color: 'purple' 
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      label: isNepali ? 'पदाधिकारीहरू' : 'OFFICE BEARERS', 
      value: <AnimatedCounter value={stats.officeBearers || 0} />, 
      color: 'red' 
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      label: isNepali ? 'सक्रिय सदस्यहरू' : 'ACTIVE MEMBERS', 
      value: <AnimatedCounter value={stats.totalMembers || 0} />, 
      color: 'green' 
    },
  ];

  return (
    <InternalPageHero 
      breadcrumbItems={breadcrumbItems}
      label={isNepali ? 'गण्डकी प्रदेश कमिटी' : 'GANDAKI PROVINCE COMMITTEE'}
      title={isNepali ? 'सदस्य निर्देशिका' : 'Members Directory'}
      subtitle={isNepali 
        ? 'राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेश अन्तर्गतका प्रदेश समिति तथा सम्पूर्ण जिल्ला समितिहरूको आधिकारिक विवरण।'
        : 'The official directory of the Province Committee and all District Committees under National Youth Federation Nepal, Gandaki Province.'}
      statsPills={statsPills}
      isNepali={isNepali}
    >
      <GlobalMemberSearch isNepali={isNepali} />
    </InternalPageHero>
  );
}
