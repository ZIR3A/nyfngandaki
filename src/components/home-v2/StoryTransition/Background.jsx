export default function Background({ children }) {
  return (
    <div
      className="absolute inset-0 z-0 bg-[#081224]"
      aria-hidden="true"
    >
      {/* Background layer */}
      {children}
      {/* Dark gradient blending into About section (which has light background) */}
      {/* Actually the About section might have a light background, so we need a smooth transition.
          Or the instructions say: "Dark gradient blending into the About section."
          If About is light, this might be a sharp contrast unless the top of About is dark.
          Let's make it fade to the top color of About section.
          About background alternates soft white / light gray. So #F8FAFC.
          We will blend from transparent to #F8FAFC at the bottom.
       */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] dark:from-[#081224] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#081224] via-[#081224]/50 to-transparent" />
    </div>
  );
}
