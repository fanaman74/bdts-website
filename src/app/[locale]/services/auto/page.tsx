import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Car, Shield, Wrench, Scale, AlertTriangle, Phone, Camera, Headphones, CheckCircle } from "lucide-react";

export default async function AutoPage() {
  const t = await getTranslations("services");

  const coverageTypes = [
    { icon: Car, title: "Third-party liability", desc: "Required by law — covers damage you cause" },
    { icon: Shield, title: "Comprehensive", desc: "Theft, vandalism, natural events" },
    { icon: Wrench, title: "Collision", desc: "Accident damage to your vehicle" },
    { icon: Scale, title: "Legal protection", desc: "Coverage for disputes" },
    { icon: AlertTriangle, title: "Uninsured driver", desc: "Protection if hit by uninsured motorist" },
  ];

  const claimSteps = [
    { icon: Shield, title: "Safety first", desc: "Ensure everyone is okay before anything else" },
    { icon: Phone, title: "Call BDTS", desc: "02 463 19 25 — we guide you immediately" },
    { icon: Camera, title: "Gather evidence", desc: "Photos, witnesses, other driver info" },
    { icon: Headphones, title: "Full claims support", desc: "We manage the process end-to-end" },
    { icon: CheckCircle, title: "Claim resolved", desc: "Assessed, repairs coordinated, closed" },
  ];

  return (
    <>
      <PageHero title={t("auto_title")} subtitle={t("auto_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-16 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">Coverage types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {coverageTypes.map(({ icon: Icon, title, desc }, i) => (
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
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">If you&apos;re in an accident</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {claimSteps.map(({ icon: Icon, title, desc }, i) => (
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
