export default function Overlay() {
  return (
    <div className="absolute inset-0 w-full h-full z-10 pointer-events-none" aria-hidden="true">
      {/* Base dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#081224]/80" />

      {/* Smooth blend from previous section (About) */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#081224] to-transparent" />

      {/* Smooth blend to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#081224] to-transparent" />

      {/* 
        Future placeholder layers for GSAP animations 
        - Particle Layer
        - Light Rays Layer
      */}
      <div id="vision-mission-particles" className="absolute inset-0 opacity-0" />
      <div id="vision-mission-light-rays" className="absolute inset-0 opacity-0" />
    </div>
  );
}
