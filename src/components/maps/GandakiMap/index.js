import dynamic from 'next/dynamic';

// Leaflet relies on the window object, so we must disable SSR for the actual map component
const GandakiMap = dynamic(() => import('./GandakiMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading Map...</p>
      </div>
    </div>
  ),
});

export default GandakiMap;
