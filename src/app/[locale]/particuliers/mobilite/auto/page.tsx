import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function AutoPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.auto.title")}
        subtitle={t("services.particulier.auto.subtitle")}
        bg="navy"
        breadcrumb="Mobilité"
        image="https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="auto" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
