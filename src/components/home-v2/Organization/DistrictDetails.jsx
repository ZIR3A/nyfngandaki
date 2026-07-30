import { Building2, Users } from "lucide-react";

export default function DistrictDetails({ district }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`w-2 h-2 rounded-full ${
              district.status === "Active" ? "bg-[#16A34A]" : "bg-[#F59E0B]"
            } shadow-[0_0_8px_rgba(22,163,74,0.6)]`}
          />
          <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            {district.status} Committee
          </span>
        </div>
        <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {district.name}
        </h3>
      </div>

      <p className="text-base sm:text-lg text-white/70 leading-relaxed font-medium">
        {district.description}
      </p>

      {/* Placeholders for future dynamic stats */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-[#0F172A]/50 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-white/50 mb-1">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Committees</span>
          </div>
          <span className="text-2xl font-extrabold text-white">{district.committeeCount}</span>
        </div>
        <div className="bg-[#0F172A]/50 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-white/50 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Members</span>
          </div>
          <span className="text-2xl font-extrabold text-white">--</span>
        </div>
      </div>
    </div>
  );
}
