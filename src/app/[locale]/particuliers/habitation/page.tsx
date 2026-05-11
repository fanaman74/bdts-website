import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function HabitationCategoryPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.habitation.title")}
        subtitle={t("services.particulier.habitation.subtitle")}
        bg="navy"
        breadcrumb="Particulier"
      />
      <ServiceDetail serviceKey="habitation" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
