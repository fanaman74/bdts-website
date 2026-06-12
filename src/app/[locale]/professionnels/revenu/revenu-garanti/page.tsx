import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function RevenuGarantiPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.revenu_garanti.title")}
        subtitle={t("services.professionnel.revenu_garanti.subtitle")}
        bg="navy"
        breadcrumb="Revenu"
        image="https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="revenu_garanti" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
