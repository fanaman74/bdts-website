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
        image="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="entreprise" categoryKey="professionnel" />
      <HomeCTA />
    </>
  );
}
