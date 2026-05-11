import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function AssuranceGroupePensionPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.assurance_groupe.title")}
        subtitle={t("services.particulier.assurance_groupe.subtitle")}
        bg="navy"
        breadcrumb="Pension"
      />
      <ServiceDetail serviceKey="assurance_groupe" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
