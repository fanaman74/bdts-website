'use client';

import { useTranslations } from 'next-intl';
import { PartnerCard } from './PartnerCard';
import { motion } from 'framer-motion';

export function PartnersSection() {
  const t = useTranslations('partners');

  const partners = t.raw('partners_list') || [];

  if (!partners || !Array.isArray(partners)) {
    return null;
  }

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-navy mb-4">{t('section_title')}</h2>
          <p className="text-lg text-mid-gray">{t('section_description')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner: any, idx: number) => (
            <motion.div key={idx} variants={itemVariants}>
              <PartnerCard
                name={partner.name}
                description={partner.description}
                logoSrc={partner.logo}
                logoAlt={partner.name}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
