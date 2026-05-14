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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-8">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverageData.benefits.map((benefit, i) => {
                const IconComponent = getIconByName(benefit.icon);
                return (
                  <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gold/10">
                      <IconComponent size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{benefit.title}</h3>
                      <p className="text-mid-gray text-sm leading-relaxed">{benefit.description}</p>
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
