import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { CheckCircle } from "lucide-react";

export default async function ResponsabilitePage() {
  const t = await getTranslations("services");

  const covered = [
    "Claims of professional negligence",
    "Legal defense costs",
    "Settlement and judgment amounts",
    "Regulatory investigations",
  ];

  const sectors = [
    { name: "Medical professionals", detail: "Doctor, dentist, and clinic liability" },
    { name: "Legal professionals", detail: "Law firm liability" },
    { name: "Consultants", detail: "Management and IT consultant liability" },
    { name: "Engineers", detail: "Design and construction professional liability" },
    { name: "Creative agencies", detail: "Agency and designer liability" },
  ];

  return (
    <>
      <PageHero title={t("liability_title")} subtitle={t("liability_sub")} bg="navy" breadcrumb="Services" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">What it covers</h2>
            <ul className="space-y-3">
              {covered.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-dark-gray">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">Who needs it</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sectors.map(({ name, detail }) => (
                <div key={name} className="p-5 bg-off-white rounded-lg border border-border">
                  <p className="font-semibold text-navy mb-1">{name}</p>
                  <p className="text-mid-gray text-sm">{detail}</p>
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
