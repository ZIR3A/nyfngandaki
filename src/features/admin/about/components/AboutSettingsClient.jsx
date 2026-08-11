'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ABOUT_TABS } from '../constants/tabs';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { 
  LayoutDashboard, LayoutTemplate, Users, 
  History, BarChart3,
  FileText, HeartHandshake, Search
} from 'lucide-react';

// Tab Components
import OrganizationTab from './tabs/OrganizationTab';
import StrategyTab from './tabs/StrategyTab';
import CoreValuesTab from './tabs/CoreValuesTab';
import SEOTab from './tabs/SEOTab';

const TAB_ICONS = {
  organization: Users,
  strategy: LayoutTemplate,
  'core-values': HeartHandshake,
  seo: Search
};

export default function AboutSettingsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [activeTabId, setActiveTabId] = useState(ABOUT_TABS[0].id);

  // Sync tab with URL
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ABOUT_TABS.find(t => t.id === tabParam)) {
      setActiveTabId(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTabId(tabId);
    router.push(`${pathname}?tab=${tabId}`, { scroll: false });
  };

  const renderActiveTab = () => {
    switch (activeTabId) {
      case 'organization': return <OrganizationTab />;
      case 'strategy': return <StrategyTab />;
      case 'core-values': return <CoreValuesTab />;
      case 'seo': return <SEOTab />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Left Navigation */}
      <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto no-scrollbar pb-4 md:pb-0 pr-0 md:pr-4 hide-scrollbar">
        {ABOUT_TABS.map((tab) => {
          const isActive = activeTabId === tab.id;
          const Icon = TAB_ICONS[tab.id] || FileText;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#1546B0] text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Content Area */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
