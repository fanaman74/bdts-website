import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function FamilialePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.familiale.title")}
        subtitle={t("services.particulier.familiale.subtitle")}
        bg="navy"
        breadcrumb="Famille"
        image="https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="familiale" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
