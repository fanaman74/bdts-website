import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Flame, Lock, Key, Home } from "lucide-react";

export default async function JacheteJLoueJRenovePage() {
  const t = await getTranslations("journey");
  const locale = await getLocale();

  const cards = [
    {
      href: `/${locale}/particuliers/habitation/incendie`,
      icon: Flame,
      title: t("achete_incendie"),
      description: t("achete_incendie_desc"),
    },
    {
      href: `/${locale}/particuliers/habitation/vol`,
      icon: Lock,
      title: t("achete_vol"),
      description: t("achete_vol_desc"),
    },
    {
      href: `/${locale}/particuliers/habitation/bailleur-locataire`,
      icon: Key,
      title: t("achete_bailleur"),
      description: t("achete_bailleur_desc"),
    },
    {
      href: `/${locale}/particuliers/habitation`,
      icon: Home,
      title: t("achete_habitation"),
      description: t("achete_habitation_desc"),
    },
  ];

  return (
    <>
      <PageHero title={t("achete_title")} subtitle={t("achete_sub")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {cards.map((card, i) => (
              <a key={card.href} href={card.href} className="relative block pt-4">
                <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                    § {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <card.icon size={20} className="text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{card.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{card.description}</p>
                  <div className="border-t border-dashed border-gray-300 mt-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
