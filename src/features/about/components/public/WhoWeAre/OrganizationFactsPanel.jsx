'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Shield } from 'lucide-react';

export default function OrganizationFactsPanel({ locale = 'en' }) {
  const isNp = locale === 'np';

  const facts = [
    {
      id: 1,
      icon: <Calendar className="w-5 h-5" />,
      label: isNp ? 'स्थापना' : 'Established',
      value: isNp ? '२०४७' : '1990 AD',
    },
    {
      id: 2,
      icon: <Shield className="w-5 h-5" />,
      label: isNp ? 'सम्बद्धता' : 'Affiliation',
      value: isNp ? 'नेकपा (एमाले)' : 'CPN (UML)',
    },
    {
      id: 3,
      icon: <MapPin className="w-5 h-5" />,
      label: isNp ? 'कार्यक्षेत्र' : 'Coverage',
      value: isNp ? 'गण्डकी प्रदेशका ११ जिल्लाहरू' : '11 Districts of Gandaki',
    },
    {
      id: 4,
      icon: <Users className="w-5 h-5" />,
      label: isNp ? 'केन्द्रित समूह' : 'Focus Group',
      value: isNp ? 'युवा र विद्यार्थी' : 'Youth & Students',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 lg:p-8 mt-8 mb-10 shadow-sm"
    >
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
        {isNp ? 'संगठन एक झलकमा' : 'Organization at a Glance'}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
        {facts.map(fact => (
          <motion.div key={fact.id} variants={itemVariants} className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary-blue">
              {fact.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                {fact.label}
              </p>
              <p className="text-base font-bold text-gray-900 dark:text-white">
                {fact.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
