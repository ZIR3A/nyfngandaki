'use client';
import React, { useState } from 'react';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedInput } from '../shared/LocalizedInput';
import { LocalizedTextarea } from '../shared/LocalizedTextarea';

export default function SEOTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: { en: '', np: '' },
    description: { en: '', np: '' },
    keywords: [], // Stored as array in DB, we'll join/split as string for input
    ogImageId: null
  });

  // Keep a separate state for the string representation of keywords
  const [keywordsStr, setKeywordsStr] = useState({ en: '', np: '' });

  React.useEffect(() => {
    fetch('/api/admin/about/general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data?.seo) {
          setFormData({
            title: json.data.seo.title || { en: '', np: '' },
            description: json.data.seo.description || { en: '', np: '' },
            keywords: json.data.seo.keywords || [],
            ogImageId: json.data.seo.ogImageId || null
          });
          // Initialize string keywords (e.g. from array to comma separated)
          // DB schema keywords is [String], doesn't have en/np split! Wait, let me check the DB.
          // In DB: keywords: [String]
          setKeywordsStr({ en: (json.data.seo.keywords || []).join(', '), np: '' });
        }
      });
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleKeywordsChange = (val) => {
    setKeywordsStr(val);
    setFormData(prev => ({
      ...prev,
      keywords: val.en.split(',').map(s => s.trim()).filter(Boolean)
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/about/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seo: formData })
      });
      if (res.ok) setIsDirty(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionFormWrapper
      title="Search Engine Optimization (SEO)"
      description="Manage how the About Page appears on Google and social media."
      isDirty={isDirty}
      isLoading={isLoading}
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <LocalizedInput
            label="Meta Title"
            description="Keep it under 60 characters for best results."
            value={formData.title}
            onChange={(val) => handleChange('title', val)}
          />
          <LocalizedTextarea
            label="Meta Description"
            description="Keep it under 160 characters."
            value={formData.description}
            onChange={(val) => handleChange('description', val)}
            rows={3}
          />
          <LocalizedInput
            label="Keywords"
            description="Comma separated keywords."
            value={keywordsStr}
            onChange={handleKeywordsChange}
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Social Sharing Image (OpenGraph)</h3>
            <div className="w-full aspect-[1.91/1] bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="font-medium text-primary-blue">Select OG Image</span>
              <span className="text-xs text-gray-400 mt-1">Recommended: 1200x630px</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Google Preview</h4>
            <div className="space-y-1">
              <div className="text-sm text-[#1a0dab] dark:text-[#8ab4f8] font-medium truncate">
                {formData.title.en || 'Page Title'}
              </div>
              <div className="text-xs text-[#006621] dark:text-[#81c995] truncate">
                https://nyfngandaki.org/about
              </div>
              <div className="text-sm text-[#545454] dark:text-[#bdc1c6] line-clamp-2 leading-snug">
                {formData.description.en || 'Page description will appear here...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFormWrapper>
  );
}
