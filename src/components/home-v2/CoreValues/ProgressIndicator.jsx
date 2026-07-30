export default function ProgressIndicator({ current = 1, total = 4 }) {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="absolute bottom-12 right-12 z-40 flex items-center gap-6">
      <div className="relative w-32 h-[1px] bg-white/20">
        <div 
          id="core-values-progress-bar" 
          className="absolute top-0 left-0 h-full bg-white transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div id="core-values-counter" className="text-white/60 font-mono text-sm tracking-widest font-bold">
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
}
