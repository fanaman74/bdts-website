"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { ServiceCard } from "./ServiceCard";

interface CardItem {
  icon?: string;
  image?: string;
  title: string;
  description: string;
  href?: string;
}

interface Section {
  title: string;
  content: string | string[] | CardItem[];
}

interface ServiceData {
  title: string;
  subtitle: string;
  sections: Section[];
}

interface ServiceDetailProps {
  serviceKey: string;
  categoryKey: string;
}

function getIconByName(iconName: string) {
  return (Icons as any)[iconName] || Icons.Circle;
}

function isCardFormat(content: any): content is CardItem[] {
  return (
    Array.isArray(content) &&
    content.length > 0 &&
    typeof content[0] === "object" &&
    ("icon" in content[0] || "image" in content[0]) &&
    "title" in content[0] &&
    "description" in content[0]
  );
}

export function ServiceDetail({ serviceKey, categoryKey }: ServiceDetailProps) {
  const t = useTranslations();
  const locale = useLocale();

  // Fetch service data from translations
  const serviceData = t.raw(`services.${categoryKey}.${serviceKey}`);

  // Handle missing data
  if (!serviceData || typeof serviceData === "string") {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-heading)] font-bold text-4xl text-navy mb-4">
              Service not found
            </h1>
            <p className="text-mid-gray">
              The requested service could not be loaded. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const data: ServiceData = serviceData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {data.sections?.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-8">
                {section.title}
              </h2>

              {/* Content as cards */}
              {isCardFormat(section.content) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.content.map((card) => {
                    const IconComponent = card.icon ? getIconByName(card.icon) : undefined;
                    return (
                      <ServiceCard
                        key={card.title}
                        icon={IconComponent}
                        title={card.title}
                        description={card.description}
                        image={card.image}
                        href={card.href ? `/${locale}${card.href}` : undefined}
                      />
                    );
                  })}
                </div>
              ) : Array.isArray(section.content) ? (
                /* Content as bullet list */
                <ul className="space-y-3">
                  {section.content.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-dark-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                /* Content as paragraph */
                <p className="text-dark-gray leading-relaxed">{section.content}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
