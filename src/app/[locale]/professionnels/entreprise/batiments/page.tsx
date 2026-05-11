import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function BatimentsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.batiments.title")}
        subtitle={t("services.professionnel.batiments.subtitle")}
        bg="navy"
        breadcrumb="Entreprise"
      />
      <ServiceDetail serviceKey="batiments" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
