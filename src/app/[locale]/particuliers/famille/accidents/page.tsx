import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function AccidentsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.accidents.title")}
        subtitle={t("services.particulier.accidents.subtitle")}
        bg="navy"
        breadcrumb="Famille"
        image="https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="accidents" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
