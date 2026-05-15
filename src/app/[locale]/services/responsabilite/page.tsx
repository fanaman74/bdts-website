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

export default async function ResponsabilitePage() {
  const t = await getTranslations("services");

  const covered = [
    { title: "Professional negligence claims", desc: "Coverage when clients claim your advice caused harm" },
    { title: "Legal defense costs", desc: "Lawyer fees, court costs fully covered" },
    { title: "Settlements & judgments", desc: "Compensation amounts paid on your behalf" },
    { title: "Regulatory investigations", desc: "Defense during official investigations" },
  ];

  const sectors = [
    { title: "Medical professionals", desc: "Doctor, dentist, and clinic liability" },
    { title: "Legal professionals", desc: "Law firm liability" },
    { title: "Consultants", desc: "Management and IT consultant liability" },
    { title: "Engineers", desc: "Design and construction professional liability" },
    { title: "Creative agencies", desc: "Agency and designer liability" },
  ];

  return (
    <>
      <PageHero title={t("liability_title")} subtitle={t("liability_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/5668770/pexels-photo-5668770.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="bg-gray-950">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <p className="font-mono text-xs font-bold tracking-widest text-white/40 uppercase max-w-7xl mx-auto">What it covers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {covered.map(({ title, desc }, i) => {
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
          <p className="font-mono text-xs font-bold tracking-widest text-white/40 uppercase max-w-7xl mx-auto">Who needs it</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {sectors.map(({ title, desc }, i) => {
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
