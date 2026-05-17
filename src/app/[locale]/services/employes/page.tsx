import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Shield, Heart, PiggyBank, Users, Wallet, Building2, TrendingUp } from "lucide-react";

export default async function EmployesPage() {
  const t = await getTranslations("services");

  const coverage = [
    { icon: Shield, title: "Work accident insurance", desc: "Required by law — covers employee injuries" },
    { icon: Heart, title: "Hospitalization", desc: "Health coverage options for your team" },
    { icon: PiggyBank, title: "Group pension", desc: "Retirement planning and constitution" },
    { icon: Users, title: "Death benefits", desc: "Financial protection for employee families" },
    { icon: Wallet, title: "Income protection", desc: "Disability coverage" },
  ];

  const scalingTiers = [
    { icon: Building2, title: "1–5 people", desc: "Core work accident + health options" },
    { icon: Users, title: "5–20 people", desc: "Group pension + health packages" },
    { icon: TrendingUp, title: "20+ people", desc: "Full employee benefits strategy" },
  ];

  return (
    <>
      <PageHero title={t("employees_title")} subtitle={t("employees_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-16 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">What it covers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {coverage.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative pt-4">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col h-full">
                    <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                      § {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
                    <div className="border-t border-dashed border-gray-300 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">Coverage that scales with you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {scalingTiers.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative pt-4">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col h-full">
                    <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                      § {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
                    <div className="border-t border-dashed border-gray-300 mt-4" />
                  </div>
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
