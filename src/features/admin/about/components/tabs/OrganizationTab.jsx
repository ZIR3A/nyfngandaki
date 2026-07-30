'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedTextarea } from '../shared/LocalizedTextarea';
import { MediaPicker } from '@/features/storage/components/MediaPicker';
import { X } from 'lucide-react';

export default function OrganizationTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    imageId: null,
    whoWeAre: { en: '', np: '' }
  });

  React.useEffect(() => {
    fetch('/api/admin/about/general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const org = json.data.organization || {};
          setFormData({
            imageId: org.imageId || null,
            whoWeAre: org.whoWeAre || { en: '', np: '' }
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
      await fetch('/api/admin/about/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization: {
            imageId: formData.imageId?._id || formData.imageId || null,
            whoWeAre: formData.whoWeAre
          }
        })
      });
      setIsDirty(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionFormWrapper
      title="Organization Profile"
      description="Manage the main description and portrait/image for the official organizational profile."
      isDirty={isDirty}
      isLoading={isLoading}
      onSave={handleSave}
    >
      <div className="space-y-8">
        {/* Section Image */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Section Profile Image</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">The photo displayed on the left side of the &quot;Who We Are&quot; profile section.</p>

          {/* Show current image if already saved */}
          {formData.imageId?.publicUrl && (
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-gray-200 dark:border-gray-700 group">
              <Image
                src={formData.imageId.publicUrl}
                alt={formData.imageId.altText || 'Profile image'}
                fill
                className="object-cover object-center"
              />
              <button
                type="button"
                onClick={() => handleChange('imageId', null)}
                className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 rounded-full p-1 text-gray-500 hover:text-red-500 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Only show uploader when no image is selected */}
          {!formData.imageId && (
            <MediaPicker
              name="orgImage"
              module="about"
              multiple={false}
              initialData={null}
              onUpload={(asset) => handleChange('imageId', asset)}
              onRemove={() => handleChange('imageId', null)}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-6">
          <LocalizedTextarea
            label="Organization Profile (Who We Are)"
            description="Write a comprehensive profile of the organization in both languages."
            value={formData.whoWeAre}
            onChange={(val) => handleChange('whoWeAre', val)}
            rows={8}
          />
        </div>
      </div>
    </SectionFormWrapper>
  );
}
