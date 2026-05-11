import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { TrendingUp, Users, Shield, Search, Headphones, Network } from "lucide-react";

export default async function CroissancePage() {
  const t = await getTranslations();

  const offerings = [
    { icon: Users, title: "Employee & Executive Coverage", body: "Talent protection that scales with headcount" },
    { icon: Shield, title: "Expanded Liability Solutions", body: "New market and multi-jurisdiction risk management" },
    { icon: Search, title: "Risk Assessment & Strategy", body: "Proactive approach to emerging risks" },
    { icon: Headphones, title: "Claims Support & Advocacy", body: "Protected when it matters most" },
    { icon: Network, title: "Multi-Insurer Strategy", body: "Best solutions, not locked into one carrier" },
    { icon: TrendingUp, title: "Growth-Aware Coverage", body: "Insurance that evolves as your business does" },
  ];

  return (
    <>
      <PageHero
        title={t("paths.growing_title")}
        subtitle={t("paths.growing_sub")}
        bg="navy"
        breadcrumb="BDTS"
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-xl border border-border p-7">
                <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center mb-5">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{title}</h3>
                <p className="text-mid-gray text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
