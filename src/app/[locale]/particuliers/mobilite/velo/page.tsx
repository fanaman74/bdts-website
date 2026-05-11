import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function VeloPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.velo.title")}
        subtitle={t("services.particulier.velo.subtitle")}
        bg="navy"
        breadcrumb="Mobilité"
      />
      <ServiceDetail serviceKey="velo" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
