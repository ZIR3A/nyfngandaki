import DistrictDetails from "./DistrictDetails";
import ActionButtons from "./ActionButtons";

export default function DistrictPanel({ activeDistrict }) {
  if (!activeDistrict) return null;

  return (
    <div className="relative w-full h-full flex flex-col justify-center">
      {/* Glassmorphic Panel */}
      <div className="backdrop-blur-xl bg-[#081224]/60 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300">
        <DistrictDetails district={activeDistrict} />
        <ActionButtons districtSlug={activeDistrict.slug} />
      </div>
    </div>
  );
}
