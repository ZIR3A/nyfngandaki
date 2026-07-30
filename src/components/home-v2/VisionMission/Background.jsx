import NextImage from "next/image";

export default function Background() {
  return (
    <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
      <NextImage
        src="/v2/3.png"
        alt="Mountain summit and leadership"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
    </div>
  );
}
