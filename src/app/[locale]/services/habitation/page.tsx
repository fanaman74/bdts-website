import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { CheckCircle } from "lucide-react";

export default async function HabitationPage() {
  const t = await getTranslations("services");

  const covered = [
    "Building damage (fire, theft, natural events)",
    "Contents coverage (belongings and valuables)",
    "Liability (accidents on your property)",
    "Legal protection (disputes with third parties)",
  ];

  const steps = [
    { title: "Assess your home value", body: "Calculate replacement cost, not market value" },
    { title: "Inventory your belongings", body: "Document electronics, jewelry, furniture" },
    { title: "Consider liability exposure", body: "Guests, visitors, shared spaces" },
    { title: "We calculate, you choose", body: "No guesswork — we walk you through it" },
  ];

  return (
    <>
      <PageHero title={t("home_title")} subtitle={t("home_sub")} bg="navy" breadcrumb="Services" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-8">
            What&apos;s covered
          </h2>
          <ul className="space-y-4">
            {covered.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-dark-gray">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-8">
            How much coverage do you need?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map(({ title, body }) => (
              <div key={title} className="bg-white rounded-lg border border-border p-6">
                <h3 className="font-semibold text-navy mb-2">{title}</h3>
                <p className="text-mid-gray text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
