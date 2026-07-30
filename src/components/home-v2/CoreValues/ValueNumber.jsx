export default function ValueNumber({ number }) {
  return (
    <div className="mb-4">
      <span className="text-7xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10 tracking-tighter">
        {number}
      </span>
    </div>
  );
}
