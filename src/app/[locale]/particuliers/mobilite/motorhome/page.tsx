import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function MotorhomePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.motorhome.title")}
        subtitle={t("services.particulier.motorhome.subtitle")}
        bg="navy"
        breadcrumb="Mobilité"
        image="https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="motorhome" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
