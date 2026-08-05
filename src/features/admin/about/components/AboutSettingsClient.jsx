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
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Left Navigation */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden sticky top-[104px]">
          <div className="flex flex-col p-3">
            {ABOUT_TABS.map((tab) => {
              const isActive = activeTabId === tab.id;
              const Icon = TAB_ICONS[tab.id] || FileText;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium relative group
                    ${isActive 
                      ? 'text-primary-blue bg-blue-50 dark:bg-blue-900/20' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary-blue' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
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
