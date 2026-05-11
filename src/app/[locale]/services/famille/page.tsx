import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { CheckCircle } from "lucide-react";

export default async function FamillePage() {
  const t = await getTranslations("services");
  const items = [
    "Legal protection — defense in disputes with third parties",
    "Life insurance — financial protection for your family",
    "Accident coverage — injury and disability protection",
    "Family liability — accidents caused by family members",
  ];
  return (
    <>
      <PageHero title={t("family_title")} subtitle={t("family_sub")} bg="navy" breadcrumb="Services" />
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-6">What&apos;s included</h2>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-dark-gray">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <HomeCTA />
    </>
  );
}
