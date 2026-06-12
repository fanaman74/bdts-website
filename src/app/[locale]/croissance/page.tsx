import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { GrowingOfferings } from "@/components/sections/GrowingOfferings";

export default async function CroissancePage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("paths.growing_title")}
        subtitle={t("paths.growing_sub")}
        bg="navy"
        breadcrumb="BDTS"
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />
      <GrowingOfferings />
      <HomeCTA />
    </>
  );
}
