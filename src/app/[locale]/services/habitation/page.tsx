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

function PanelGrid({ items, offset = 0 }: { items: { title: string; desc: string }[]; offset?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
      {items.map(({ title, desc }, i) => {
        const num = String(i + 1 + offset).padStart(2, "0");
        const { bg, text, desc: descColor } = PANELS[(i + offset) % PANELS.length];
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
  );
}

export default async function HabitationPage() {
  const t = await getTranslations("services");

  const covered = [
    { title: "Building damage", desc: "Fire, theft, natural events" },
    { title: "Contents coverage", desc: "Belongings and valuables" },
    { title: "Liability", desc: "Accidents on your property" },
    { title: "Legal protection", desc: "Disputes with third parties" },
  ];

  const steps = [
    { title: "Assess your home value", desc: "Calculate replacement cost, not market value" },
    { title: "Inventory your belongings", desc: "Document electronics, jewelry, furniture" },
    { title: "Consider liability exposure", desc: "Guests, visitors, shared spaces" },
    { title: "We calculate, you choose", desc: "No guesswork — we walk you through it" },
  ];

  return (
    <>
      <PageHero title={t("home_title")} subtitle={t("home_sub")} bg="navy" breadcrumb="Services" image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1400" />

      <section className="bg-gray-950">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <p className="font-mono text-xs font-bold tracking-widest text-white/40 uppercase mb-6 max-w-7xl mx-auto">What&apos;s covered</p>
        </div>
        <PanelGrid items={covered} offset={0} />
      </section>

      <section className="bg-gray-950">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <p className="font-mono text-xs font-bold tracking-widest text-white/40 uppercase mb-6 max-w-7xl mx-auto">How much coverage do you need?</p>
        </div>
        <PanelGrid items={steps} offset={4} />
      </section>

      <HomeCTA />
    </>
  );
}
