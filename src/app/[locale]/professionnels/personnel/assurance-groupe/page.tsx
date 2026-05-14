import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function AssuranceGroupePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.assurance_groupe.title")}
        subtitle={t("services.professionnel.assurance_groupe.subtitle")}
        bg="navy"
        breadcrumb="Personnel"
        image="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="assurance_groupe" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
