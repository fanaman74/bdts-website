import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Shield, Users, Target, Zap } from "lucide-react";

export default async function AboutPage() {
  const t = await getTranslations("about");

  const values = [
    { icon: Users, label: t("value1") },
    { icon: Target, label: t("value2") },
    { icon: Shield, label: t("value3") },
    { icon: Zap, label: t("value4") },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-4">{t("story_title")}</h2>
            <p className="text-dark-gray leading-relaxed text-lg">{t("story_body")}</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-4">{t("what_title")}</h2>
            <p className="text-dark-gray leading-relaxed text-lg">{t("what_body")}</p>
          </div>
          <div className="bg-gold-pale rounded-xl p-8 border border-gold/20">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-4">{t("ag_title")}</h2>
            <p className="text-dark-gray leading-relaxed">{t("ag_body")}</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-8">{t("values_title")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <p className="text-navy font-semibold text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
