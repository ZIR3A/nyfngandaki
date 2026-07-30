import NextImage from "next/image";

export default function Image() {
  return (
    <div className="relative w-full h-full min-h-[50vh] lg:min-h-full rounded-2xl overflow-hidden shadow-2xl border border-[#E5E7EB] dark:border-[#22314D]">
      <NextImage
        src="/v2/3.png"
        alt="Gandaki Youth Voice"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}
