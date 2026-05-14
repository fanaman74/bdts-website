import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function HospitalisationMainPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.hospitalisation.title")}
        subtitle={t("services.particulier.hospitalisation.subtitle")}
        bg="navy"
        breadcrumb="Particulier"
        image="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="hospitalisation" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
