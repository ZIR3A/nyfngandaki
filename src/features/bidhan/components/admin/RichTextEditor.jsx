"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, Italic, Underline, Strikethrough, 
  Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Link as LinkIcon, 
  Image as ImageIcon, AlignLeft, AlignCenter, 
  AlignRight, Undo, Redo
} from "lucide-react";

/**
 * Professional Rich Text Editor Component (UI Shell)
 * This component acts as a shell for integrating a real rich text editor (like Tiptap or Quill)
 * while providing the complete visual design required by the specification.
 */
export default function RichTextEditor({ value, onChange, placeholder }) {
  const tools = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Strikethrough, label: "Strike" },
    { separator: true },
    { icon: Heading1, label: "H1" },
    { icon: Heading2, label: "H2" },
    { icon: Heading3, label: "H3" },
    { separator: true },
    { icon: List, label: "Bullet List" },
    { icon: ListOrdered, label: "Numbered List" },
    { icon: Quote, label: "Quote" },
    { separator: true },
    { icon: LinkIcon, label: "Link" },
    { icon: ImageIcon, label: "Image" },
    { separator: true },
    { icon: AlignLeft, label: "Align Left" },
    { icon: AlignCenter, label: "Align Center" },
    { icon: AlignRight, label: "Align Right" },
    { separator: true },
    { icon: Undo, label: "Undo" },
    { icon: Redo, label: "Redo" },
  ];

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
      {/* Editor Toolbar */}
      <div className="flex items-center flex-wrap gap-1 p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        {tools.map((tool, idx) => (
          tool.separator ? (
            <div key={`sep-${idx}`} className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
          ) : (
            <Button
              key={tool.label}
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              title={tool.label}
            >
              <tool.icon className="w-4 h-4" />
            </Button>
          )
        ))}
      </div>
      
      {/* Editor Content Area */}
      <div className="p-4">
        <textarea
          className="w-full min-h-[250px] resize-y bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          placeholder={placeholder || "Start writing..."}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        ></textarea>
      </div>
      
      {/* Editor Footer / Stats */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="flex gap-4">
          <span>{value ? value.split(/\s+/).filter(w => w.length > 0).length : 0} words</span>
          <span>{value ? value.length : 0} characters</span>
        </div>
        <div>Autosaved 2 mins ago</div>
      </div>
    </div>
  );
}
