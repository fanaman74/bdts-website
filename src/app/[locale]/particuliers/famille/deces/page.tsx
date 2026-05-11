import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function DecesFamillyPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.deces.title")}
        subtitle={t("services.particulier.deces.subtitle")}
        bg="navy"
        breadcrumb="Famille"
      />
      <ServiceDetail serviceKey="deces" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
