import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Car, Building2, Shield, Users, Wallet } from "lucide-react";

export default async function JeSuisEntrepreneurPage() {
  const t = await getTranslations("journey");
  const locale = await getLocale();

  const cards = [
    {
      href: `/${locale}/professionnels/entreprise/vehicules`,
      icon: Car,
      title: t("entrepreneur_vehicules"),
      description: t("entrepreneur_vehicules_desc"),
    },
    {
      href: `/${locale}/professionnels/entreprise/batiments`,
      icon: Building2,
      title: t("entrepreneur_batiments"),
      description: t("entrepreneur_batiments_desc"),
    },
    {
      href: `/${locale}/professionnels/entreprise/responsabilite`,
      icon: Shield,
      title: t("entrepreneur_responsabilite"),
      description: t("entrepreneur_responsabilite_desc"),
    },
    {
      href: `/${locale}/professionnels/personnel`,
      icon: Users,
      title: t("entrepreneur_personnel"),
      description: t("entrepreneur_personnel_desc"),
    },
    {
      href: `/${locale}/professionnels/revenu/revenu-garanti`,
      icon: Wallet,
      title: t("entrepreneur_revenu"),
      description: t("entrepreneur_revenu_desc"),
    },
  ];

  return (
    <>
      <PageHero title={t("entrepreneur_title")} subtitle={t("entrepreneur_sub")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
