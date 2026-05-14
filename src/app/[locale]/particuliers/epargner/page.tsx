import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function EpargnerPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.epargner.title")}
        subtitle={t("services.particulier.epargner.subtitle")}
        bg="navy"
        breadcrumb="Particulier"
        image="https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="epargner" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
