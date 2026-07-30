"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export default function ConstitutionSection({ dictionary }) {
  const dict = dictionary.about.constitution;

  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] p-10 md:p-16 shadow-[0_20px_60px_rgba(15,45,90,0.06)] border border-[#EAF1FF] max-w-4xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-[#F1F5F9] rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FileText className="w-10 h-10 text-[#153E90]" />
          </div>
          
          <span className="text-[#153E90] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            {dict.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {dict.heading}
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {dict.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#D81E27] text-white rounded-xl font-semibold hover:bg-[#B31218] transition-colors gap-2 w-full sm:w-auto"
            >
              <Download className="w-5 h-5" />
              {dict.downloadButton}
            </a>
            <span className="text-sm text-gray-400 font-medium px-4">
              {dict.sizeInfo}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
