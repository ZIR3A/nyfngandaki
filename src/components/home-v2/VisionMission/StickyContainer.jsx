export default function StickyContainer({ children }) {
  return (
    <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">
      {children}
    </div>
  );
}
