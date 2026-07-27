import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export function PageHeader({ title, subtitle, imageSrc, breadcrumbItems = [] }) {
  return (
    <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden bg-[#0A2463] flex items-center mt-[-1px]">
      {/* Mesh Pattern Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#1546B0_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {imageSrc && (
        <Image 
          src={imageSrc} 
          alt={title || "Header Image"} 
          fill 
          className="object-cover opacity-30 mix-blend-overlay" 
          priority 
        />
      )}

      {/* Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2463] via-transparent to-transparent opacity-80"></div>

      <Container className="relative z-10 space-y-4 pt-12 md:pt-16">
        {breadcrumbItems.length > 0 && (
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-base md:text-lg text-blue-100 max-w-2xl font-medium">{subtitle}</p>
        )}
      </Container>
    </div>
  );
}
