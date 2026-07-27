"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Users, Building2, Map, Calendar,
  Megaphone, FileText, ChevronRight, ShieldCheck, Phone, Mail,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function HomeClient({ locale, recentMembers, upcomingEvents, latestNews, latestDocs }) {
  const isNepali = locale === "ne";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  const slides = [
    {
      id: 1,
      image: "/banner-image.png",
      title: isNepali ? "राष्ट्रिय युवा संघ नेपाल" : "National Youth Federation Nepal",
      subtitle: isNepali ? "गण्डकी प्रदेश" : "Gandaki Province",
      desc: isNepali 
        ? "गण्डकीका युवाहरूलाई एकजुट गर्दै, सशक्त बनाउँदै र परिवर्तनको नेतृत्व गर्दै।"
        : "Uniting, empowering, and leading the youth of Gandaki Province toward a prosperous Nepal.",
    },
    {
      id: 2,
      image: "/banner-image.png",
      title: isNepali ? "युवा नेतृत्व" : "Youth Leadership",
      subtitle: isNepali ? "भविष्यको निर्माण" : "Building the Future",
      desc: isNepali
        ? "लोकतन्त्र, सामाजिक न्याय र आर्थिक समृद्धिका लागि काम गर्दै।"
        : "Working for democracy, social justice and economic prosperity across all 11 districts.",
    },
    {
      id: 3,
      image: "/banner-image.png",
      title: isNepali ? "सामाजिक परिवर्तन" : "Social Transformation",
      subtitle: isNepali ? "जमिनीदेखि राष्ट्रसम्म" : "From Grassroots to Nation",
      desc: isNepali
        ? "वडा समितिदेखि केन्द्रीय नीति निर्माणसम्म युवा आवाज पुर्‍याउँदै।"
        : "Connecting youth voices from ward committees to central policy-making bodies.",
    },
  ];

  const goNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const goPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const stats = [
    { label: isNepali ? "सक्रिय सदस्यहरू" : "Active Members", value: "2,540+", icon: Users, desc: isNepali ? "गण्डकी प्रदेशभर" : "Across Gandaki Province" },
    { label: isNepali ? "समितिहरू" : "Committees", value: "85+", icon: Building2, desc: isNepali ? "जिल्ला र स्थानीय तह" : "District & Local Level" },
    { label: isNepali ? "आयोजित कार्यक्रमहरू" : "Events Organized", value: "230+", icon: Calendar, desc: isNepali ? "युवा विकास" : "Youth Development" },
    { label: isNepali ? "कागजातहरू" : "Documents", value: "120+", icon: FileText, desc: isNepali ? "दिशानिर्देश र नीतिहरू" : "Guidelines & Policies" },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. HERO CAROUSEL */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full overflow-hidden" ref={emblaRef} style={{ height: 'clamp(380px, 48vw, 520px)' }}>
          <div className="flex h-full">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] min-w-0 h-full"
              >
                {/* Background Image - full bleed */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                />

                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                {/* Slide Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-[1440px] w-full mx-auto px-8 lg:px-16">
                    <motion.div
                      key={`content-${idx}`}
                      initial={idx === currentSlide ? { opacity: 0, x: -40 } : false}
                      animate={idx === currentSlide ? { opacity: 1, x: 0 } : false}
                      transition={{ duration: 0.6 }}
                      className="max-w-2xl"
                    >
                      <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">
                        {isNepali ? "आधिकारिक प्लेटफर्म" : "Official Platform"}
                      </p>
                      <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <h2 className="text-xl lg:text-xl font-extrabold text-[#F59E0B] mb-5">
                        {slide.subtitle}
                      </h2>
                      <p className="text-white/85 text-sm lg:text-base leading-relaxed mb-8 max-w-xl">
                        {slide.desc}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link href={`/${locale}/about`}>
                          <button className="bg-white text-[#1546B0] font-bold px-7 py-3 rounded-full hover:bg-blue-50 transition-all shadow-lg text-sm flex items-center gap-2">
                            {isNepali ? "हाम्रो बारे" : "About Us"}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </Link>
                        <Link href={`/${locale}/vision-mission`}>
                          <button className="border-2 border-white/60 text-white font-bold px-7 py-3 rounded-full hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                            {isNepali ? "हाम्रो दृष्टिकोण" : "Our Vision"}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-8 h-3 bg-[#D71920]'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS — matching the screenshot layout */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left: Welcome Text */}
            <div className="lg:w-72 shrink-0">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                {isNepali ? "रा.यु.सं. – गण्डकीमा स्वागत छ" : "Welcome to NYFN – Gandaki"}
              </h2>
              <div className="w-10 h-1 bg-[#D71920] mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                {isNepali
                  ? "राष्ट्रिय युवा संघ नेपाल (रा.यु.सं.) गण्डकी जिम्मेवार, अनुशासित र देशभक्त युवा निर्माण गर्न प्रतिबद्ध छ।"
                  : "National Youth Federation Nepal (NYFN) Gandaki is committed to building responsible, disciplined and patriotic youth for a prosperous nation."
                }
              </p>
              <div className="flex gap-3">
                <Link href={`/${locale}/about`}>
                  <button className="bg-[#1546B0] text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 hover:bg-[#0D2E78] transition-colors">
                    {isNepali ? "हाम्रो बारे" : "About Us"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
                <Link href={`/${locale}/vision-mission`}>
                  <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 hover:border-[#1546B0] hover:text-[#1546B0] dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors">
                    {isNepali ? "हाम्रो दृष्टिकोण" : "Our Vision"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: 4 Stat Cards */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-[#F8FAFC] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform duration-300 hover:shadow-md group"
                >
                  <div className="mx-auto w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-sm text-[#1546B0] dark:text-blue-400 group-hover:scale-110 transition-transform mb-3">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-0.5">{stat.value}</h4>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{stat.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">{stat.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
      {/* 3. PRESIDENT MESSAGE */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-[#E5E7EB] dark:border-gray-700 overflow-hidden transition-colors">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5 bg-[#1546B0] p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-extrabold mb-4">Message from the President</h3>
                  <div className="w-12 h-1 bg-[#D71920] mb-8"></div>
                </div>
                <div className="relative z-10 mt-12 lg:mt-32">
                  <p className="text-lg font-bold">Roshan Tamang</p>
                  <p className="text-white/70 font-medium">President, NYFN Gandaki</p>
                </div>
              </div>
              <div className="lg:w-3/5 p-12 lg:p-20 bg-white dark:bg-gray-800 flex flex-col justify-center">
                <img src="/logo.png" alt="NYFN" className="h-16 w-16 mb-8 opacity-20 grayscale" />
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium mb-8">
                  "Our youth are not just the leaders of tomorrow; they are the architects of today. Through NYFN Gandaki, we are building a foundation of integrity, innovation, and unity to drive sustainable development across our province."
                </p>
                <div>
                  <Link href={`/${locale}/president-message`}>
                    <Button variant="outline" className="rounded-full border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:border-[#1546B0] dark:hover:border-blue-400 hover:text-[#1546B0] dark:hover:text-blue-400 h-12 px-8">
                      Read Full Message
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT & CORE VALUES */}
      <section id="organization" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors">
        {/* Subtle mesh overlay */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#1546B0]/5 dark:from-[#1546B0]/20 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* About Text */}
            <div className="lg:w-1/3 pt-4">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Empowering the youth of Gandaki.</h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                The National Youth Federation Nepal is a leading youth organization dedicated to fostering leadership, advocating for youth rights, and organizing community development initiatives.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-blue-50 dark:bg-blue-900/30 text-[#1546B0] dark:text-blue-400 rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Our Mission</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">To unite the youth force for social transformation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-red-50 dark:bg-red-900/30 text-[#D71920] dark:text-red-400 rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Our Vision</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">A prosperous, equitable, and youth-led Nepal.</p>
                  </div>
                </div>
              </div>
              <Button className="rounded-full bg-[#1546B0] hover:bg-[#0D2E78] text-white px-8 h-12 shadow-md">
                Organization Timeline
              </Button>
            </div>

            {/* Core Values Grid */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Leadership", desc: "Building capable youth leaders.", icon: ShieldCheck, color: "text-[#1546B0] dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
                { title: "Integrity", desc: "Upholding honesty and ethics.", icon: ShieldCheck, color: "text-[#D71920] dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30" },
                { title: "Service", desc: "Dedicated to community welfare.", icon: Users, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
                { title: "Unity", desc: "Fostering collaboration and peace.", icon: Building2, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
                { title: "Innovation", desc: "Embracing new ideas and tech.", icon: Megaphone, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30" },
                { title: "Empowerment", desc: "Enabling youth to take charge.", icon: ArrowRight, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-900/30" },
              ].map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#F8FAFC] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 p-6 rounded-[20px] hover:shadow-lg transition-shadow group"
                >
                  <div className={`h-12 w-12 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <val.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{val.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{val.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. ORGANIZATION HIERARCHY */}
      <section className="py-24 bg-[#0D2E78] text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-extrabold mb-16"
          >
            Organization Structure
          </motion.h2>

          <div className="flex flex-col items-center relative">
            {/* National Level */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 w-72 p-6 rounded-[20px] relative z-10"
            >
              <h4 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Central Level</h4>
              <h3 className="text-xl font-extrabold text-white">National Committee</h3>
            </motion.div>

            {/* Connecting Line */}
            <div className="h-12 w-px bg-gradient-to-b from-white/50 to-white/20"></div>

            {/* Province Level */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white text-[#0D2E78] w-80 p-6 rounded-[20px] shadow-xl relative z-10 border-4 border-[#1546B0]"
            >
              <h4 className="text-xs font-extrabold text-[#D71920] uppercase tracking-widest mb-1">Provincial Level</h4>
              <h3 className="text-xl font-extrabold">Gandaki Province</h3>
              <p className="text-sm font-bold text-gray-500 mt-2">85+ Committees</p>
            </motion.div>

            {/* Connecting Line */}
            <div className="h-12 w-px bg-gradient-to-b from-white/50 to-white/20"></div>

            {/* Districts Grid */}
            <div className="w-full relative">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-white/20"></div>
              <div className="grid grid-cols-3 gap-4 pt-8">
                {/* Connecting lines for districts */}
                <div className="absolute top-0 left-1/4 h-8 w-px bg-white/20"></div>
                <div className="absolute top-0 left-1/2 h-8 w-px bg-white/20"></div>
                <div className="absolute top-0 right-1/4 h-8 w-px bg-white/20"></div>

                {[
                  { name: "Kaski District", count: 21 },
                  { name: "Syangja District", count: 11 },
                  { name: "Tanahun District", count: 14 }
                ].map((dist, i) => (
                  <motion.div
                    key={dist.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="bg-white/10 backdrop-blur-md p-5 rounded-[20px] border border-white/10 hover:bg-white/20 transition-colors"
                  >
                    <h3 className="font-bold text-lg text-white mb-1">{dist.name}</h3>
                    <p className="text-xs text-blue-200">{dist.count} Committees</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Link href={`/${locale}/committees/district`}>
                <Button className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full px-8 cursor-pointer">
                  View All 11 Districts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 6. EXECUTIVE COMMITTEE & DISTRICTS */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h4 className="text-[#D71920] font-bold tracking-widest uppercase text-sm mb-2">Our Leaders</h4>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Executive Committee</h2>
            </div>
            <Link href={`/${locale}/members`} className="text-[#1546B0] dark:text-blue-400 font-bold hover:underline flex items-center gap-1 mt-4 md:mt-0">
              View Complete Directory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {recentMembers && recentMembers.length > 0 ? (
              recentMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all border border-[#E5E7EB] group"
                >
                  <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.firstName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-500">
                        <Users className="h-20 w-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E78]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <Button className="w-full bg-white text-[#1546B0] hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 rounded-full">View Profile</Button>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      {isNepali && member.nepaliName ? member.nepaliName : `${member.firstName} ${member.lastName}`}
                    </h3>
                    <p className="text-[#1546B0] dark:text-blue-400 font-bold text-sm mt-1">
                      {member.position || "Executive Member"}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-4 text-center py-20 bg-white dark:bg-gray-800 rounded-[20px] border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                Member directory is currently empty.
              </div>
            )}
          </div>

          {/* Districts Committees */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">District Committees</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Kaski", "Syangja", "Tanahun"].map((dist, i) => (
              <motion.div
                key={dist}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-[20px] border border-[#E5E7EB] dark:border-gray-700 hover:border-[#1546B0] dark:hover:border-blue-400 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#1546B0] dark:text-blue-400 flex items-center justify-center group-hover:bg-[#1546B0] dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Map className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{dist} District</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">12 Local Committees</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-300 dark:text-gray-600 group-hover:text-[#1546B0] dark:group-hover:text-blue-400 transition-colors" />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. MEDIA & EVENTS */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Announcements */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Latest Announcements</h2>
                <Link href="#" className="text-[#1546B0] dark:text-blue-400 font-bold text-sm hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {latestNews && latestNews.length > 0 ? latestNews.map((notice, i) => (
                  <Link href={`/${locale}/news/${notice.slug}`} key={notice.id} className="block">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-[16px] border border-[#E5E7EB] dark:border-gray-700 hover:shadow-md transition-shadow flex gap-5 bg-white dark:bg-gray-800 cursor-pointer group"
                    >
                      <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 bg-[#F8FAFC] dark:bg-gray-900 rounded-xl text-center">
                        <span className="text-[#D71920] dark:text-red-400 font-extrabold text-xl leading-none">{new Date(notice.publishedAt || notice.createdAt).getDate()}</span>
                        <span className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase">{new Date(notice.publishedAt || notice.createdAt).toLocaleString('default', { month: 'short' })}</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-[#1546B0] dark:group-hover:text-blue-400 transition-colors leading-tight">{isNepali && notice.titleNp ? notice.titleNp : notice.title}</h4>
                      </div>
                    </motion.div>
                  </Link>
                )) : (
                  <p className="text-gray-500 text-sm py-4">No recent announcements.</p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Upcoming Events</h2>
                <Link href={`/${locale}/events`} className="text-[#1546B0] dark:text-blue-400 font-bold text-sm hover:underline">View Calendar</Link>
              </div>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-[#0D2E78] text-white rounded-[24px] p-8 relative overflow-hidden shadow-lg group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <Calendar className="h-32 w-32" />
                  </div>
                  <div className="relative z-10">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Featured Event</span>
                    <h3 className="text-xl font-extrabold mb-2">Leadership Training Workshop 2026</h3>
                    <p className="text-white/80 font-medium mb-6">Pokhara City Hall, Gandaki</p>
                    <div className="flex items-center gap-4">
                      <div className="bg-white text-[#0D2E78] font-bold py-2 px-4 rounded-lg text-center">
                        <span className="block text-sm opacity-60">August</span>
                        <span className="block text-2xl leading-none">12</span>
                      </div>
                      <Button className="rounded-full bg-[#D71920] hover:bg-red-700 text-white border-0">
                        Register Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. RESOURCES & DOCUMENTS */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Official Resources</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">Access official documents, guidelines, and the constitution of the National Youth Federation Nepal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Constitution Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-[#1546B0] text-white rounded-[24px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center group"
            >
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <div className="relative z-10 max-w-lg">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <FileText className="h-4 w-4" /> Official Document
                </div>
                <h3 className="text-2xl font-extrabold mb-4">NYFN Constitution (Bidhan)</h3>
                <p className="text-white/80 font-medium mb-8 text-lg">The foundational guidelines, rules, and structures governing the National Youth Federation Nepal.</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-[#1546B0] hover:bg-gray-100 rounded-full px-8 shadow-lg">Download PDF</Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent">Read Online</Button>
                </div>
              </div>
            </motion.div>

            {/* Other Docs */}
            <div className="flex flex-col gap-6">
              {latestDocs && latestDocs.length > 0 ? latestDocs.map((doc, i) => (
                <Link href={doc.fileUrl || "#"} target="_blank" key={doc.id}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-5 rounded-[20px] border border-[#E5E7EB] dark:border-gray-700 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-red-50 dark:bg-red-900/30 text-[#D71920] dark:text-red-400 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#1546B0] dark:group-hover:text-blue-400 transition-colors">{isNepali && doc.titleNp ? doc.titleNp : doc.title}</h4>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-[#1546B0] dark:group-hover:text-blue-400 transition-colors" />
                  </motion.div>
                </Link>
              )) : (
                <p className="text-gray-500 text-sm">No recent documents.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA & FOOTER */}
      <section className="bg-[#0A2463] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#1546B0_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden mb-24"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1546B0]/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1546B0]/30 rounded-full blur-3xl"></div>

            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 relative z-10">Become a Part of the Movement</h2>
            <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto mb-10 relative z-10">
              Join thousands of youths across Gandaki Province working together for social transformation, leadership development, and national prosperity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button className="bg-[#D71920] text-white hover:bg-red-700 rounded-full h-14 px-10 text-base font-bold shadow-lg">
                Register as Member
              </Button>
              <Button className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-full h-14 px-10 text-base font-bold">
                Contact Us
              </Button>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}

