export default function ValueContent({ children, align = "left", id, zIndex }) {
  // 40-45% width constrain. Left or right alignment.
  const alignClass = align === "left" ? "justify-start pl-12 lg:pl-24 xl:pl-32" : "justify-end pr-12 lg:pr-24 xl:pr-32";
  
  return (
    <div
      id={id}
      className={`absolute inset-0 w-full h-full flex items-center ${alignClass}`}
      style={{ zIndex }}
    >
      <div className="w-full max-w-[45%] flex flex-col">
        {children}
      </div>
    </div>
  );
}
