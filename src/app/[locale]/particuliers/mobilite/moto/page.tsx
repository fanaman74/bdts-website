import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function MotoPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.moto.title")}
        subtitle={t("services.particulier.moto.subtitle")}
        bg="navy"
        breadcrumb="Mobilité"
      />
      <ServiceDetail serviceKey="moto" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
