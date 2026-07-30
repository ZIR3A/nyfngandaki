import { gandakiDistricts } from "@/data/gandakiDistricts";
import DistrictPath from "./DistrictPath";

export default function ProvinceMap({ activeDistrictId, onSelectDistrict }) {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
      {/* 
        SVG viewBox is set to accommodate the stylized coordinates from the data file.
        In a real application with geo-coordinates, this would match the map bounds.
      */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-h-[70vh] drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        {gandakiDistricts.map((district) => (
          <DistrictPath
            key={district.id}
            district={district}
            isActive={activeDistrictId === district.id}
            onSelect={onSelectDistrict}
          />
        ))}
      </svg>
    </div>
  );
}
