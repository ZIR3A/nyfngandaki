import { memo } from "react";

const DistrictPath = memo(({ district, isActive, onSelect }) => {
  const baseFill = isActive ? "#1546B0" : "rgba(255, 255, 255, 0.05)";
  const stroke = isActive ? "#4F84F6" : "rgba(255, 255, 255, 0.15)";
  
  return (
    <g onClick={() => onSelect(district)} className="cursor-pointer group">
      <path
        d={district.pathData}
        fill={baseFill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        className="transition-all duration-300 ease-out group-hover:fill-[#D71920] group-hover:stroke-[#F53B45]"
        style={{
          filter: isActive ? "drop-shadow(0 0 12px rgba(79, 132, 246, 0.4))" : "none",
        }}
        aria-label={`Select ${district.name} district`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(district);
          }
        }}
      />
      {/* Label (Optional: usually absolute positions but doing it generically here) */}
      <text
        x="50%"
        y="50%"
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        className="pointer-events-none opacity-0"
      >
        {district.name}
      </text>
    </g>
  );
});

DistrictPath.displayName = "DistrictPath";

export default DistrictPath;
