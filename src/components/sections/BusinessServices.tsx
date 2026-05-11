"use client";

import { useTranslations, useLocale } from "next-intl";
import { Users, Shield, Building2, Car, UserCheck, TrendingUp } from "lucide-react";
import { ServiceGrid } from "./ServiceGrid";

export function BusinessServices() {
  const t = useTranslations();
  const locale = useLocale();

  const services = [
    { icon: Users, title: t("services.employees_title"), sub: t("services.employees_sub"), href: `/${locale}/services/employes` },
    { icon: Shield, title: t("services.liability_title"), sub: t("services.liability_sub"), href: `/${locale}/services/responsabilite` },
    { icon: Building2, title: "Property & Liability", sub: "Buildings, materials, liability exposure", href: `/${locale}/contact` },
    { icon: Car, title: "Fleet Insurance", sub: "Company vehicles and delivery fleets covered", href: `/${locale}/contact` },
    { icon: UserCheck, title: "Executive Coverage", sub: "Director and executive specific protections", href: `/${locale}/contact` },
    { icon: TrendingUp, title: "Growth Insurance", sub: "Scaling your protection as you expand", href: `/${locale}/croissance` },
  ];

  return <ServiceGrid services={services} title="Business insurance solutions" />;
}
