import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function RevenuCategoryPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.revenu.title")}
        subtitle={t("services.professionnel.revenu.subtitle")}
        bg="navy"
        breadcrumb="Professionnel"
        image="https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="revenu" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
