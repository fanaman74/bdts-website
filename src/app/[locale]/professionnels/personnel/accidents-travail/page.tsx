import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function AccidentsTravailPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.accidents_travail.title")}
        subtitle={t("services.professionnel.accidents_travail.subtitle")}
        bg="navy"
        breadcrumb="Personnel"
        image="https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="accidents_travail" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
