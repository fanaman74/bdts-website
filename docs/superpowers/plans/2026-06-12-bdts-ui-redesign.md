# BDTS UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the entire BDTS site to match Sauna Co.'s design language — dark announcement bar, bold headings, pill buttons, section eyebrow labels, and refined image cards — while keeping the existing navy/gold brand palette.

**Architecture:** All changes are purely presentational (Tailwind class edits and small structural additions). No new pages, no API changes, no data model changes. New `AnnouncementBar` component wired into the root layout. Eyebrow label keys added to all three locale JSON files.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, Framer Motion, next-intl, TypeScript

---

## File Map

| File | Action |
|---|---|
| `src/messages/en.json` | Add eyebrow + announcement keys |
| `src/messages/fr.json` | Add eyebrow + announcement keys |
| `src/messages/nl.json` | Add eyebrow + announcement keys |
| `src/components/layout/AnnouncementBar.tsx` | **Create** — dark ticker above nav |
| `src/components/layout/Header.tsx` | Render AnnouncementBar, orange→gold, pill buttons, adjust height |
| `src/app/[locale]/layout.tsx` | Increase `pt-` offset on main to account for announcement bar |
| `src/components/layout/Footer.tsx` | `bg-navy` → `bg-navy-dark` |
| `src/components/sections/home/Hero.tsx` | Eyebrow, bolder heading, replace step-CTAs with pill buttons |
| `src/components/sections/ImageCard.tsx` | Aspect `3/4`→`4/3`, `rounded-3xl`→`rounded-xl`, eyebrow label prop, left-align CTA |
| `src/components/sections/home/ThreePaths.tsx` | Section eyebrow+heading, remove badges from card data |
| `src/components/sections/home/WhyBDTS.tsx` | Eyebrow, remove `§` badge, `rounded-full` icon→`rounded-xl` |
| `src/components/sections/home/Testimonials.tsx` | Eyebrow, `bg-navy`→`bg-navy-dark`, left-align heading row |
| `src/components/sections/home/HomeCTA.tsx` | `bg-amber-400`→`bg-navy`, eyebrow, pill buttons |
| `src/components/sections/ServiceCard.tsx` | Remove `§` badge from colorIndex variant, pill CTA in image variant |
| `src/components/sections/PageHero.tsx` | `text-orange-500`→`text-gold` breadcrumb, heading weight 900 |
| `src/components/sections/ProcessSteps.tsx` | Eyebrow, heading weight 900 |
| `src/components/sections/PartnersSection.tsx` | Eyebrow, heading weight 900 |
| `src/components/sections/IndividualsServices.tsx` | Eyebrow, heading weight 900, pill CTAs |
| `src/components/sections/BusinessServices.tsx` | Eyebrow, heading weight 900, pill CTAs |
| `src/components/sections/GrowingOfferings.tsx` | Eyebrow, heading weight 900, pill CTAs |
| `src/components/sections/CoverageDetail.tsx` | Eyebrow, heading weight 900, pill CTAs |
| `src/components/sections/ServiceGrid.tsx` | Eyebrow, heading weight 900 |
| `src/components/sections/ServiceDetail.tsx` | Eyebrow, heading weight 900, pill CTAs |
| `src/components/sections/news/NewsGrid.tsx` | Eyebrow wrapper, heading weight 900 |
| `src/components/sections/news/NewsletterStrip.tsx` | Eyebrow, pill CTA |
| `src/components/sections/QuoteForm.tsx` | Submit button → pill |
| `src/components/sections/AppointmentCalendar.tsx` | Submit button → pill |
| `src/components/sections/ContactForm.tsx` | Submit button → pill |
| `src/components/sections/DeclarationForm.tsx` | Submit button → pill |

---

## Task 1: i18n — Add eyebrow and announcement keys

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/fr.json`
- Modify: `src/messages/nl.json`

- [ ] **Step 1: Add keys to en.json**

Open `src/messages/en.json` and add these top-level keys (merge into existing JSON, do not replace):

```json
"announcement": {
  "text": "AG Insurance Partner · FSMA Regulated · 02 463 19 25 · Laeken, Brussels · Free consultation"
},
"eyebrows": {
  "paths": "OUR CLIENTS",
  "why": "WHY BDTS",
  "testimonials": "CLIENT REVIEWS",
  "cta": "FREE CONSULTATION",
  "process": "OUR PROCESS",
  "partners": "OUR PARTNERS",
  "news": "LATEST NEWS",
  "individuals": "FOR INDIVIDUALS",
  "businesses": "FOR BUSINESSES",
  "growing": "GROWING COMPANIES",
  "coverage": "YOUR COVERAGE",
  "services": "OUR SERVICES"
}
```

- [ ] **Step 2: Add keys to fr.json**

```json
"announcement": {
  "text": "Partenaire AG Insurance · Réglementé FSMA · 02 463 19 25 · Laeken, Bruxelles · Consultation gratuite"
},
"eyebrows": {
  "paths": "NOS CLIENTS",
  "why": "POURQUOI BDTS",
  "testimonials": "AVIS CLIENTS",
  "cta": "CONSULTATION GRATUITE",
  "process": "NOTRE PROCESSUS",
  "partners": "NOS PARTENAIRES",
  "news": "ACTUALITÉS",
  "individuals": "PARTICULIERS",
  "businesses": "PROFESSIONNELS",
  "growing": "EN CROISSANCE",
  "coverage": "VOTRE COUVERTURE",
  "services": "NOS SERVICES"
}
```

- [ ] **Step 3: Add keys to nl.json**

```json
"announcement": {
  "text": "AG Insurance Partner · FSMA Gereglementeerd · 02 463 19 25 · Laken, Brussel · Gratis consultatie"
},
"eyebrows": {
  "paths": "ONZE KLANTEN",
  "why": "WAAROM BDTS",
  "testimonials": "KLANTBEOORDELINGEN",
  "cta": "GRATIS CONSULTATIE",
  "process": "ONS PROCES",
  "partners": "ONZE PARTNERS",
  "news": "LAATSTE NIEUWS",
  "individuals": "PARTICULIEREN",
  "businesses": "PROFESSIONALS",
  "growing": "GROEIENDE BEDRIJVEN",
  "coverage": "UW DEKKING",
  "services": "ONZE DIENSTEN"
}
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors related to the JSON files (next-intl types are generated at build time).

- [ ] **Step 5: Commit**

```bash
git add src/messages/
git commit -m "feat: add eyebrow and announcement i18n keys"
```

---

## Task 2: AnnouncementBar component

**Files:**
- Create: `src/components/layout/AnnouncementBar.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { useTranslations } from "next-intl";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  return (
    <div className="bg-navy-dark text-gold text-[11px] font-semibold tracking-[0.08em] text-center py-2 uppercase">
      {t("text")}
    </div>
  );
}
```

- [ ] **Step 2: Wire into Header**

Open `src/components/layout/Header.tsx`. At the very top of the returned JSX (before the `<header>` element), add:

```tsx
import { AnnouncementBar } from "./AnnouncementBar";
```

Then wrap the entire return in a fragment and prepend `AnnouncementBar`:

```tsx
return (
  <>
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <header className={cn(
        "transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-white/90 backdrop-blur-sm"
      )}>
        {/* ... existing header content unchanged ... */}
      </header>
    </div>
    {/* Mobile menu — keep outside, update top offset below */}
    ...
  </>
);
```

The `AnnouncementBar` is ~36px (`py-2` + 11px text ≈ 35px). The nav is `h-16 sm:h-20`. Total fixed header ≈ 99px / 115px.

- [ ] **Step 3: Update mobile menu top offset**

The mobile menu currently has `top-16 sm:top-20`. With the announcement bar it needs `top-[99px] sm:top-[115px]`:

```tsx
className={cn(
  "lg:hidden fixed inset-0 top-[99px] sm:top-[115px] bg-white z-40 transition-all duration-300 overflow-y-auto",
  mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
)}
```

- [ ] **Step 4: Update layout main padding**

Open `src/app/[locale]/layout.tsx`. Change:

```tsx
<main className="flex-1 pt-16 sm:pt-20">{children}</main>
```

to:

```tsx
<main className="flex-1 pt-[99px] sm:pt-[115px]">{children}</main>
```

- [ ] **Step 5: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/AnnouncementBar.tsx src/components/layout/Header.tsx src/app/[locale]/layout.tsx
git commit -m "feat: add announcement bar above nav"
```

---

## Task 3: Header — orange→gold, pill buttons

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Replace all orange-500 with gold**

In `src/components/layout/Header.tsx`, do a global find-and-replace:
- `hover:text-orange-500` → `hover:text-gold`
- `text-orange-500` → `text-gold`

There are approximately 8 occurrences across desktop and mobile nav links and dropdown items.

- [ ] **Step 2: Pill-ify the CTA and Zone Client buttons**

Find the desktop CTA button and change `rounded-md` to `rounded-full`:

```tsx
<a
  href={`/${locale}/appointment`}
  className="px-5 py-2 bg-amber-400 text-navy font-bold text-sm rounded-full hover:bg-amber-500 transition-colors"
>
  {t("cta")}
</a>
```

Find the Zone Client button and change `rounded-md` to `rounded-full`:

```tsx
<button
  onClick={() => setZoneClientOpen(!zoneClientOpen)}
  className="flex items-center gap-1.5 px-4 py-2 border border-navy text-navy font-semibold text-sm rounded-full hover:bg-navy hover:text-white transition-colors"
>
```

Find the mobile appointment link and change `rounded-md` to `rounded-full`:

```tsx
<a
  href={`/${locale}/appointment`}
  onClick={() => setMobileOpen(false)}
  className="mt-6 py-4 bg-amber-400 text-navy font-bold text-center rounded-full hover:bg-amber-500 transition-colors"
>
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "style: header — orange→gold, pill buttons"
```

---

## Task 4: Footer — darker background

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Change background**

In `src/components/layout/Footer.tsx`, find:

```tsx
<footer className="bg-navy text-white">
```

Change to:

```tsx
<footer className="bg-navy-dark text-white">
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "style: footer — bg-navy → bg-navy-dark"
```

---

## Task 5: Hero — eyebrow, bolder heading, pill CTAs

**Files:**
- Modify: `src/components/sections/home/Hero.tsx`

- [ ] **Step 1: Replace the entire Hero component**

```tsx
"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/videos/18937211/atomium-belgium-drone-drone-flying-18937211.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/18937211/18937211-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/70 to-navy-dark/90" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase">
              {t("eyebrow")}
            </span>
            <span className="block w-8 h-[1.5px] bg-gold" />
          </div>

          <h1 className="font-[family-name:var(--font-heading)] font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6">
            {t("headline")}
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10">
            {t("subheading")}
          </p>

          {/* Pill CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.a
              href={`/${locale}/appointment`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-navy-dark font-bold text-sm rounded-full hover:bg-gold-light transition-colors"
            >
              {t("cta_primary")} →
            </motion.a>
            <motion.a
              href={`/${locale}/je-me-protege`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-semibold text-sm rounded-full hover:border-white transition-colors"
            >
              {t("cta_secondary")}
            </motion.a>
          </div>

          {/* Partner logos */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Image
                src="/images/ag-insurance-logo.svg"
                alt="AG Insurance"
                width={80}
                height={36}
                className="h-7 w-auto brightness-0 invert opacity-80"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Image
                src="/images/fsma-logo.svg"
                alt="FSMA"
                width={64}
                height={36}
                className="h-7 w-auto opacity-80"
              />
              <span className="text-white/70 text-xs font-medium">Regulated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `eyebrow` key to all three locale files**

In `src/messages/en.json`, inside the `"hero"` object add:
```json
"eyebrow": "BDTS — Insurance Broker"
```

In `src/messages/fr.json`, inside `"hero"`:
```json
"eyebrow": "BDTS — Courtier en Assurances"
```

In `src/messages/nl.json`, inside `"hero"`:
```json
"eyebrow": "BDTS — Verzekeringsmakelaar"
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/home/Hero.tsx src/messages/
git commit -m "style: hero — eyebrow label, bolder heading, pill CTAs"
```

---

## Task 6: ImageCard — aspect ratio, border radius, eyebrow prop, left-align CTA

**Files:**
- Modify: `src/components/sections/ImageCard.tsx`

- [ ] **Step 1: Rewrite the component**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ImageCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  eyebrowLabel?: string;
  badges?: { label: string; icon?: React.ReactNode }[];
  className?: string;
}

export function ImageCard({
  title,
  description,
  ctaLabel,
  href,
  image,
  imageAlt,
  eyebrowLabel,
  className = "",
}: ImageCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-xl overflow-hidden flex flex-col w-full cursor-pointer shadow-lg aspect-[4/3] ${className}`}
    >
      {/* Full-bleed image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 500px"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 via-40% to-transparent to-70%" />

      {/* Content pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex flex-col">
        {eyebrowLabel && (
          <span className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            {eyebrowLabel}
          </span>
        )}
        <h3 className="font-[family-name:var(--font-heading)] font-black text-xl text-white leading-tight mb-2">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="bg-white rounded-full py-2.5 px-5 flex items-center gap-2 w-fit group-hover:bg-gray-100 transition-colors">
          <span className="font-bold text-gray-900 text-sm">{ctaLabel}</span>
          <ArrowRight
            size={15}
            className="text-gray-900 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.a>
  );
}
```

Note: `badges` prop is kept in the interface for backwards compatibility but no longer rendered. `className` still allows callers like `NewsGrid` to override height.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ImageCard.tsx
git commit -m "style: ImageCard — landscape aspect, rounded-xl, eyebrow prop, left-align CTA"
```

---

## Task 7: ThreePaths — section eyebrow + heading, remove badges

**Files:**
- Modify: `src/components/sections/home/ThreePaths.tsx`

- [ ] **Step 1: Add `paths_eyebrow` and `paths_heading` keys to locale files**

In `src/messages/en.json`, inside `"paths"`:
```json
"eyebrow": "OUR CLIENTS",
"heading": "Your profile,\nyour solution."
```

In `src/messages/fr.json`, inside `"paths"`:
```json
"eyebrow": "NOS CLIENTS",
"heading": "Votre profil,\nvotre solution."
```

In `src/messages/nl.json`, inside `"paths"`:
```json
"eyebrow": "ONZE KLANTEN",
"heading": "Uw profiel,\nuw oplossing."
```

- [ ] **Step 2: Rewrite ThreePaths**

```tsx
"use client";
import { useTranslations, useLocale } from "next-intl";
import { ImageCard } from "../ImageCard";

export function ThreePaths() {
  const t = useTranslations("paths");
  const locale = useLocale();

  const paths = [
    {
      eyebrowLabel: t("individuals_eyebrow") as string | undefined,
      title: t("individuals_title"),
      sub: t("individuals_sub"),
      cta: t("individuals_cta"),
      href: `/${locale}/particuliers`,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Family home",
    },
    {
      eyebrowLabel: t("businesses_eyebrow") as string | undefined,
      title: t("businesses_title"),
      sub: t("businesses_sub"),
      cta: t("businesses_cta"),
      href: `/${locale}/entreprises`,
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Business professionals",
    },
    {
      eyebrowLabel: t("growing_eyebrow") as string | undefined,
      title: t("growing_title"),
      sub: t("growing_sub"),
      cta: t("growing_cta"),
      href: `/${locale}/croissance`,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Growing company team",
    },
  ];

  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-gold/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-white tracking-tight">
            {t("heading")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path) => (
            <ImageCard
              key={path.href}
              eyebrowLabel={path.eyebrowLabel}
              title={path.title}
              description={path.sub}
              ctaLabel={path.cta}
              href={path.href}
              image={path.image}
              imageAlt={path.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add per-card eyebrow keys to locale files**

In `src/messages/en.json`, inside `"paths"`:
```json
"individuals_eyebrow": "Individuals",
"businesses_eyebrow": "Professionals",
"growing_eyebrow": "Growing Companies"
```

In `src/messages/fr.json`, inside `"paths"`:
```json
"individuals_eyebrow": "Particuliers",
"businesses_eyebrow": "Professionnels",
"growing_eyebrow": "En croissance"
```

In `src/messages/nl.json`, inside `"paths"`:
```json
"individuals_eyebrow": "Particulieren",
"businesses_eyebrow": "Professionals",
"growing_eyebrow": "Groeiende bedrijven"
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/home/ThreePaths.tsx src/messages/
git commit -m "style: ThreePaths — section eyebrow+heading, remove badges"
```

---

## Task 8: WhyBDTS — eyebrow, remove § badge, refine icon

**Files:**
- Modify: `src/components/sections/home/WhyBDTS.tsx`

- [ ] **Step 1: Add eyebrow key**

In `src/messages/en.json`, inside `"why"`:
```json
"eyebrow": "WHY BDTS"
```
In `src/messages/fr.json`, inside `"why"`:
```json
"eyebrow": "POURQUOI BDTS"
```
In `src/messages/nl.json`, inside `"why"`:
```json
"eyebrow": "WAAROM BDTS"
```

- [ ] **Step 2: Rewrite WhyBDTS**

```tsx
"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, User, Network } from "lucide-react";

export function WhyBDTS() {
  const t = useTranslations("why");

  const pillars = [
    { icon: MapPin, title: t("local_title"), body: t("local_body") },
    { icon: User, title: t("personal_title"), body: t("personal_body") },
    { icon: Network, title: t("market_title"), body: t("market_body") },
  ];

  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-navy tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-border rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                <Icon size={22} className="text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-navy text-base leading-snug mb-2">{title}</h3>
              <p className="text-mid-gray text-sm leading-relaxed flex-1">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/home/WhyBDTS.tsx src/messages/
git commit -m "style: WhyBDTS — eyebrow, remove § badge, refined icon"
```

---

## Task 9: Testimonials — eyebrow, darker bg, left-align heading

**Files:**
- Modify: `src/components/sections/home/Testimonials.tsx`

- [ ] **Step 1: Add eyebrow key**

In `src/messages/en.json`, inside `"testimonials"`:
```json
"eyebrow": "CLIENT REVIEWS",
"see_all": "See all reviews →"
```
In `src/messages/fr.json`, inside `"testimonials"`:
```json
"eyebrow": "AVIS CLIENTS",
"see_all": "Voir tous les avis →"
```
In `src/messages/nl.json`, inside `"testimonials"`:
```json
"eyebrow": "KLANTBEOORDELINGEN",
"see_all": "Alle beoordelingen →"
```

- [ ] **Step 2: Rewrite Testimonials**

```tsx
"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Claude nous a trouvé une couverture que nous ne savions même pas qu'il nous fallait. Quand nous avons eu un sinistre, il était au téléphone en quelques heures.",
    name: "Marie L.",
    role: "Bruxelles",
  },
  {
    quote: "As a freelance consultant, I needed professional liability fast. BDTS understood my business immediately and had me covered within a week.",
    name: "James T.",
    role: "IT Consultant, Brussels",
  },
  {
    quote: "Onze kmo heeft 5 naar 18 mensen gegroeid. BDTS heeft onze verzekeringen op elk moment mee laten groeien. Altijd bereikbaar, altijd helder.",
    name: "Stefan V.",
    role: "KMO Eigenaar, Laken",
  },
];

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-20 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-gold/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-white tracking-tight">
              {t("title")}
            </h2>
          </div>
          <a href="#" className="text-gold text-sm font-bold hidden sm:block hover:underline">
            {t("see_all")}
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-off-white rounded-xl p-7"
            >
              <Quote size={22} className="text-gold mb-4 opacity-70" />
              <p className="text-navy-dark leading-relaxed mb-6 italic text-sm">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="font-bold text-navy text-sm">{item.name}</p>
                <p className="text-mid-gray text-xs mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/home/Testimonials.tsx src/messages/
git commit -m "style: Testimonials — eyebrow, navy-dark bg, left-aligned heading"
```

---

## Task 10: HomeCTA — navy bg, eyebrow, pill buttons

**Files:**
- Modify: `src/components/sections/home/HomeCTA.tsx`

- [ ] **Step 1: Add eyebrow key**

In `src/messages/en.json`, inside `"cta_section"`:
```json
"eyebrow": "FREE CONSULTATION"
```
In `src/messages/fr.json`, inside `"cta_section"`:
```json
"eyebrow": "CONSULTATION GRATUITE"
```
In `src/messages/nl.json`, inside `"cta_section"`:
```json
"eyebrow": "GRATIS CONSULTATIE"
```

- [ ] **Step 2: Rewrite HomeCTA**

```tsx
"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Calendar } from "lucide-react";

export function HomeCTA() {
  const t = useTranslations("cta_section");
  const locale = useLocale();

  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
        >
          <div>
            <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-white tracking-tight mb-3">
              {t("title")}
            </h2>
            <p className="text-white/60 text-base max-w-lg">{t("body")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href={`/${locale}/appointment`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-navy-dark font-bold text-sm rounded-full hover:bg-gold-light transition-colors"
            >
              <Calendar size={16} />
              {t("button")}
            </a>
            <a
              href="tel:024631925"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-semibold text-sm rounded-full hover:border-white transition-colors"
            >
              <Phone size={16} />
              02 463 19 25
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/home/HomeCTA.tsx src/messages/
git commit -m "style: HomeCTA — navy bg, eyebrow, pill buttons"
```

---

## Task 11: ServiceCard — remove § badge, clean up

**Files:**
- Modify: `src/components/sections/ServiceCard.tsx`

- [ ] **Step 1: Rewrite ServiceCard**

Replace the entire file:

```tsx
"use client";

import { LucideIcon, Shield } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  colorIndex?: number;
  flatIcon?: LucideIcon;
  detail?: string;
  eyebrowLabel?: string;
  image?: string;
  imageAlt?: string;
  icon?: LucideIcon | string;
}

export function ServiceCard({
  title,
  description,
  href,
  colorIndex,
  flatIcon,
  detail,
  eyebrowLabel,
  image,
  imageAlt,
  icon,
}: ServiceCardProps) {
  // Numbered card design (for service categories)
  if (colorIndex !== undefined) {
    const Icon = flatIcon || Shield;
    const inner = (
      <div className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
        <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
          <Icon size={20} className="text-gold" strokeWidth={1.5} />
        </div>
        {eyebrowLabel && (
          <p className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
            {eyebrowLabel}
          </p>
        )}
        <h3 className="font-black text-navy-dark text-base leading-tight mb-2">{title}</h3>
        <p className="text-mid-gray text-sm leading-relaxed flex-1">{description}</p>
        {detail && (
          <p className="text-gold text-xs font-semibold mt-4">{detail}</p>
        )}
      </div>
    );
    if (href) return <a href={href} className="block cursor-pointer h-full">{inner}</a>;
    return inner;
  }

  // Image-based card with gradient overlay
  if (image) {
    const inner = (
      <div className="relative rounded-xl overflow-hidden flex flex-col w-full aspect-[4/3] shadow-lg group">
        <img
          src={image}
          alt={imageAlt || title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 via-40% to-transparent to-70%" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex flex-col">
          {eyebrowLabel && (
            <span className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
              {eyebrowLabel}
            </span>
          )}
          <h3 className="font-[family-name:var(--font-heading)] font-black text-xl text-white leading-tight mb-2">
            {title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">{description}</p>
          <div className="bg-white rounded-full py-2.5 px-5 flex items-center gap-2 w-fit group-hover:bg-gray-100 transition-colors">
            <span className="font-bold text-gray-900 text-sm">En savoir plus →</span>
          </div>
        </div>
      </div>
    );
    if (href) return <a href={href} className="group block w-full cursor-pointer">{inner}</a>;
    return <div className="group w-full">{inner}</div>;
  }

  // Legacy icon-based card
  const IconComp = (icon && typeof icon !== "string") ? icon as LucideIcon : undefined;
  const inner = (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow duration-300">
      {typeof icon === "string" ? (
        <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center mb-4">
          <span className="text-gold text-lg">{icon}</span>
        </div>
      ) : IconComp ? (
        <div className="w-11 h-11 bg-navy rounded-xl flex items-center justify-center mb-4">
          <IconComp size={22} className="text-gold" strokeWidth={1.5} />
        </div>
      ) : null}
      {eyebrowLabel && (
        <p className="text-gold text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
          {eyebrowLabel}
        </p>
      )}
      <h3 className="font-black text-navy-dark text-base mb-2">{title}</h3>
      <p className="text-mid-gray text-sm leading-relaxed">{description}</p>
    </div>
  );
  if (href) return <a href={href} className="block cursor-pointer">{inner}</a>;
  return inner;
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ServiceCard.tsx
git commit -m "style: ServiceCard — remove § badge, clean card design, eyebrow prop"
```

---

## Task 12: PageHero — gold breadcrumb, heading weight 900

**Files:**
- Modify: `src/components/sections/PageHero.tsx`

- [ ] **Step 1: Update PageHero**

```tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  bg?: "navy" | "gold-pale" | "off-white";
  breadcrumb?: string;
  image?: string;
}

export function PageHero({ title, subtitle, bg = "navy", breadcrumb, image }: PageHeroProps) {
  const bgs = {
    navy: "bg-gradient-to-br from-navy-dark to-navy",
    "gold-pale": "bg-gold-pale",
    "off-white": "bg-off-white",
  };
  const textColor = bg === "navy" ? "text-white" : "text-navy";
  const subColor = bg === "navy" ? "text-white/70" : "text-mid-gray";

  return (
    <section className={cn("py-20 relative overflow-hidden", image ? "bg-navy" : bgs[bg])}>
      {image && (
        <>
          <Image src={image} alt={title} fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-navy/65" />
        </>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {breadcrumb && (
          <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
            {breadcrumb}
            <span className="block w-6 h-[1.5px] bg-gold" />
          </p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "font-[family-name:var(--font-heading)] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight",
            textColor
          )}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn("mt-4 text-lg sm:text-xl max-w-2xl leading-relaxed", subColor)}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/PageHero.tsx
git commit -m "style: PageHero — gold breadcrumb, heading weight 900"
```

---

## Task 13: ProcessSteps + PartnersSection — eyebrow and heading weight

**Files:**
- Modify: `src/components/sections/ProcessSteps.tsx`
- Modify: `src/components/sections/PartnersSection.tsx`

- [ ] **Step 1: Update ProcessSteps**

Replace the heading block (lines 18-24):

```tsx
<div className="mb-14">
  <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
    {t("eyebrow")}
  </p>
  <h2 className="font-[family-name:var(--font-heading)] font-black text-3xl sm:text-4xl text-navy tracking-tight">
    {t("title")}
  </h2>
  <p className="text-mid-gray mt-3 max-w-xl">{t("subtitle")}</p>
</div>
```

Add `"eyebrow"` key to locale files inside `"process"`:
- en.json: `"eyebrow": "OUR PROCESS"`
- fr.json: `"eyebrow": "NOTRE PROCESSUS"`
- nl.json: `"eyebrow": "ONS PROCES"`

- [ ] **Step 2: Update PartnersSection**

In `src/components/sections/PartnersSection.tsx`, replace the heading block (lines 39-49):

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="mb-16"
>
  <p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
    {t('eyebrow')}
  </p>
  <h2 className="font-black text-4xl text-navy tracking-tight mb-3">{t('section_title')}</h2>
  <p className="text-mid-gray">{t('section_description')}</p>
</motion.div>
```

Add `"eyebrow"` key to locale files inside `"partners"`:
- en.json: `"eyebrow": "OUR PARTNERS"`
- fr.json: `"eyebrow": "NOS PARTENAIRES"`
- nl.json: `"eyebrow": "ONZE PARTNERS"`

- [ ] **Step 3: Update PartnerCard**

```bash
cat src/components/sections/PartnerCard.tsx
```

In `src/components/sections/PartnerCard.tsx`, find the card container element. Ensure it uses:
```tsx
className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
```

Remove any `shadow-lg` or `rounded-3xl` if present. The card should be clean with only a hover shadow.

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProcessSteps.tsx src/components/sections/PartnersSection.tsx src/components/sections/PartnerCard.tsx src/messages/
git commit -m "style: ProcessSteps + PartnersSection + PartnerCard — eyebrow labels, heading weight 900"
```

---

## Task 14: IndividualsServices + BusinessServices — eyebrow, heading weight, pill CTAs

**Files:**
- Modify: `src/components/sections/IndividualsServices.tsx`
- Modify: `src/components/sections/BusinessServices.tsx`

- [ ] **Step 1: Read current IndividualsServices**

```bash
cat src/components/sections/IndividualsServices.tsx
```

- [ ] **Step 2: In IndividualsServices.tsx, apply these changes throughout:**

For every section heading (`<h2>` or `<h3>` tags):
- Add `font-black` (or change `font-bold` → `font-black`)
- Add `tracking-tight`

For every section that has a title, add an eyebrow `<p>` above it using the `eyebrows` translation namespace:
```tsx
import { useTranslations } from "next-intl";
// add at top of component:
const tEyebrows = useTranslations("eyebrows");

// above each section heading:
<p className="text-mid-gray text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
  {tEyebrows("individuals")}
</p>
```

For every button/link with `rounded-md`: change to `rounded-full`.
For every button with `rounded-lg`: change to `rounded-full`.

- [ ] **Step 3: Apply same changes in BusinessServices.tsx**

```bash
cat src/components/sections/BusinessServices.tsx
```

Same pattern:
- `font-bold` → `font-black` on headings
- Add `tracking-tight` to headings
- Add eyebrow `<p>` above section title using `tEyebrows("businesses")`
- `rounded-md` / `rounded-lg` → `rounded-full` on buttons

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/IndividualsServices.tsx src/components/sections/BusinessServices.tsx
git commit -m "style: IndividualsServices + BusinessServices — eyebrow, font-black, pill CTAs"
```

---

## Task 15: GrowingOfferings + CoverageDetail + ServiceGrid + ServiceDetail

**Files:**
- Modify: `src/components/sections/GrowingOfferings.tsx`
- Modify: `src/components/sections/CoverageDetail.tsx`
- Modify: `src/components/sections/ServiceGrid.tsx`
- Modify: `src/components/sections/ServiceDetail.tsx`

- [ ] **Step 1: Apply heading + eyebrow pattern to all four files**

For each file:
```bash
cat src/components/sections/GrowingOfferings.tsx
cat src/components/sections/CoverageDetail.tsx
cat src/components/sections/ServiceGrid.tsx
cat src/components/sections/ServiceDetail.tsx
```

In each file, apply:
1. `font-bold` → `font-black` on `<h2>` and `<h3>` elements
2. Add `tracking-tight` to heading classes
3. Add eyebrow `<p>` before each main section heading using `useTranslations("eyebrows")` and the appropriate key (`"services"`, `"coverage"`, `"growing"`)
4. `rounded-md` / `rounded-lg` → `rounded-full` on all CTA buttons and links

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GrowingOfferings.tsx src/components/sections/CoverageDetail.tsx src/components/sections/ServiceGrid.tsx src/components/sections/ServiceDetail.tsx
git commit -m "style: service section components — eyebrow, font-black, pill CTAs"
```

---

## Task 16: NewsGrid + NewsletterStrip — eyebrow, heading, pill CTA

**Files:**
- Modify: `src/components/sections/news/NewsGrid.tsx`
- Modify: `src/components/sections/news/NewsletterStrip.tsx`

- [ ] **Step 1: Update NewsGrid**

`NewsGrid` renders `ImageCard` components. The `className="h-[380px]"` override will continue working after ImageCard's aspect ratio change. Add a `eyebrowLabel` derived from `article.category`:

```tsx
export function NewsGrid({ readMoreLabel }: Props) {
  const locale = useLocale() as "fr" | "en" | "nl";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ImageCard
          key={article.slug}
          eyebrowLabel={article.category}
          title={article.title[locale]}
          description={`${article.excerpt[locale]} — ${formatDate(article.date, locale)}`}
          ctaLabel={readMoreLabel}
          href={`/${locale}/news/${article.slug}`}
          image={article.image}
          imageAlt={article.title[locale]}
          className="h-[380px]"
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Read and update NewsletterStrip**

```bash
cat src/components/sections/news/NewsletterStrip.tsx
```

Apply:
- Add eyebrow `<p>` above heading
- `font-bold` → `font-black` on heading
- `rounded-md` / `rounded-lg` → `rounded-full` on CTA button

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/news/
git commit -m "style: news components — eyebrow, font-black, pill CTA"
```

---

## Task 17: Forms — pill submit buttons

**Files:**
- Modify: `src/components/sections/QuoteForm.tsx`
- Modify: `src/components/sections/AppointmentCalendar.tsx`
- Modify: `src/components/sections/ContactForm.tsx`
- Modify: `src/components/sections/DeclarationForm.tsx`

- [ ] **Step 1: Replace rounded-md with rounded-full in all four form files**

For each file, find the submit button element. Change `rounded-md` or `rounded-lg` to `rounded-full`. Example — a typical submit button before:

```tsx
<button type="submit" className="w-full py-3 bg-gold text-navy font-bold rounded-md hover:bg-gold-light transition-colors">
```

After:

```tsx
<button type="submit" className="w-full py-3 bg-gold text-navy font-bold rounded-full hover:bg-gold-light transition-colors">
```

Also change any secondary/cancel buttons from `rounded-md` → `rounded-full`.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: clean build with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/QuoteForm.tsx src/components/sections/AppointmentCalendar.tsx src/components/sections/ContactForm.tsx src/components/sections/DeclarationForm.tsx
git commit -m "style: forms — pill submit buttons"
```

---

## Task 18: Final visual verification + cleanup

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check home page**

Open `http://localhost:3000/fr` and verify:
- Announcement bar visible in dark navy above white nav
- Hero: left-aligned, eyebrow, bold headline, pill CTAs (no dashed boxes)
- ThreePaths: dark section with eyebrow heading, landscape image cards
- WhyBDTS: eyebrow, clean navy rounded-xl icon cards (no § badge)
- Testimonials: dark bg, eyebrow, left-aligned heading, off-white cards
- HomeCTA: navy bg, eyebrow, pill buttons
- Footer: dark navy-dark background

- [ ] **Step 3: Check an interior page**

Open `http://localhost:3000/fr/particuliers` or similar and verify:
- PageHero: gold breadcrumb, bold heading
- ServiceCard sections: clean cards, no § badges
- All CTA buttons are pill-shaped

- [ ] **Step 4: Check mobile (responsive)**

Resize browser to 375px width and verify:
- Announcement bar wraps gracefully
- Mobile menu opens with correct top offset (not overlapping announcement bar)
- Cards stack to single column correctly

- [ ] **Step 5: Fix any visual regressions**

If anything looks broken, fix before committing.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "style: final visual tweaks and verification"
```
