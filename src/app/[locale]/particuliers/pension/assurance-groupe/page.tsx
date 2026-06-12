import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function AssuranceGroupePensionPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("services.particulier.assurance_groupe.title")}
        subtitle={t("services.particulier.assurance_groupe.subtitle")}
        bg="navy"
        breadcrumb="Pension"
        image="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <ServiceDetail serviceKey="assurance_groupe" categoryKey="particulier" />
      <HomeCTA />
    </>
  );
}
