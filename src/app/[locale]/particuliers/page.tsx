import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Home, Car, Heart, Shield, PiggyBank, Plane } from "lucide-react";

export default async function ParticuliersPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const services = [
    { icon: Home, title: t("services.home_title"), sub: t("services.home_sub"), href: `/${locale}/services/habitation` },
    { icon: Car, title: t("services.auto_title"), sub: t("services.auto_sub"), href: `/${locale}/services/auto` },
    { icon: Heart, title: t("services.family_title"), sub: t("services.family_sub"), href: `/${locale}/services/famille` },
    { icon: PiggyBank, title: t("services.savings_title"), sub: t("services.savings_sub"), href: `/${locale}/services/epargne` },
    { icon: Shield, title: t("services.employees_title"), sub: t("services.employees_sub"), href: `/${locale}/services/employes` },
    { icon: Plane, title: "Travel / Voyage / Reis", sub: "Coverage for trips abroad and travel assistance", href: `/${locale}/contact` },
  ];

  return (
    <>
      <PageHero
        title={t("paths.individuals_title")}
        subtitle={t("paths.individuals_sub")}
        bg="navy"
        breadcrumb="BDTS"
      />
      <ServiceGrid services={services} title="Your personal insurance" />
      <ProcessSteps />
      <HomeCTA />
    </>
  );
}
