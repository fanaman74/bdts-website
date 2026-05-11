"use client";

import { useTranslations, useLocale } from "next-intl";
import { Home, Car, Heart, Shield, PiggyBank, Plane } from "lucide-react";
import { ServiceGrid } from "./ServiceGrid";

export function IndividualsServices() {
  const t = useTranslations();
  const locale = useLocale();

  const services = [
    { icon: Home, title: t("services.home_title"), sub: t("services.home_sub"), href: `/${locale}/services/habitation` },
    { icon: Car, title: t("services.auto_title"), sub: t("services.auto_sub"), href: `/${locale}/services/auto` },
    { icon: Heart, title: t("services.family_title"), sub: t("services.family_sub"), href: `/${locale}/services/famille` },
    { icon: PiggyBank, title: t("services.savings_title"), sub: t("services.savings_sub"), href: `/${locale}/services/epargne` },
    { icon: Shield, title: t("services.employees_title"), sub: t("services.employees_sub"), href: `/${locale}/services/employes` },
    { icon: Plane, title: "Travel / Voyage / Reis", sub: "Coverage for trips abroad and travel assistance", href: `/${locale}/contact` },
  ];

  return <ServiceGrid services={services} title="Your personal insurance" />;
}
