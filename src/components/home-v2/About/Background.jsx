export default function Background({ children }) {
  return (
    <div className="absolute inset-0 z-0 flex flex-col" aria-hidden="true">
      {/* 
        Alternate between Soft white and light gray backgrounds as requested.
        We can achieve this by having the top half light gray and the bottom half soft white, 
        or using a subtle vertical gradient.
      */}
      <div className="flex-1 bg-[#F1F5F9] dark:bg-[#0B172C]" />
      <div className="flex-1 bg-[#F8FAFC] dark:bg-[#081224]" />
      
      {/* The content sits above this background layer */}
      {children}
    </div>
  );
}
