'use client';
import React, { useState, useEffect } from 'react';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedInput } from '../shared/LocalizedInput';
import { MediaPicker } from '@/features/storage/components/MediaPicker';
import { Globe2, Eye, EyeOff } from 'lucide-react';

export default function OverviewTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    status: 'DRAFT',
    hero: {
      title: { en: '', np: '' },
      subtitle: { en: '', np: '' },
      imageId: null
    }
  });

  useEffect(() => {
    fetch('/api/admin/about/general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setFormData({
            status: json.data.status || 'DRAFT',
            hero: {
              title: json.data.hero?.title || { en: '', np: '' },
              subtitle: json.data.hero?.subtitle || { en: '', np: '' },
              imageId: json.data.hero?.imageId || null
            }
          });
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleHeroChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }));
    setIsDirty(true);
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({ ...prev, status }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/about/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: formData.status,
          hero: {
            title: formData.hero.title,
            subtitle: formData.hero.subtitle,
            imageId: formData.hero.imageId?._id || formData.hero.imageId || null
          }
        })
      });
      if (res.ok) setIsDirty(false);
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  return (
    <SectionFormWrapper
      title="About Page Overview & Header"
      description="Manage the top banner, title, subtitle, and publication status of the About page."
      isDirty={isDirty}
      isLoading={isLoading || isSaving}
      onSave={handleSave}
    >
      <div className="space-y-8">
        
        {/* Publication Status Block */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-primary-blue" />
              Page Publication Status
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Select whether the About page should be publicly visible or kept as a draft.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleStatusChange('PUBLISHED')}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                formData.status === 'PUBLISHED'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-750'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Published
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange('DRAFT')}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                formData.status === 'DRAFT'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-750'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" /> Draft
            </button>
          </div>
        </div>

        {/* Page Header (Hero Banner) Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <LocalizedInput
              label="Page Banner Title"
              description="The main title rendered on top of the banner image."
              value={formData.hero.title}
              onChange={(val) => handleHeroChange('title', val)}
              required
            />
            <LocalizedInput
              label="Page Banner Subtitle"
              description="A supporting tagline beneath the main title."
              value={formData.hero.subtitle}
              onChange={(val) => handleHeroChange('subtitle', val)}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 block mb-2">Banner Background Image</label>
              <MediaPicker
                key={formData.hero.imageId?._id || formData.hero.imageId || 'empty'}
                name="heroImage"
                module="about"
                multiple={false}
                initialData={formData.hero.imageId}
                onUpload={(asset) => handleHeroChange('imageId', asset)}
                onRemove={() => handleHeroChange('imageId', null)}
              />
            </div>
          </div>
        </div>

      </div>
    </SectionFormWrapper>
  );
}
