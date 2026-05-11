import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function PensionMainPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.pension.title")}
        subtitle={t("services.particulier.pension.subtitle")}
        bg="navy"
        breadcrumb="Particulier"
      />
      <ServiceDetail serviceKey="pension" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
