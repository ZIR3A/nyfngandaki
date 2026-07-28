import { BannerForm } from "@/features/banners/components/BannerForm";
import { BannerService } from "@/services/BannerService";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Banner | NYFN Admin",
};

export default async function EditBannerPage({ params }) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  const banner = await BannerService.getById(id);

  if (!banner) {
    notFound();
  }

  // Pass banner directly as initialData, serialize _id
  const serializedBanner = {
    ...banner,
    _id: banner._id.toString()
  };

  return <BannerForm initialData={serializedBanner} />;
}
