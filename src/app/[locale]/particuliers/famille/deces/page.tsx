import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function DecesFamillyPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.deces.title")}
        subtitle={t("services.particulier.deces.subtitle")}
        bg="navy"
        breadcrumb="Famille"
        image="https://images.pexels.com/photos/5257499/pexels-photo-5257499.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="deces" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
