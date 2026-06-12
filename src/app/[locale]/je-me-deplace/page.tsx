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
