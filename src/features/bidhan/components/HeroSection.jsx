"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, History, Calendar, FileBadge } from "lucide-react";
import InternalPageHero from "@/components/shared/InternalPageHero";

export default function HeroSection({
  t,
  locale,
  version,
  effectiveDate,
  publishedDate,
  onReadClick,
  onDownloadClick,
}) {
  const isNepali = locale === "np";

  const breadcrumbItems = [
    { label: t("common.home") || "Home", href: `/${locale}` },
    { label: t("bidhan.title") || "Constitution" }
  ];

  const statsPills = [
    {
      icon: <FileBadge className="w-5 h-5" />,
      value: `v${version}`,
      label: t("bidhan.currentVersion") || "Current Version",
      color: "blue"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      value: effectiveDate,
      label: t("bidhan.effectiveDate") || "Effective Date",
      color: "emerald"
    }
  ];

  return (
    <InternalPageHero
      breadcrumbItems={breadcrumbItems}
      label={t("bidhan.title") || "Constitution"}
      title={t("bidhan.heroTitle") || "Official Constitution of NYFN"}
      subtitle={
        t("bidhan.heroDescription") ||
        "The supreme guiding document that outlines the principles, organizational structure, and operational guidelines of the National Youth Federation Nepal."
      }
      statsPills={statsPills}
      isNepali={isNepali}
    >
      <div className="flex flex-wrap gap-4 mt-6">
        <Button size="lg" onClick={onReadClick} className="rounded-xl px-8 shadow-md hover:-translate-y-0.5 transition-transform duration-200">
          <FileText className="w-4 h-4 mr-2" />
          {t("bidhan.readOnline") || "Read Constitution"}
        </Button>
        <Button size="lg" onClick={onDownloadClick} variant="outline" className="rounded-xl px-6 bg-white/50 dark:bg-slate-900/50 hover:-translate-y-0.5 transition-transform duration-200">
          <Download className="w-4 h-4 mr-2" />
          {t("bidhan.downloadPdf") || "Download PDF"}
        </Button>
      </div>
    </InternalPageHero>
  );
}
