import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function ProtectionJuridiquePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.protection_juridique.title")}
        subtitle={t("services.particulier.protection_juridique.subtitle")}
        bg="navy"
        breadcrumb="Famille"
      />
      <ServiceDetail serviceKey="protection_juridique" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
