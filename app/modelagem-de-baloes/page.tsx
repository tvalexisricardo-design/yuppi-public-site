import { notFound } from "next/navigation";
import { ServiceLandingPage, serviceMetadata } from "@/components/ServiceLandingPage";
import { getServiceCategory } from "@/lib/serviceCategories";

const category = getServiceCategory("modelagem-de-baloes");

export const metadata = category ? serviceMetadata(category) : {};

export default function Page() {
  if (!category) notFound();
  return <ServiceLandingPage category={category} />;
}
