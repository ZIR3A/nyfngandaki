'use client';
import React, { useState } from 'react';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedTextarea } from '../shared/LocalizedTextarea';

export default function StrategyTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    vision: { en: '', np: '' },
    mission: { en: '', np: '' },
    objectives: { en: '', np: '' }
  });

  React.useEffect(() => {
    fetch('/api/admin/about/general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const org = json.data.organization || {};
          setFormData({
            vision: org.vision || { en: '', np: '' },
            mission: org.mission || { en: '', np: '' },
            objectives: org.objectives || { en: '', np: '' }
          });
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // We fetch current general data first to make sure we don't overwrite whoWeAre/imageId
      const getRes = await fetch('/api/admin/about/general');
      const getJson = await getRes.json();
      
      const currentOrg = getJson.success && getJson.data?.organization ? getJson.data.organization : {};
      
      const res = await fetch('/api/admin/about/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization: {
            ...currentOrg,
            imageId: currentOrg.imageId?._id || currentOrg.imageId || null,
            vision: formData.vision,
            mission: formData.mission,
            objectives: formData.objectives
          }
        })
      });
      if (res.ok) setIsDirty(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SectionFormWrapper
      title="Vision, Mission & Objectives"
      description="Manage the strategic guidance texts for NYFN Gandaki."
      isDirty={isDirty}
      isLoading={isLoading || isSaving}
      onSave={handleSave}
    >
      <div className="space-y-6">
        <LocalizedTextarea
          label="Our Vision"
          description="The long-term goal and visualised state for the youth."
          value={formData.vision}
          onChange={(val) => handleChange('vision', val)}
          rows={4}
        />
        <LocalizedTextarea
          label="Our Mission"
          description="The active path, focus areas, and roles of the federation."
          value={formData.mission}
          onChange={(val) => handleChange('mission', val)}
          rows={4}
        />
        <LocalizedTextarea
          label="Our Objectives"
          description="Clear organizational targets and areas of responsibility."
          value={formData.objectives}
          onChange={(val) => handleChange('objectives', val)}
          rows={6}
        />
      </div>
    </SectionFormWrapper>
  );
}
