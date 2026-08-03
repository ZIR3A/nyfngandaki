"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LeadershipMessageCard from "@/features/leadership-messages/components/public/LeadershipMessageCard";

import { Quote } from "lucide-react";

export default function LeadershipMessagesSection({ dictionary, messages = [] }) {
  if (!messages || messages.length === 0) return null;

  const dict = dictionary?.home?.chairperson || {};

  // Display at most 3 messages on the homepage
  const displayMessages = messages.slice(0, 3);

  // Helper for determining grid columns to center items if < 3
  const gridColumns = displayMessages.length === 1 
    ? "grid-cols-1 max-w-md mx-auto" 
    : displayMessages.length === 2 
      ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" 
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="chairperson" className="py-16 md:py-24 relative overflow-hidden bg-transparent">
      {/* Decorative Quote Watermark */}
      <div className="absolute top-10 left-10 opacity-5 pointer-events-none">
        <Quote className="w-[400px] h-[400px] text-[#153E90] dark:text-blue-900/50" />
      </div>

      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#153E90] dark:text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {dict.label || "LEADERSHIP MESSAGES"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 dark:text-white max-w-2xl">
            {dict.heading || "Leading the Youth Towards a Prosperous Nation"}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className={`grid gap-8 ${gridColumns}`}>
          {displayMessages.map((msg, index) => (
            <LeadershipMessageCard 
              key={msg._id} 
              message={msg} 
              dictionary={dictionary} 
              index={index}
              onInteract={(data) => {
                // Future Analytics Hook
                console.log("Analytics Event:", data);
              }}
            />
          ))}
        </div>
        
        {messages.length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link 
              href={`/${dictionary?.locale || 'en'}/about#leadership-messages`} 
              className="inline-flex items-center text-[#153E90] dark:text-blue-400 font-semibold hover:text-[#D81E27] dark:hover:text-red-400 transition-colors group"
            >
              {dictionary?.common?.viewAll || "View All Messages"}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
