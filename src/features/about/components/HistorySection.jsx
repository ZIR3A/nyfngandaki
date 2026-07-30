"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";

export default function HistorySection({ dictionary }) {
  const dict = dictionary.about.history;

  return (
    <section id="history" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-8">
              <span className="text-[#153E90] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                {dict.label}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {dict.heading}
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>{dict.content1}</p>
              <p>{dict.content2}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              {/* Fallback pattern block if no image is ready */}
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                 <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-repeat" />
                 <span className="text-slate-400 font-medium z-10">Historical Image Placeholder</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
