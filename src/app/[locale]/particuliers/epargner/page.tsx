import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function EpargnerPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.epargner.title")}
        subtitle={t("services.particulier.epargner.subtitle")}
        bg="navy"
        breadcrumb="Particulier"
      />
      <ServiceDetail serviceKey="epargner" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
