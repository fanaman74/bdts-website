import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function IncendiePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.incendie.title")}
        subtitle={t("services.particulier.incendie.subtitle")}
        bg="navy"
        breadcrumb="Habitation"
      />
      <ServiceDetail serviceKey="incendie" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
