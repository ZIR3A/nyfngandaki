'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedInput } from '../shared/LocalizedInput';
import { LocalizedTextarea } from '../shared/LocalizedTextarea';
import { User, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function LeadershipTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [chairperson, setChairperson] = useState(null);
  const [formData, setFormData] = useState({
    cta: {
      heading: { en: '', np: '' },
      description: { en: '', np: '' }
    }
  });

  useEffect(() => {
    // Fetch general settings (includes CTA and dynamic active chairperson profile)
    fetch('/api/admin/about/general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setFormData({
            cta: json.data.cta || { heading: { en: '', np: '' }, description: { en: '', np: '' } }
          });
          if (json.data.leadership) {
            setChairperson(json.data.leadership);
          }
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      cta: {
        ...prev.cta,
        [field]: value
      }
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/about/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cta: formData.cta })
      });
      if (res.ok) setIsDirty(false);
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  return (
    <SectionFormWrapper
      title="Leadership Message & CTA Settings"
      description="Preview the active chairperson profile and customize the bottom Call to Action (CTA) block."
      isDirty={isDirty}
      isLoading={isLoading || isSaving}
      onSave={handleSave}
    >
      <div className="space-y-8">
        
        {/* Chairperson Info Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-150 dark:border-gray-700/50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Chairperson Profile</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                The featured message is fetched dynamically from the active chairperson in the Members database.
              </p>
            </div>
            
            <Link 
              href="/admin/members"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-[#1546B0] dark:text-blue-400 transition-colors"
            >
              Manage Members <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {chairperson ? (
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {chairperson.photo?.url ? (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 border dark:border-gray-700 shadow-sm">
                  <Image 
                    src={chairperson.photo.url} 
                    alt={chairperson.name} 
                    fill 
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}

              <div className="flex-1 space-y-2">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{chairperson.name}</h4>
                <p className="text-xs font-semibold text-primary-red uppercase tracking-wider">{chairperson.designation?.en || 'Chairperson'}</p>
                <div className="text-sm text-gray-650 dark:text-gray-405 leading-relaxed line-clamp-3">
                  <strong>Message Preview (EN):</strong> {chairperson.message?.en || 'No message provided.'}
                </div>
                <div className="text-sm text-gray-650 dark:text-gray-405 leading-relaxed line-clamp-3">
                  <strong>सन्दैश पूर्वावलोकन (NP):</strong> {chairperson.message?.np || 'मन्तव्य उपलब्ध छैन।'}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-250 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-sm text-amber-800 dark:text-amber-300">
                No active chairperson found. Please go to the <strong>Members</strong> menu and assign a member as the chairperson (Is Chairperson = True).
              </span>
            </div>
          )}
        </div>

        {/* CTA Block Fields */}
        <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Call to Action (CTA) Section</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Customize the heading and description of the clean Call to Action block at the bottom of the About page.
            </p>
          </div>

          <LocalizedInput
            label="CTA Heading"
            value={formData.cta.heading}
            onChange={(val) => handleChange('heading', val)}
            required
          />
          <LocalizedTextarea
            label="CTA Description"
            value={formData.cta.description}
            onChange={(val) => handleChange('description', val)}
            rows={3}
          />
        </div>

      </div>
    </SectionFormWrapper>
  );
}
