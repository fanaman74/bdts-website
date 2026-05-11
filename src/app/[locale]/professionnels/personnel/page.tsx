import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function PersonnelCategoryPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.personnel.title")}
        subtitle={t("services.professionnel.personnel.subtitle")}
        bg="navy"
        breadcrumb="Professionnel"
      />
      <ServiceDetail serviceKey="personnel" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
