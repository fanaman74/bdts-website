import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { CheckCircle } from "lucide-react";

export default async function EmployesPage() {
  const t = await getTranslations("services");

  const coverage = [
    { title: "Work accident insurance", note: "Required by law — covers employee injuries" },
    { title: "Hospitalization", note: "Health coverage options for your team" },
    { title: "Group pension", note: "Retirement planning and constitution" },
    { title: "Death benefits", note: "Financial protection for employee families" },
    { title: "Income protection", note: "Disability coverage" },
  ];

  const scalingTiers = [
    { size: "1–5 people", desc: "Core work accident + health options" },
    { size: "5–20 people", desc: "Group pension + health packages" },
    { size: "20+ people", desc: "Full employee benefits strategy" },
  ];

  return (
    <>
      <PageHero title={t("employees_title")} subtitle={t("employees_sub")} bg="navy" breadcrumb="Services" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">What it covers</h2>
            <ul className="space-y-3">
              {coverage.map(({ title, note }) => (
                <li key={title} className="flex items-start gap-3 p-4 bg-off-white rounded-lg">
                  <CheckCircle size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-navy">{title}</span>
                    <span className="text-mid-gray text-sm ml-2">— {note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">Coverage that scales with you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {scalingTiers.map(({ size, desc }) => (
                <div key={size} className="bg-gold-pale rounded-xl p-6 border border-gold/20 text-center">
                  <p className="font-bold text-navy text-lg mb-2">{size}</p>
                  <p className="text-mid-gray text-sm">{desc}</p>
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
