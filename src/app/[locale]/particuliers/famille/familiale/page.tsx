import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function FamilialePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.familiale.title")}
        subtitle={t("services.particulier.familiale.subtitle")}
        bg="navy"
        breadcrumb="Famille"
      />
      <ServiceDetail serviceKey="familiale" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
