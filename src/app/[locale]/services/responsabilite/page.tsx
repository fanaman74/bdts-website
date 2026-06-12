import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { AlertTriangle, Gavel, Scale, Search, Briefcase, Stethoscope, HardHat, Palette } from "lucide-react";

export default async function ResponsabilitePage() {
  const t = await getTranslations("services");

  const covered = [
    { icon: AlertTriangle, title: "Professional negligence claims", desc: "Coverage when clients claim your advice caused harm" },
    { icon: Gavel, title: "Legal defense costs", desc: "Lawyer fees, court costs fully covered" },
    { icon: Scale, title: "Settlements & judgments", desc: "Compensation amounts paid on your behalf" },
    { icon: Search, title: "Regulatory investigations", desc: "Defense during official investigations" },
  ];

  const sectors = [
    { icon: Stethoscope, title: "Medical professionals", desc: "Doctor, dentist, and clinic liability" },
    { icon: Scale, title: "Legal professionals", desc: "Law firm liability" },
    { icon: Briefcase, title: "Consultants", desc: "Management and IT consultant liability" },
    { icon: HardHat, title: "Engineers", desc: "Design and construction professional liability" },
    { icon: Palette, title: "Creative agencies", desc: "Agency and designer liability" },
  ];

  return (
    <>
      <PageHero title={t("liability_title")} subtitle={t("liability_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/5668770/pexels-photo-5668770.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-16 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">What it covers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {covered.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative pt-4">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
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
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">Who needs it</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {sectors.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative pt-4">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
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
