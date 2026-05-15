import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { CheckCircle, Shield } from "lucide-react";

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
      <PageHero title={t("home_title")} subtitle={t("home_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1400" />

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {steps.map(({ title, body }, i) => (
              <div key={title} className="relative pt-4">
                <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
                  <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                    § {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>
                  <div className="border-t border-dashed border-gray-300 mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
