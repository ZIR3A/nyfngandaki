export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
        <span className="text-slate-400 text-sm">Image</span>
      </div>
      <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
        <span className="text-slate-400 text-sm">Image</span>
      </div>
      <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
        <span className="text-slate-400 text-sm">Image</span>
      </div>
    </div>
  );
}
