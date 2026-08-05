"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";
import { useRef } from "react";

export default function CTASection({ dictionary, settings }) {
  const dict = dictionary.home.cta;
  const { language } = useLanguage();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the background mountains
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Background texture slight horizontal shift
  const xTexture = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  const ctaTitle = settings?.ctaTitle?.[language] || dict.heading;
  const ctaDescription = settings?.ctaDescription?.[language] || dict.description;
  const ctaButtonLink = settings?.ctaButtonLink || "/committee";

  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden bg-gradient-to-br from-[#153E90] via-[#102C69] to-[#0a1b42] flex items-center justify-center" style={{ backgroundImage: 'url("/2.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#153E90]/80">
        {/* Soft Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[200px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500 rounded-full blur-[150px] opacity-10"></div>
        
        {/* Flag Texture */}
        <motion.div style={{ x: xTexture }} className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
           <div className="w-[200%] h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 2px, transparent 2px, transparent 8px)' }}></div>
        </motion.div>

        {/* Mountain Parallax Placeholder */}
        <motion.div style={{ y: yParallax }} className="absolute bottom-0 left-0 w-full h-[300px] opacity-30">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-white">
            <path d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 max-w-[1000px] relative z-10 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6 drop-shadow-lg"
        >
          {ctaTitle}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12 drop-shadow"
        >
          {ctaDescription}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href={`/${language}/members`} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-[#153E90] hover:bg-[#D81E27] hover:text-white rounded-full font-bold text-lg transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(216,30,39,0.4)] hover:-translate-y-1 group cursor-pointer">
            {dict.btn1}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link href={`/${language}/contact`} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white hover:border-white rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
            <Phone className="mr-2 w-5 h-5 group-hover:animate-bounce" />
            {dict.btn3}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
