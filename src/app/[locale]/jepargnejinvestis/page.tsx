import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { PiggyBank, TrendingUp, Users, Wallet } from "lucide-react";

export default async function JEpargneJInvestisPage() {
  const t = await getTranslations("journey");
  const locale = await getLocale();

  const cards = [
    {
      href: `/${locale}/particuliers/pension/epargne-pension`,
      icon: PiggyBank,
      title: t("epargne_pension"),
      description: t("epargne_pension_desc"),
    },
    {
      href: `/${locale}/particuliers/pension/epargne-longterme`,
      icon: TrendingUp,
      title: t("epargne_longterme"),
      description: t("epargne_longterme_desc"),
    },
    {
      href: `/${locale}/particuliers/pension/assurance-groupe`,
      icon: Users,
      title: t("epargne_groupe"),
      description: t("epargne_groupe_desc"),
    },
    {
      href: `/${locale}/particuliers/epargner`,
      icon: Wallet,
      title: t("epargne_investir"),
      description: t("epargne_investir_desc"),
    },
  ];

  return (
    <>
      <PageHero title={t("epargne_title")} subtitle={t("epargne_sub")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {cards.map((card, i) => (
              <a key={card.href} href={card.href} className="relative block pt-4">
                <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col hover:shadow-xl transition-shadow duration-300">
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
