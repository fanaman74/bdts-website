import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function HospitalisationIndividuellePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.individuelle.title")}
        subtitle={t("services.particulier.individuelle.subtitle")}
        bg="navy"
        breadcrumb="Hospitalisation"
      />
      <ServiceDetail serviceKey="individuelle" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
