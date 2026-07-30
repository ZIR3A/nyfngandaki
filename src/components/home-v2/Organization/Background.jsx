import NextImage from "next/image";

export default function Background() {
  return (
    <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
      <NextImage
        src="/v2/Organization structure.png"
        alt="Organization Structure Background"
        fill
        className="object-cover object-center opacity-30 mix-blend-overlay"
        sizes="100vw"
      />
    </div>
  );
}
