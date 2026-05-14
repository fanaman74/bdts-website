import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { CheckCircle } from "lucide-react";

export default async function AutoPage() {
  const t = await getTranslations("services");

  const coverageTypes = [
    { name: "Third-party liability", note: "Required by law — covers damage you cause" },
    { name: "Comprehensive", note: "Theft, vandalism, natural events" },
    { name: "Collision", note: "Accident damage to your vehicle" },
    { name: "Legal protection", note: "Coverage for disputes" },
    { name: "Uninsured driver", note: "Protection if hit by uninsured motorist" },
  ];

  const claimSteps = [
    "Safety first — ensure everyone is okay",
    "Call BDTS immediately: 02 463 19 25",
    "Gather details: photos, witnesses, other driver info",
    "We guide you through the full claims process",
    "Claim assessed, repairs coordinated",
  ];

  return (
    <>
      <PageHero title={t("auto_title")} subtitle={t("auto_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">Coverage types</h2>
            <div className="space-y-3">
              {coverageTypes.map(({ name, note }) => (
                <div key={name} className="flex items-start gap-3 p-4 bg-off-white rounded-lg border border-border">
                  <CheckCircle size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-navy">{name}</span>
                    <span className="text-mid-gray text-sm ml-2">— {note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">If you&apos;re in an accident</h2>
            <ol className="space-y-3">
              {claimSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-gold text-navy-dark font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-dark-gray pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
