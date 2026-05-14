import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default async function ProcessPage() {
  const t = await getTranslations("process");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} bg="navy" breadcrumb="BDTS" image="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1400" />
      <ProcessSteps />
      <HomeCTA />
    </>
  );
}
