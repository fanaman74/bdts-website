import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function PlacementsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.placements.title")}
        subtitle={t("services.professionnel.placements.subtitle")}
        bg="navy"
        breadcrumb="Revenu"
      />
      <ServiceDetail serviceKey="placements" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
