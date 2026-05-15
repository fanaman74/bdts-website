import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { CheckCircle, Briefcase } from "lucide-react";

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
      <PageHero title={t("liability_title")} subtitle={t("liability_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/5668770/pexels-photo-5668770.jpeg?auto=compress&cs=tinysrgb&w=1400" />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              {sectors.map(({ name, detail }, i) => (
                <div key={name} className="relative pt-4">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-6 pt-7 flex flex-col">
                    <div className="absolute top-0 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                      § {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Briefcase size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{detail}</p>
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
