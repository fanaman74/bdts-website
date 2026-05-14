import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("title")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400" />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div className="bg-off-white rounded-xl p-8">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-navy mb-6">
                  BDTS — BDT Sironval
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: MapPin, text: "Laeken, Brussels, Belgium" },
                    { icon: Phone, text: "02 463 19 25", href: "tel:024631925" },
                    { icon: Mail, text: "info@bdts.be", href: "mailto:info@bdts.be" },
                    { icon: Clock, text: "Mon–Fri 8:30–12:30 / 13:30–17:00" },
                  ].map(({ icon: Icon, text, href }) => (
                    <li key={text} className="flex items-center gap-3 text-dark-gray">
                      <Icon size={18} className="text-gold flex-shrink-0" />
                      {href ? <a href={href} className="hover:text-gold transition-colors">{text}</a> : text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gold-pale rounded-xl p-6 border border-gold/20">
                <p className="text-navy font-semibold mb-1">AG Insurance Partner</p>
                <p className="text-mid-gray text-sm">FSMA regulated broker</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
