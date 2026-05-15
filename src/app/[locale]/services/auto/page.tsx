import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { Car, Shield, Wrench, Scale, AlertTriangle, Phone, Camera, Headphones, CheckCircle } from "lucide-react";

export default async function AutoPage() {
  const t = await getTranslations("services");

  const coverageTypes = [
    { icon: Car, name: "Third-party liability", note: "Required by law — covers damage you cause" },
    { icon: Shield, name: "Comprehensive", note: "Theft, vandalism, natural events" },
    { icon: Wrench, name: "Collision", note: "Accident damage to your vehicle" },
    { icon: Scale, name: "Legal protection", note: "Coverage for disputes" },
    { icon: AlertTriangle, name: "Uninsured driver", note: "Protection if hit by uninsured motorist" },
  ];

  const claimSteps = [
    { icon: Shield, step: "Safety first — ensure everyone is okay" },
    { icon: Phone, step: "Call BDTS immediately: 02 463 19 25" },
    { icon: Camera, step: "Gather details: photos, witnesses, other driver info" },
    { icon: Headphones, step: "We guide you through the full claims process" },
    { icon: CheckCircle, step: "Claim assessed, repairs coordinated" },
  ];

  return (
    <>
      <PageHero title={t("auto_title")} subtitle={t("auto_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-16 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">Coverage types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {coverageTypes.map(({ icon: Icon, name, note }, i) => (
                <div key={name} className="relative pt-4">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
                    <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                      § {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{note}</p>
                    <div className="border-t border-dashed border-gray-300 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">If you&apos;re in an accident</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {claimSteps.map(({ icon: Icon, step }, i) => (
                <div key={step} className="relative pt-4">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
                    <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                      § {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <p className="text-gray-900 text-sm font-medium leading-snug flex-1">{step}</p>
                    </div>
                    <div className="border-t border-dashed border-gray-300 mt-3" />
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
