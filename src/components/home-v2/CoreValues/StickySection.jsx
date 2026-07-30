export default function StickySection({ children }) {
  return (
    <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col z-0">
      {children}
    </div>
  );
}
