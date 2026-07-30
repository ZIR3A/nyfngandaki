export default function ValueTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-8 h-px bg-[#4F84F6]" />
        <h3 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-xl lg:text-3xl text-white/90 font-bold leading-tight">
        {subtitle}
      </p>
    </div>
  );
}
