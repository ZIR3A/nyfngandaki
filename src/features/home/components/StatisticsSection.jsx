"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/localization/LanguageContext";
import { useEffect, useState, useRef } from "react";

const Counter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

export default function StatisticsSection({ dictionary, settings }) {
  const { language } = useLanguage();
  const dict = dictionary.home.stats;

  // Use dynamic stats if available and valid, otherwise fallback
  let stats = [];
  if (settings?.stats && settings.stats.length > 0) {
    stats = settings.stats.map(s => ({
      value: parseInt(s.value.replace(/[^0-9]/g, ''), 10) || 0,
      suffix: s.value.replace(/[0-9]/g, ''),
      label: s.label?.[language] || ""
    }));
  } else {
    stats = [
      { value: 2500, suffix: "+", label: dict.members },
      { value: 85, suffix: "+", label: dict.committee },
      { value: 230, suffix: "+", label: dict.programs },
      { value: 11, suffix: "", label: dict.districts },
    ];
  }

  return (
    <section className="py-24 bg-[#07152D] relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 divide-x-0 md:divide-x divide-[#203A66]">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="text-5xl md:text-6xl lg:text-[72px] font-bold text-white mb-4 tracking-tight flex items-baseline">
                <Counter from={0} to={stat.value} duration={2} />
                <span className="text-[#D81E27]">{stat.suffix}</span>
              </div>
              <p className="text-blue-200 text-lg md:text-xl font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
