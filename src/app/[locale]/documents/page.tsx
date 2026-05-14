import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { DocumentsClient, type Document } from "@/components/sections/DocumentsClient";
import rawDocuments from "@/data/documents.json";

export const revalidate = 86400;

export default async function DocumentsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("documents.title")}
        subtitle={t("documents.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <DocumentsClient documents={rawDocuments as Document[]} />
      <HomeCTA />
    </>
  );
}
