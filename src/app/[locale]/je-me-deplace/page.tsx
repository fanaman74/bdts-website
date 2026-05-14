import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Car, Bike, Zap, Compass } from "lucide-react";

export default async function JeMeDeplacePage() {
  const t = await getTranslations("journey");
  const locale = await getLocale();

  const cards = [
    {
      href: `/${locale}/particuliers/mobilite/auto`,
      icon: Car,
      title: t("deplace_auto"),
      description: t("deplace_auto_desc"),
    },
    {
      href: `/${locale}/particuliers/mobilite/moto`,
      icon: Zap,
      title: t("deplace_moto"),
      description: t("deplace_moto_desc"),
    },
    {
      href: `/${locale}/particuliers/mobilite/velo`,
      icon: Bike,
      title: t("deplace_velo"),
      description: t("deplace_velo_desc"),
    },
    {
      href: `/${locale}/particuliers/mobilite/motorhome`,
      icon: Compass,
      title: t("deplace_motorhome"),
      description: t("deplace_motorhome_desc"),
    },
  ];

  return (
    <>
      <PageHero title={t("deplace_title")} subtitle={t("deplace_sub")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1400" />

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
