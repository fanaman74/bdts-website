import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

const PANELS = [
  { bg: "bg-amber-400", text: "text-gray-900", desc: "text-gray-900/70" },
  { bg: "bg-blue-900", text: "text-white", desc: "text-white/70" },
  { bg: "bg-stone-100", text: "text-gray-900", desc: "text-gray-900/60" },
  { bg: "bg-red-500", text: "text-white", desc: "text-white/70" },
  { bg: "bg-teal-600", text: "text-white", desc: "text-white/70" },
  { bg: "bg-gray-900", text: "text-white", desc: "text-white/60" },
];

export default async function EmployesPage() {
  const t = await getTranslations("services");

  const coverage = [
    { title: "Work accident insurance", desc: "Required by law — covers employee injuries" },
    { title: "Hospitalization", desc: "Health coverage options for your team" },
    { title: "Group pension", desc: "Retirement planning and constitution" },
    { title: "Death benefits", desc: "Financial protection for employee families" },
    { title: "Income protection", desc: "Disability coverage" },
  ];

  const scalingTiers = [
    { title: "1–5 people", desc: "Core work accident + health options" },
    { title: "5–20 people", desc: "Group pension + health packages" },
    { title: "20+ people", desc: "Full employee benefits strategy" },
  ];

  return (
    <>
      <PageHero title={t("employees_title")} subtitle={t("employees_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="bg-gray-950">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <p className="font-mono text-xs font-bold tracking-widest text-white/40 uppercase max-w-7xl mx-auto">What it covers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {coverage.map(({ title, desc }, i) => {
            const num = String(i + 1).padStart(2, "0");
            const { bg, text, desc: descColor } = PANELS[i % PANELS.length];
            return (
              <div key={title} className={`relative overflow-hidden ${bg} px-8 sm:px-12 pt-10 pb-12 flex flex-col min-h-56`}>
                <span className={`absolute top-3 right-6 font-black text-9xl leading-none select-none pointer-events-none ${text} opacity-10`} aria-hidden="true">{num}</span>
                <span className={`font-mono text-xs font-bold tracking-widest ${text} opacity-60 mb-6`}>§{num}</span>
                <h3 className={`font-[family-name:var(--font-heading)] font-black text-2xl sm:text-3xl ${text} mb-3 leading-tight`}>{title}</h3>
                <p className={`${descColor} text-base leading-relaxed`}>{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-950">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <p className="font-mono text-xs font-bold tracking-widest text-white/40 uppercase max-w-7xl mx-auto">Coverage that scales with you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {scalingTiers.map(({ title, desc }, i) => {
            const num = String(i + 1).padStart(2, "0");
            const { bg, text, desc: descColor } = PANELS[(i + 2) % PANELS.length];
            return (
              <div key={title} className={`relative overflow-hidden ${bg} px-8 sm:px-12 pt-10 pb-12 flex flex-col min-h-56`}>
                <span className={`absolute top-3 right-6 font-black text-9xl leading-none select-none pointer-events-none ${text} opacity-10`} aria-hidden="true">{num}</span>
                <span className={`font-mono text-xs font-bold tracking-widest ${text} opacity-60 mb-6`}>§{num}</span>
                <h3 className={`font-[family-name:var(--font-heading)] font-black text-2xl sm:text-3xl ${text} mb-3 leading-tight`}>{title}</h3>
                <p className={`${descColor} text-base leading-relaxed`}>{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
