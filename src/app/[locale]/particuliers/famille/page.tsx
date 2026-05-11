import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function FamilleMainPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.famille.title")}
        subtitle={t("services.particulier.famille.subtitle")}
        bg="navy"
        breadcrumb="Particulier"
      />
      <ServiceDetail serviceKey="famille" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
