import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function EpargnepensiontPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.epargne_pension.title")}
        subtitle={t("services.particulier.epargne_pension.subtitle")}
        bg="navy"
        breadcrumb="Pension"
        image="https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="epargne_pension" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
