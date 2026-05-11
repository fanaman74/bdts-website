import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function EntrepriseCategoryPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.professionnel.entreprise.title")}
        subtitle={t("services.professionnel.entreprise.subtitle")}
        bg="navy"
        breadcrumb="Professionnel"
      />
      <ServiceDetail serviceKey="entreprise" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
