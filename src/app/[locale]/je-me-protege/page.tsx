import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Heart, Cross, AlertTriangle, Scale } from "lucide-react";

export default async function JeMeProtegePage() {
  const t = await getTranslations("journey");
  const locale = await getLocale();

  const cards = [
    {
      href: `/${locale}/particuliers/famille/familiale`,
      icon: Heart,
      title: t("protege_familiale"),
      description: t("protege_familiale_desc"),
    },
    {
      href: `/${locale}/particuliers/hospitalisation`,
      icon: Cross,
      title: t("protege_hospi"),
      description: t("protege_hospi_desc"),
    },
    {
      href: `/${locale}/particuliers/famille/accidents`,
      icon: AlertTriangle,
      title: t("protege_accidents"),
      description: t("protege_accidents_desc"),
    },
    {
      href: `/${locale}/particuliers/famille/protection-juridique`,
      icon: Scale,
      title: t("protege_juridique"),
      description: t("protege_juridique_desc"),
    },
  ];

  return (
    <>
      <PageHero title={t("protege_title")} subtitle={t("protege_sub")} bg="navy" breadcrumb="BDTS" />

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group block bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <card.icon size={20} className="text-gold" />
                </div>
                <h3 className="font-bold text-navy mb-2">{card.title}</h3>
                <p className="text-mid-gray text-sm">{card.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
