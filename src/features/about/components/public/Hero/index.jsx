import React from 'react';
import InternalPageHero from '@/components/shared/InternalPageHero';
import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';
import HeroError from './States/HeroError';
import { MapPin, Users, Award, Building2 } from 'lucide-react';

async function fetchAboutData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching About Hero Data:', error);
    return null;
  }
}

export default async function AboutHero({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchAboutData(provinceId);

  if (!finalData) {
    return <HeroError locale={locale} />;
  }

  const isNp = locale === 'np';
  const breadcrumbItems = [
    { label: isNp ? 'गृहपृष्ठ' : 'Home', href: `/${locale}` },
    { label: isNp ? 'हाम्रो बारेमा' : 'About Us' },
  ];

  const statsPills = [
    { icon: <MapPin className="w-5 h-5" />, label: isNp ? 'जिल्लाहरू' : 'DISTRICTS', value: '11', color: 'blue' },
    { icon: <Users className="w-5 h-5" />, label: isNp ? 'प्रदेश कमिटी' : 'PROVINCE COMMITTEE', value: '1', color: 'red' },
    { icon: <Users className="w-5 h-5" />, label: isNp ? 'पदाधिकारीहरू' : 'OFFICE BEARERS', value: '1', color: 'green' },
    { icon: <Users className="w-5 h-5" />, label: isNp ? 'सक्रिय सदस्यहरू' : 'ACTIVE MEMBERS', value: '4+', color: 'purple' },
    { icon: <Building2 className="w-5 h-5" />, label: isNp ? 'आबद्धता' : 'AFFILIATED WITH', value: 'CPN-UML', color: 'purple' },
  ];

  return (
    <InternalPageHero 
      breadcrumbItems={breadcrumbItems}
      label={isNp ? 'हाम्रो संगठनको बारेमा' : 'ABOUT OUR ORGANIZATION'}
      title={isNp ? 'राष्ट्रिय युवा संघ नेपाल गण्डकी' : 'About NYFN Gandaki'}
      subtitle={isNp 
        ? 'राष्ट्रिय युवा संघ नेपाल (NYFN) गण्डकी प्रदेश कमिटीको आधिकारिक प्रोफाइल, गण्डकी प्रदेशभर युवा नेतृत्व, लोकतान्त्रिक सहभागिता, सामुदायिक सेवा र युवा सशक्तिकरणमा समर्पित।' 
        : 'Official profile of the National Youth Federation Nepal (NYFN) Gandaki Province Committee, dedicated to youth leadership, democratic participation, community service, and youth empowerment across Gandaki Province.'}
      statsPills={statsPills}
      isNepali={isNp}
    />
  );
}
