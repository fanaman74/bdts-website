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
        image="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="personnel" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
