import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function HospitalisationProfessionnellePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.hospitalisation.title")}
        subtitle={t("services.professionnel.hospitalisation.subtitle")}
        bg="navy"
        breadcrumb="Personnel"
      />
      <ServiceDetail serviceKey="hospitalisation" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
