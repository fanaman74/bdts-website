import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function EpargneLanguetermePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.epargne_longterme.title")}
        subtitle={t("services.particulier.epargne_longterme.subtitle")}
        bg="navy"
        breadcrumb="Pension"
      />
      <ServiceDetail serviceKey="epargne_longterme" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
