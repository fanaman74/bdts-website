import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function MaterielPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.materiel.title")}
        subtitle={t("services.professionnel.materiel.subtitle")}
        bg="navy"
        breadcrumb="Entreprise"
        image="https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="materiel" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
