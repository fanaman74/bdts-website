import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function BailleurLocatairePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.bailleur_locataire.title")}
        subtitle={t("services.particulier.bailleur_locataire.subtitle")}
        bg="navy"
        breadcrumb="Habitation"
        image="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="bailleur_locataire" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
