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
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.0/silktide-consent-manager.css"
          integrity="sha384-IO1E/jCrQXyH5rwcI0SXP7OXw47JFqQNDQcKhbFvqnL2IunBxxwE2Ne5XyAmCqKs"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.0/silktide-consent-manager.js"
          integrity="sha384-j4NIMOecmtzMWe9GJADIIe5hTlHG63aiTQ/2XorW10RNyQJg+IU+xwFVDy45wBah"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: `
window.addEventListener('load', function() {
  window.silktideConsentManager.init({
    backdrop: { show: true },
    icon: { position: "bottomLeft" },
    prompt: { position: "bottomRight" },
    consentTypes: [
      {
        id: "essential",
        label: "Essential",
        description: "<p>These cookies are necessary for the website to function properly and cannot be switched off.</p>",
        required: true,
        onAccept: function() {}
      },
      {
        id: "analytics",
        label: "Analytics",
        description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
        required: true,
        gtag: "analytics_storage",
        onAccept: function() {}
      },
      {
        id: "marketing",
        label: "Marketing",
        description: "<p>These cookies are used by us and our advertising partners to show you relevant ads on this site and elsewhere.</p>",
        required: true,
        gtag: ["ad_storage", "ad_user_data", "ad_personalization"],
        onAccept: function() {}
      }
    ],
    text: {
      prompt: {
        description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.</p>",
        acceptAllButtonText: "Accept all",
        acceptAllButtonAccessibleLabel: "Accept all cookies",
        rejectNonEssentialButtonText: "Reject non-essential",
        rejectNonEssentialButtonAccessibleLabel: "Reject all non-essential cookies",
        preferencesButtonText: "Preferences",
        preferencesButtonAccessibleLabel: "Toggle preferences"
      },
      preferences: {
        title: "Customize your cookie preferences",
        description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies.</p>",
        saveButtonText: "Save and close",
        saveButtonAccessibleLabel: "Save your cookie preferences",
        creditLinkText: "Get this banner for free",
        creditLinkAccessibleLabel: "Get this banner for free"
      }
    }
  });
});
        ` }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 pt-[99px] sm:pt-[115px]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
