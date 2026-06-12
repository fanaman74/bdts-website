import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function IncendiePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.incendie.title")}
        subtitle={t("services.particulier.incendie.subtitle")}
        bg="navy"
        breadcrumb="Habitation"
        image="https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="incendie" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
