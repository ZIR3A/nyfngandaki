export default function Content() {
  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-12 pb-32 pt-16">
      <div className="max-w-3xl mx-auto text-center mt-auto">
        <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
          "Building responsible, disciplined, and patriotic youth for a{" "}
          <span className="italic text-[#4F84F6]">
            democratic and prosperous Nepal.
          </span>
          "
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-white/30" />
          <span className="text-sm font-bold text-white/60 uppercase tracking-[0.2em]">
            Our Purpose
          </span>
          <div className="h-px w-12 bg-white/30" />
        </div>
      </div>
    </div>
  );
}
