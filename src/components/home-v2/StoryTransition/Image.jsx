import NextImage from "next/image";

export default function Image() {
  return (
    <NextImage
      src="/v2/2.png"
      alt="Youth walking toward the future"
      fill
      priority
      className="object-cover object-center opacity-70 mix-blend-overlay"
      sizes="100vw"
    />
  );
}
