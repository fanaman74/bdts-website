import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentCalendar } from "@/components/sections/AppointmentCalendar";

export default async function AppointmentPage() {
  const t = await getTranslations("appointment");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1400" />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentCalendar />
        </div>
      </section>
    </>
  );
}
