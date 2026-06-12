"use client";

import { useTranslations, useLocale } from "next-intl";
import { ServiceGrid } from "./ServiceGrid";

export function IndividualsServices() {
  const t = useTranslations();
  const tEyebrows = useTranslations("eyebrows");
  const locale = useLocale();

  const services = [
    {
      title: t("services.home_title"),
      sub: t("services.home_sub"),
      href: `/${locale}/services/habitation`,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Home insurance",
    },
    {
      title: t("services.auto_title"),
      sub: t("services.auto_sub"),
      href: `/${locale}/services/auto`,
      image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Auto insurance",
    },
    {
      title: t("services.family_title"),
      sub: t("services.family_sub"),
      href: `/${locale}/services/famille`,
      image: "https://images.pexels.com/photos/1560932/pexels-photo-1560932.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Family insurance",
    },
    {
      title: t("services.savings_title"),
      sub: t("services.savings_sub"),
      href: `/${locale}/services/epargne`,
      image: "https://images.pexels.com/photos/6238072/pexels-photo-6238072.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Savings insurance",
    },
    {
      title: t("services.employees_title"),
      sub: t("services.employees_sub"),
      href: `/${locale}/services/employes`,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Employee insurance",
    },
    {
      title: "Travel / Voyage / Reis",
      sub: "Coverage for trips abroad and travel assistance",
      href: `/${locale}/contact`,
      image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Travel insurance",
    },
  ];

  return <ServiceGrid services={services} title={t("services.title")} eyebrow={tEyebrows("individuals")} />;
}
