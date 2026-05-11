import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function DecesProfessionnelPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.deces.title")}
        subtitle={t("services.professionnel.deces.subtitle")}
        bg="navy"
        breadcrumb="Revenu"
      />
      <ServiceDetail serviceKey="deces" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
