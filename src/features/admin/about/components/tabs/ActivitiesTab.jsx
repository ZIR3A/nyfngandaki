'use client';
import React, { useState } from 'react';
import { SectionFormWrapper } from '../shared/SectionFormWrapper';
import { LocalizedInput } from '../shared/LocalizedInput';
import { LocalizedTextarea } from '../shared/LocalizedTextarea';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export default function ActivitiesTab() {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [activities, setActivities] = useState([]);

  React.useEffect(() => {
    fetch('/api/admin/about/activities')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setActivities(json.data.map(item => ({
            id: item._id,
            title: item.title || { en: '', np: '' },
            desc: item.description || { en: '', np: '' },
            category: item.category || { en: '', np: '' },
            visibility: item.status === 'ACTIVE',
            isNew: false
          })));
        }
      });
  }, []);

  const handleChange = (index, field, value) => {
    const newItems = [...activities];
    newItems[index][field] = value;
    setActivities(newItems);
    setIsDirty(true);
  };

  const addItem = () => {
    setActivities([
      { id: Date.now().toString(), title: { en: '', np: '' }, desc: { en: '', np: '' }, category: { en: '', np: '' }, visibility: true, isNew: true },
      ...activities
    ]);
    setIsDirty(true);
  };

  const removeItem = (index) => {
    const newItems = [...activities];
    newItems.splice(index, 1);
    setActivities(newItems);
    setIsDirty(true);
  };

  const toggleVisibility = (index) => {
    const newItems = [...activities];
    newItems[index].visibility = !newItems[index].visibility;
    setActivities(newItems);
    setIsDirty(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(activities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setActivities(items);
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload = activities.map((ev, i) => ({
        _id: ev.isNew ? undefined : ev.id,
        title: ev.title,
        description: ev.desc,
        category: ev.category,
        status: ev.visibility ? 'ACTIVE' : 'INACTIVE',
        displayOrder: i + 1
      }));

      const res = await fetch('/api/admin/about/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload })
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
      title="Programs & Activities"
      description="Manage the featured programs displayed on the About Page masonry grid."
      isDirty={isDirty}
      isLoading={isLoading}
      onSave={handleSave}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Activities List</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Drag to reorder the items.</p>
        </div>
        <button 
          onClick={addItem}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Activity
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="activities">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {activities.map((activity, index) => (
                <Draggable key={activity.id} draggableId={activity.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-start gap-4 p-5 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm group transition-opacity ${!activity.visibility ? 'opacity-60' : ''}`}
                    >
                      <div {...provided.dragHandleProps} className="mt-2 cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <LocalizedInput
                            label="Activity Title"
                            value={activity.title}
                            onChange={(val) => handleChange(index, 'title', val)}
                          />
                          <LocalizedInput
                            label="Category (Used for Tabs)"
                            value={activity.category}
                            onChange={(val) => handleChange(index, 'category', val)}
                            placeholder={{ en: 'e.g. Training', np: 'प्रशिक्षण' }}
                          />
                        </div>
                        <div className="space-y-4">
                          <LocalizedTextarea
                            label="Description"
                            value={activity.desc}
                            onChange={(val) => handleChange(index, 'desc', val)}
                            rows={3}
                          />
                          
                          <div className="flex items-center gap-2 mt-4">
                            <button 
                              onClick={() => toggleVisibility(index)}
                              className="flex flex-1 items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              {activity.visibility ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                              {activity.visibility ? 'Visible' : 'Hidden'}
                            </button>
                            <button 
                              onClick={() => removeItem(index)}
                              className="flex items-center justify-center p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-100 dark:hover:border-red-900 rounded-lg transition-colors"
                              title="Delete Activity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {activities.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No activities added yet.</p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </SectionFormWrapper>
  );
}
