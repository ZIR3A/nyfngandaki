"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, MapPin, Users, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";

export default function HeroSection({ dictionary, settings }) {
  const { language } = useLanguage();
  const dict = dictionary.home.hero;

  const stats = [
    { label: dictionary.home.stats.members, value: "2,500+", icon: <Users className="w-5 h-5 text-blue-500" /> },
    { label: dictionary.home.stats.districts, value: "11", icon: <MapPin className="w-5 h-5 text-red-500" /> },
    { label: dictionary.home.stats.programs, value: "230+", icon: <Activity className="w-5 h-5 text-green-500" /> },
  ];

  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[80vh] xl:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#153E90] to-[#102C69]">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white opacity-[0.02] mix-blend-overlay"></div> {/* Noise placeholder */}
        {/* Animated Glowing Circles */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[100px] opacity-10"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-red-500 rounded-full blur-[120px] opacity-10"
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-12">
        
        {/* Left Content */}
        <div className="flex flex-col items-start space-y-8">


          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight"
          >
            {settings?.heroTitle?.[language] || (language === 'en' ? (
              <>National Youth Federation Nepal <br /> <span className="text-[#D81E27]">Gandaki Province</span> Committee</>
            ) : (
              <>राष्ट्रिय युवा संघ नेपाल <br /> <span className="text-[#D81E27]">गण्डकी प्रदेश</span> समिति</>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-blue-100 max-w-lg leading-relaxed"
          >
            {settings?.heroSubtitle?.[language] || dict.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/committee" className="inline-flex items-center justify-center px-6 py-3.5 bg-blue-600 hover:bg-[#D81E27] text-white rounded-full font-medium transition-all duration-300 shadow-[0_10px_35px_rgba(21,62,144,0.3)] hover:shadow-[0_18px_50px_rgba(216,30,39,0.4)] hover:-translate-y-0.5 group">
              {dict.primaryButton}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/events" className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border-2 border-blue-400 hover:bg-blue-600 hover:border-blue-600 text-white rounded-full font-medium transition-all duration-300">
              {dict.secondaryButton}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center space-x-6 text-sm text-blue-200 pt-4"
          >
            <div className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Official Organization</div>
            <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Province Committee</div>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="relative hidden lg:block h-full min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute inset-0 rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
          >
            <div className="w-full h-full bg-blue-800 flex items-center justify-center">
               <span className="text-blue-400 opacity-50 text-xl font-medium">Hero Image (CMS Editable)</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#102C69] via-transparent to-transparent"></div>
          </motion.div>

          {/* Floating Stats */}
          <div className="absolute -bottom-6 -left-12 bg-white rounded-2xl p-6 shadow-2xl flex items-center space-x-8">
             {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-gray-50 p-3 rounded-full mb-2">{stat.icon}</div>
                  <span className="font-bold text-xl text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</span>
                </motion.div>
             ))}
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>

    </section>
  );
}
