import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function HospitalisationGroupePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.groupe.title")}
        subtitle={t("services.particulier.groupe.subtitle")}
        bg="navy"
        breadcrumb="Hospitalisation"
      />
      <ServiceDetail serviceKey="groupe" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
