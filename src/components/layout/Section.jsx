export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`py-12 md:py-16 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}
