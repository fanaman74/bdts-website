import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function VoyageFamilyPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.voyage.title")}
        subtitle={t("services.particulier.voyage.subtitle")}
        bg="navy"
        breadcrumb="Famille"
        image="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="voyage" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
