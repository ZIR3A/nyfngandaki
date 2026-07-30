'use client';
import React, { useState } from 'react';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedTextarea } from '../shared/LocalizedTextarea';
import { LocalizedInput } from '../shared/LocalizedInput';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

export default function CoreValuesTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    coreValues: []
  });

  React.useEffect(() => {
    fetch('/api/admin/about/general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const cvs = json.data.coreValues || [];
          setFormData({
            coreValues: cvs.map(c => ({
              id: c._id,
              title: c.title || { en: '', np: '' },
              desc: c.description || { en: '', np: '' }
            }))
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

  const handleCoreValueChange = (index, field, value) => {
    const newValues = [...formData.coreValues];
    newValues[index][field] = value;
    handleChange('coreValues', newValues);
  };

  const addCoreValue = () => {
    handleChange('coreValues', [
      ...formData.coreValues, 
      { id: Date.now().toString(), title: { en: '', np: '' }, desc: { en: '', np: '' }, isNew: true }
    ]);
  };

  const removeCoreValue = (index) => {
    const newValues = [...formData.coreValues];
    newValues.splice(index, 1);
    handleChange('coreValues', newValues);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formData.coreValues);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleChange('coreValues', items);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const coreValuesPayload = formData.coreValues.map((cv, i) => ({
        _id: cv.isNew ? undefined : cv.id,
        title: cv.title,
        description: cv.desc,
        displayOrder: i + 1
      }));
      
      const res = await fetch('/api/admin/about/core-values', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coreValues: coreValuesPayload })
      });
      
      if (res.ok) {
        setIsDirty(false);
        // Refresh values to load new IDs
        const refetch = await fetch('/api/admin/about/general');
        const json = await refetch.json();
        if (json.success && json.data) {
          const cvs = json.data.coreValues || [];
          setFormData({
            coreValues: cvs.map(c => ({
              id: c._id,
              title: c.title || { en: '', np: '' },
              desc: c.description || { en: '', np: '' }
            }))
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionFormWrapper
      title="Core Values"
      description="Manage the core guiding values of the organization. You can create up to 8 core values."
      isDirty={isDirty}
      isLoading={isLoading}
      onSave={handleSave}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Core Values</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Drag to reorder the display sequence on the public page.</p>
          </div>
          <button 
            type="button"
            onClick={addCoreValue}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Value Card
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="coreValues">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {formData.coreValues.map((value, index) => (
                  <Draggable key={value.id} draggableId={value.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm group"
                      >
                        <div {...provided.dragHandleProps} className="mt-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <LocalizedInput
                            label="Value Name / Title"
                            value={value.title}
                            onChange={(val) => handleCoreValueChange(index, 'title', val)}
                            required
                          />
                          <LocalizedTextarea
                            label="Short Description"
                            value={value.desc}
                            onChange={(val) => handleCoreValueChange(index, 'desc', val)}
                            rows={2}
                          />
                        </div>

                        <button 
                          type="button"
                          onClick={() => removeCoreValue(index)}
                          className="mt-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove Core Value"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {formData.coreValues.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-gray-250 dark:border-gray-700 rounded-2xl text-sm text-gray-500">
                    No Core Values added yet. Click &quot;Add Value Card&quot; to begin.
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </SectionFormWrapper>
  );
}
