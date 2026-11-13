import type { Metadata } from "next";
import { WorksGallery } from "@/components/works-gallery";

export const metadata: Metadata = { title: "Works" };

export default function WorksPage() {
  return <WorksGallery />;
}
