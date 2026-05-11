import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function ResponsabilitePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.responsabilite.title")}
        subtitle={t("services.professionnel.responsabilite.subtitle")}
        bg="navy"
        breadcrumb="Entreprise"
      />
      <ServiceDetail serviceKey="responsabilite" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
