import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Users, Shield, Building2, Car, UserCheck, TrendingUp } from "lucide-react";

export default async function EntreprisesPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const services = [
    { icon: Users, title: t("services.employees_title"), sub: t("services.employees_sub"), href: `/${locale}/services/employes` },
    { icon: Shield, title: t("services.liability_title"), sub: t("services.liability_sub"), href: `/${locale}/services/responsabilite` },
    { icon: Building2, title: "Property & Liability", sub: "Buildings, materials, liability exposure", href: `/${locale}/contact` },
    { icon: Car, title: "Fleet Insurance", sub: "Company vehicles and delivery fleets covered", href: `/${locale}/contact` },
    { icon: UserCheck, title: "Executive Coverage", sub: "Director and executive specific protections", href: `/${locale}/contact` },
    { icon: TrendingUp, title: "Growth Insurance", sub: "Scaling your protection as you expand", href: `/${locale}/croissance` },
  ];

  return (
    <>
      <PageHero
        title={t("paths.businesses_title")}
        subtitle={t("paths.businesses_sub")}
        bg="navy"
        breadcrumb="BDTS"
      />
      <ServiceGrid services={services} title="Business insurance solutions" />
      <HomeCTA />
    </>
  );
}
