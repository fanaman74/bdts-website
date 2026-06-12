import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function VehiculesProfessionnelsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.vehicules.title")}
        subtitle={t("services.professionnel.vehicules.subtitle")}
        bg="navy"
        breadcrumb="Entreprise"
        image="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="vehicules" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
