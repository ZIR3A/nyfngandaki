"use client";

import { motion } from "framer-motion";

export default function AboutBanner({ dictionary }) {
  const dict = dictionary.about.banner;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-[#153E90] to-[#0D2E78] text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] opacity-10 bg-repeat" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D81E27] rounded-full blur-[128px] opacity-20" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full blur-[96px] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {dict.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-blue-100 leading-relaxed"
        >
          {dict.description}
        </motion.p>
      </div>
    </section>
  );
}
