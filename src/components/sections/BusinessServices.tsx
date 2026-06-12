"use client";

import { useTranslations, useLocale } from "next-intl";
import { ServiceGrid } from "./ServiceGrid";

export function BusinessServices() {
  const t = useTranslations();
  const tEyebrows = useTranslations("eyebrows");
  const locale = useLocale();

  const services = [
    {
      title: t("services.employees_title"),
      sub: t("services.employees_sub"),
      href: `/${locale}/services/employes`,
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Employee insurance",
    },
    {
      title: t("services.liability_title"),
      sub: t("services.liability_sub"),
      href: `/${locale}/services/responsabilite`,
      image: "https://images.pexels.com/photos/3183591/pexels-photo-3183591.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Liability insurance",
    },
    {
      title: "Property & Liability",
      sub: "Buildings, materials, liability exposure",
      href: `/${locale}/contact`,
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Property insurance",
    },
    {
      title: "Fleet Insurance",
      sub: "Company vehicles and delivery fleets covered",
      href: `/${locale}/contact`,
      image: "https://images.pexels.com/photos/159366/delivery-van-driving-159366.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Fleet insurance",
    },
    {
      title: "Executive Coverage",
      sub: "Director and executive specific protections",
      href: `/${locale}/contact`,
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Executive insurance",
    },
    {
      title: "Growth Insurance",
      sub: "Scaling your protection as you expand",
      href: `/${locale}/croissance`,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Growth insurance",
    },
  ];

  return <ServiceGrid services={services} title={t("services.business_title") || "Business insurance solutions"} eyebrow={tEyebrows("businesses")} />;
}
