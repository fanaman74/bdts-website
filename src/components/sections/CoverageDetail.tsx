import React from "react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import * as Icons from "lucide-react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface CoverageData {
  title: string;
  subtitle: string;
  image: string;
  description: string[];
  benefits: Benefit[];
}

interface CoverageDetailProps {
  serviceKey: string;
  categoryKey: string;
  coverageKey: string;
}

function getIconByName(iconName: string) {
  return (Icons as Record<string, unknown>)[iconName] as React.ElementType || Icons.Circle;
}

export async function CoverageDetail({ serviceKey, categoryKey, coverageKey }: CoverageDetailProps) {
  const t = await getTranslations();

  let coverageData: CoverageData | null = null;
  try {
    const raw = t.raw(`services.${categoryKey}.${serviceKey}.coverages.${coverageKey}`);
    if (raw && typeof raw === "object" && "title" in raw) {
      coverageData = raw as CoverageData;
    }
  } catch {
    coverageData = null;
  }

  if (!coverageData) {
    return (
      <>
        <PageHero
          title="Coverage not found"
          subtitle="The requested coverage page could not be loaded."
          bg="navy"
        />
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-mid-gray">
              This coverage detail page is not available. Please go back and choose a coverage, or contact us directly.
            </p>
          </div>
        </section>
        <HomeCTA />
      </>
    );
  }

  return (
    <>
      <PageHero
        title={coverageData.title}
        subtitle={coverageData.subtitle}
        bg="navy"
        image={coverageData.image}
      />

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {coverageData.description.map((para, i) => (
              <p key={i} className="text-dark-gray leading-relaxed text-lg">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      {coverageData.benefits && coverageData.benefits.length > 0 && (
        <section className="py-16 bg-off-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-10">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {coverageData.benefits.map((benefit, i) => {
                const IconComponent = getIconByName(benefit.icon);
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div key={i} className="w-full max-w-sm mx-auto md:max-w-none">
                  <div className="relative bg-white border-2 border-gray-900 rounded-lg p-6 pt-8 flex flex-col h-full">
                    {/* § badge */}
                    <div className="absolute -top-3.5 left-4 bg-amber-400 border-2 border-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-gray-900 tracking-wider">
                      § {num}
                    </div>
                    {/* Icon + title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{benefit.title}</h3>
                    </div>
                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{benefit.description}</p>
                    {/* Dashed divider */}
                    <div className="border-t border-dashed border-gray-300 mt-5" />
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <HomeCTA />
    </>
  );
}
