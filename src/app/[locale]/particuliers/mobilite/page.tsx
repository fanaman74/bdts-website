import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function MobiliteCategoryPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.mobilite.title")}
        subtitle={t("services.particulier.mobilite.subtitle")}
        bg="navy"
        breadcrumb="Particulier"
      />
      <ServiceDetail serviceKey="mobilite" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
