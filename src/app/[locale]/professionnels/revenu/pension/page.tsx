import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function PensionProfessionnellePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.pension.title")}
        subtitle={t("services.professionnel.pension.subtitle")}
        bg="navy"
        breadcrumb="Revenu"
        image="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="pension" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
