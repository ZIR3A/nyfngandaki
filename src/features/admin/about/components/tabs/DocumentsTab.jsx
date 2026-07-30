'use client';
import React, { useState } from 'react';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedInput } from '../shared/LocalizedInput';
import { LocalizedTextarea } from '../shared/LocalizedTextarea';

export default function DocumentsTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: { en: '', np: '' },
    desc: { en: '', np: '' },
    transparencyNotice: { en: '', np: '' },
  });

  React.useEffect(() => {
    fetch('/api/admin/about/general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data?.documentsConfig) {
          setFormData({
            title: json.data.documentsConfig.title || { en: '', np: '' },
            desc: json.data.documentsConfig.description || { en: '', np: '' }, // In schema we called it description but here desc. Let's fix it later or map it here. Let's map it here.
            transparencyNotice: json.data.documentsConfig.transparencyNotice || { en: '', np: '' },
          });
        }
      });
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/about/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          documentsConfig: {
            title: formData.title,
            description: formData.desc, // map desc to description
            transparencyNotice: formData.transparencyNotice
          }
        })
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
      title="Documents & Transparency"
      description="Manage the configuration for the Official Documents section. (Individual documents are managed in the main Resources module)."
      isDirty={isDirty}
      isLoading={isLoading}
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 gap-6">
        <LocalizedInput
          label="Section Title"
          value={formData.title}
          onChange={(val) => handleChange('title', val)}
        />
        <LocalizedTextarea
          label="Section Description"
          value={formData.desc}
          onChange={(val) => handleChange('desc', val)}
          rows={3}
        />
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
          <LocalizedTextarea
            label="Transparency Notice Text"
            description="The highlight text shown in the transparency box."
            value={formData.transparencyNotice}
            onChange={(val) => handleChange('transparencyNotice', val)}
            rows={4}
          />
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-xl">
        <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Looking for document uploads?</h4>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          PDFs, Constitutions, and reports are managed in the global <strong>Resources</strong> module from the sidebar. 
          This page only controls the <i>text and layout</i> of the Documents section on the About Page.
        </p>
      </div>
    </SectionFormWrapper>
  );
}
