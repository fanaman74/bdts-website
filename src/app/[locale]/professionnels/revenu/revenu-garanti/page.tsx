import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function RevenuGarantiPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.revenu_garanti.title")}
        subtitle={t("services.professionnel.revenu_garanti.subtitle")}
        bg="navy"
        breadcrumb="Revenu"
      />
      <ServiceDetail serviceKey="revenu_garanti" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
