"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle, LucideIcon } from "lucide-react";
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

function isCardFormat(content: any): content is CardItem[] {
  return (
    Array.isArray(content) &&
    content.length > 0 &&
    typeof content[0] === "object" &&
    ("icon" in content[0] || "image" in content[0] || "href" in content[0]) &&
    "title" in content[0] &&
    "description" in content[0]
  );
}

// Map card title keywords → lucide icon name
function getIconForCard(title: string, index: number): LucideIcon {
  const lower = title.toLowerCase();

  // Fire / Incendie
  if (/feu|fire|incendie|brand/.test(lower)) return Icons.Flame;
  // Theft / Vol
  if (/vol|theft|diefstal|burgl/.test(lower)) return Icons.Lock;
  // Water damage
  if (/eau|water|water|storm|inondation|vloed/.test(lower)) return Icons.Droplets;
  // Civil liability / RC
  if (/civil|aansprakelijk|responsabil/.test(lower)) return Icons.Scale;
  // Car / Auto
  if (/\bauto\b|voiture|véhicule|vehicle|wagen|car\b/.test(lower)) return Icons.Car;
  // Bike / Vélo
  if (/vélo|velo|fiets|\bbike\b/.test(lower)) return Icons.Bike;
  // Motorhome / Camping — must come BEFORE moto check (contains "motor")
  if (/motorhome|camping.car|caravan|kampeer/.test(lower)) return Icons.Caravan;
  // Moto / Motorcycle / Scooter
  if (/\bmoto\b|motorcycle|scooter/.test(lower)) return Icons.Motorbike;
  // Travel / Voyage
  if (/voyage|travel|reis|trip/.test(lower)) return Icons.Plane;
  // Accident
  if (/accident|werk|arbeid|blessure/.test(lower)) return Icons.AlertTriangle;
  // Family / Famille
  if (/famille|family|gezin/.test(lower)) return Icons.Users;
  // Hospital / Health
  if (/hospital|santé|health|gezond|soins|zorg/.test(lower)) return Icons.Activity;
  // Death / Décès
  if (/décès|deces|overlijden|death/.test(lower)) return Icons.Shield;
  // Pension / Retirement
  if (/pension|retraite|pensioen|retire/.test(lower)) return Icons.PiggyBank;
  // Savings / Épargne
  if (/épargne|epargne|spaar|savings|longterme|long.term/.test(lower)) return Icons.TrendingUp;
  // Guaranteed income
  if (/revenu garanti|gewaarborgd|guaranteed income|inkomen/.test(lower)) return Icons.BarChart2;
  // Income / Revenu general
  if (/revenu|income|inkomen/.test(lower)) return Icons.BarChart2;
  // Placement / Investment
  if (/placement|invest|belegging/.test(lower)) return Icons.LineChart;
  // Building / Bâtiment
  if (/bâtiment|batiment|building|gebouw|immeuble/.test(lower)) return Icons.Building2;
  // Equipment / Matériel
  if (/matériel|materiel|equipment|toestel|machine/.test(lower)) return Icons.Package;
  // Legal protection
  if (/juridique|legal|rechtsbijstand|protection/.test(lower)) return Icons.Gavel;
  // Group insurance
  if (/groupe|group|groep|collectif/.test(lower)) return Icons.UsersRound;
  // Individual
  if (/individu|individual|particulier/.test(lower)) return Icons.User;
  // Material damage
  if (/dommage|damage|schade|material/.test(lower)) return Icons.Wrench;
  // Death capital
  if (/capital|conjoint|survivant|beneficiar/.test(lower)) return Icons.HeartHandshake;
  // Minor children
  if (/enfant|child|kind|mineur/.test(lower)) return Icons.Baby;
  // Quick payment
  if (/rapide|quick|fast|snel|versement/.test(lower)) return Icons.Zap;
  // Professional / Entreprise
  if (/entreprise|company|bedrijf|professionnel/.test(lower)) return Icons.Briefcase;
  // Personnel / Staff
  if (/personnel|staff|personeel/.test(lower)) return Icons.UserCheck;
  // Landlord / Tenant
  if (/bailleur|locataire|huurder|verhuurder|tenant/.test(lower)) return Icons.KeyRound;

  // Fallback rotation
  const fallbacks: LucideIcon[] = [
    Icons.Shield, Icons.Heart, Icons.Star, Icons.Globe,
    Icons.Award, Icons.Leaf, Icons.Clock, Icons.CheckCircle,
    Icons.Sparkles, Icons.Target,
  ];
  return fallbacks[index % fallbacks.length];
}

export function ServiceDetail({ serviceKey, categoryKey }: ServiceDetailProps) {
  const t = useTranslations();
  const tEyebrows = useTranslations("eyebrows");
  const locale = useLocale();

  const serviceData = t.raw(`services.${categoryKey}.${serviceKey}`);

  if (!serviceData || typeof serviceData === "string") {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-heading)] font-black text-4xl text-navy mb-4 tracking-tight">
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Global card counter across all sections — ensures unique color per page
  let globalCardIndex = 0;

  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">{tEyebrows("services")}</p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {data.sections?.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h2 className="font-[family-name:var(--font-heading)] font-black tracking-tight text-2xl text-navy mb-8">
                {section.title}
              </h2>

              {isCardFormat(section.content) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.content.map((card) => {
                    const colorIndex = globalCardIndex++;
                    const FlatIcon = getIconForCard(card.title, colorIndex);
                    return (
                      <ServiceCard
                        key={card.title}
                        title={card.title}
                        description={card.description}
                        href={card.href ? `/${locale}${card.href}` : undefined}
                        image={card.image}
                        imageAlt={card.title}
                        colorIndex={card.image ? undefined : colorIndex}
                        flatIcon={!card.image ? FlatIcon : undefined}
                      />
                    );
                  })}
                </div>
              ) : Array.isArray(section.content) ? (
                <ul className="space-y-3">
                  {section.content.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-dark-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-dark-gray leading-relaxed">{section.content}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
