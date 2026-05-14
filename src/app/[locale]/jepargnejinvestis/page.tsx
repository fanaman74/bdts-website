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
      <PageHero title={t("epargne_title")} subtitle={t("epargne_sub")} bg="navy" breadcrumb="BDTS" />

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
