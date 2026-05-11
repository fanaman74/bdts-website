import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], display: "swap" });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "BDTS — Courtier d'assurance Laeken, Bruxelles",
    en: "BDTS — Insurance Broker Laeken, Brussels",
    nl: "BDTS — Verzekeringsmakelaar Laken, Brussel",
  };
  const descs: Record<string, string> = {
    fr: "BDTS (BDT Sironval) — votre courtier d'assurance à Laeken. Assurances personnelles et professionnelles, partenaire AG Insurance.",
    en: "BDTS (BDT Sironval) — your insurance broker in Laeken, Brussels. Personal and professional insurance, AG Insurance partner.",
    nl: "BDTS (BDT Sironval) — uw verzekeringsmakelaar in Laken, Brussel. Persoonlijke en professionele verzekeringen, AG Insurance partner.",
  };
  return {
    title: {
      default: titles[locale] ?? titles.fr,
      template: "%s | BDTS",
    },
    description: descs[locale] ?? descs.fr,
    keywords: ["insurance broker brussels", "courtier assurance bruxelles", "verzekeringsmakelaar brussel", "assurance laeken", "BDTS", "BDT Sironval", "AG Insurance"],
    alternates: {
      languages: { fr: "/fr", en: "/en", nl: "/nl" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en" | "nl")) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 pt-16 sm:pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
