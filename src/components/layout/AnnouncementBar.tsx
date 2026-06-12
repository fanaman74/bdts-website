"use client";
import { useTranslations } from "next-intl";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  return (
    <div className="bg-navy-dark text-gold text-[11px] font-semibold tracking-[0.08em] text-center py-2 uppercase">
      {t("text")}
    </div>
  );
}
