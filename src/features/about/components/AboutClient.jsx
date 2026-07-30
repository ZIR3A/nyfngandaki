"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { en } from "@/localization/dictionaries/en";
import { np } from "@/localization/dictionaries/np";

import AboutBanner from "./AboutBanner";
import HistorySection from "./HistorySection";
import ChairpersonSection from "@/components/shared/ChairpersonSection";

import OrganizationStructure from "@/components/shared/OrganizationStructure";
import ConstitutionSection from "./ConstitutionSection";

export default function AboutClient({ settings }) {
  const { language } = useLanguage();
  const dictionary = language === 'np' ? np : en;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
      <AboutBanner dictionary={dictionary} />
      <HistorySection dictionary={dictionary} />
      <OrganizationStructure dictionary={dictionary} />
      <ChairpersonSection dictionary={dictionary} settings={settings} hideLink={true} />
      <ConstitutionSection dictionary={dictionary} />
    </div>
  );
}
