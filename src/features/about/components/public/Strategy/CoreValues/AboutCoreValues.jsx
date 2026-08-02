'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Shared/SectionHeading';
import CoreValueCard from './CoreValueCard';

export default function AboutCoreValues({ coreValues, locale = 'en' }) {
  const officialValues = [
    {
      _id: '1',
      title: { en: 'Youth Empowerment', np: 'युवा सशक्तिकरण' },
      description: { en: 'Fostering leadership, skills, and opportunities for youth to drive national development.', np: 'राष्ट्रिय विकासको लागि युवाहरूमा नेतृत्व, सीप र अवसरहरूको विकास गर्ने।' }
    },
    {
      _id: '2',
      title: { en: 'Patriotism & Integrity', np: 'देशभक्ति र सत्यनिष्ठा' },
      description: { en: 'Upholding national pride and operating with the highest ethical standards in all endeavors.', np: 'राष्ट्रिय गौरवलाई कायम राख्दै सबै कार्यहरूमा उच्च नैतिक मापदण्डहरू पालना गर्ने।' }
    },
    {
      _id: '3',
      title: { en: 'Public Service', np: 'जनसेवा' },
      description: { en: 'Dedicating ourselves to community welfare, disaster response, and social upliftment.', np: 'सामुदायिक कल्याण, विपद् उद्धार र सामाजिक उत्थानमा समर्पित रहने।' }
    },
    {
      _id: '4',
      title: { en: 'Inclusivity', np: 'समावेशिता' },
      description: { en: 'Ensuring equal representation and voice for all youth across diverse communities.', np: 'विविध समुदायका सबै युवाहरूका लागि समान प्रतिनिधित्व र आवाज सुनिश्चित गर्ने।' }
    },
    {
      _id: '5',
      title: { en: 'Democratic Values', np: 'लोकतान्त्रिक मूल्यमान्यता' },
      description: { en: 'Championing democratic principles, rule of law, and institutional transparency.', np: 'लोकतान्त्रिक सिद्धान्त, कानुनी शासन र संस्थागत पारदर्शितालाई प्रवर्द्धन गर्ने।' }
    },
    {
      _id: '6',
      title: { en: 'Progressive Transformation', np: 'प्रगतिशील रूपान्तरण' },
      description: { en: 'Driving positive social, economic, and political change in the society.', np: 'समाजमा सकारात्मक सामाजिक, आर्थिक र राजनीतिक परिवर्तन ल्याउने।' }
    }
  ];

  const valuesToDisplay = (coreValues && coreValues.length > 0) ? coreValues : officialValues;


  const isNp = locale === 'np';
  const label = isNp ? 'मूल्य मान्यताहरू' : 'Core Values';
  const heading = isNp ? 'हाम्रा सिद्धान्त र मान्यताहरू' : 'What We Stand For';

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto py-16 lg:py-16 lg:py-24">
      <SectionHeading label={label} heading={heading} centered={true} />
      
      <motion.div 
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {valuesToDisplay.map((coreValue, index) => (
          <CoreValueCard 
            key={coreValue._id || index} 
            coreValue={coreValue} 
            index={index} 
            locale={locale} 
          />
        ))}
      </motion.div>
    </div>
  );
}
