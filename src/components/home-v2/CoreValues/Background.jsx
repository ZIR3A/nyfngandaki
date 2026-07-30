import NextImage from "next/image";

export default function Background() {
  return (
    <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
      <NextImage
        src="/v2/4.png"
        alt="Core values cinematic background"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
    </div>
  );
}
