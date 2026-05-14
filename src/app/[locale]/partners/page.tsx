import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function PartnersPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("partners.title")}
        subtitle={t("partners.subtitle")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <PartnersSection />
      <HomeCTA />
    </>
  );
}
