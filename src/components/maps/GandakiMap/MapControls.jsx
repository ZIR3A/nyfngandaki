"use client";

import { useMap } from "react-leaflet";
import { Plus, Minus, Home } from "lucide-react";
import { DEFAULT_MAP_CENTER, DEFAULT_ZOOM } from "@/lib/maps/mapConstants";

export default function MapControls() {
  const map = useMap();

  return (
    <div className="leaflet-bottom leaflet-right z-[1000] p-4 absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        title="Zoom In"
      >
        <Plus size={20} />
      </button>
      <button
        onClick={() => map.setView(DEFAULT_MAP_CENTER, DEFAULT_ZOOM)}
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        title="Reset Map"
      >
        <Home size={20} />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        title="Zoom Out"
      >
        <Minus size={20} />
      </button>
    </div>
  );
}
