import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function VolPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.vol.title")}
        subtitle={t("services.particulier.vol.subtitle")}
        bg="navy"
        breadcrumb="Habitation"
        image="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="vol" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
