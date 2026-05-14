import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function BatimentsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.batiments.title")}
        subtitle={t("services.professionnel.batiments.subtitle")}
        bg="navy"
        breadcrumb="Entreprise"
        image="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="batiments" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
