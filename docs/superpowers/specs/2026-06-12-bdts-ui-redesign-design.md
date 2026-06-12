# BDTS UI Redesign — Design Spec

**Date:** 2026-06-12  
**Reference:** [saunaco.us](https://saunaco.us/) design language  
**Approach:** B — Sauna Co. structure + left-aligned hero, full BDTS navy/gold palette retained  
**Scope:** Full site — all pages and shared layout components

---

## 1. Design System Changes

### 1.1 Color palette (unchanged values, new usage rules)

| Token | Value | Usage |
|---|---|---|
| `navy-dark` | `#111B3A` | Dark backgrounds, announcement bar, footer |
| `navy` | `#1B2B5C` | Section dark backgrounds (ThreePaths), CTA banner |
| `gold` | `#D4A843` | Primary CTA buttons, eyebrow labels, footer headings, accents |
| `off-white` | `#F8F5EE` | Why BDTS / alternate section backgrounds |
| `white` | `#FFFFFF` | Nav, cards, testimonial backgrounds |
| `mid-gray` | `#9B9590` | Body copy, eyebrow labels on light bg |
| `border` | `#E2DDD6` | Card borders |

### 1.2 Typography changes

- **Headings:** Increase weight to `font-weight: 900` (currently 700). Letter-spacing `-0.03em` to `-0.05em` for large display headings (40px+). No other font changes — keep Montserrat + Inter.
- **Hero headline:** `56px` (sm: `48px`, lg: `64px`), weight 900, tight tracking.
- **Section headings:** `36px–40px`, weight 900.
- **Eyebrow labels:** `10px`, weight 700, `letter-spacing: 0.2em`, `text-transform: uppercase`.

### 1.3 Button system — full replacement

All buttons site-wide change to **pill shape** (`border-radius: 9999px`). No more `rounded-md`, no dashed borders, no brutalist step labels.

| Variant | Style |
|---|---|
| Primary | `bg-gold text-navy-dark font-bold rounded-full px-6 py-3` |
| Outline-dark | `border-2 border-navy text-navy rounded-full px-6 py-3 hover:bg-navy hover:text-white` |
| Outline-light | `border-2 border-white/60 text-white rounded-full px-6 py-3 hover:border-white` |
| Ghost | `text-gold font-bold underline-offset-2 hover:underline` |

### 1.4 Section structure pattern

Every section across the site follows this structure:

```
[EYEBROW LABEL — uppercase, gold or mid-gray, 10px 700]
[Large bold heading — 36–40px, 900 weight, navy-dark]
[Optional subtitle — 14px, mid-gray, max-width 520px]
[Content]
[Optional "See all →" link aligned top-right of heading]
```

---

## 2. Shared Layout Components

### 2.1 Announcement ticker bar (new component)

**File:** `src/components/layout/AnnouncementBar.tsx`

- Dark navy-dark (`#111B3A`) background, gold text
- Single line of text, centered
- Content (translated): "AG Insurance Partner · FSMA Regulated · 02 463 19 25 · Laeken, Brussels · Free consultation"
- Font: 11px, weight 600, letter-spacing 0.08em, uppercase
- Renders above the Header, fixed/sticky with header
- Translated via `next-intl` (`announcement` namespace)

### 2.2 Header

**File:** `src/components/layout/Header.tsx` — modify existing

- Announcement bar sits above the nav (Header renders both)
- Nav stays white background
- **CTA button:** change `rounded-md` → `rounded-full` (pill)
- **Zone Client button:** change `rounded-md` → `rounded-full`
- **Language switcher:** keep existing pill-tab style (already close)
- Nav link hover: keep `hover:text-orange-500` OR switch to `hover:text-gold` for consistency — use gold
- Remove `hover:text-orange-500` throughout; replace with `hover:text-gold`

### 2.3 Footer

**File:** `src/components/layout/Footer.tsx` — modify existing

- Change background from `bg-navy` → `bg-navy-dark` (darker, matching Sauna Co.'s near-black footer)
- No structural changes needed — column layout stays
- Ensure all link hovers use `hover:text-gold`

---

## 3. Home Page Sections

### 3.1 Hero

**File:** `src/components/sections/home/Hero.tsx`

- Keep left-aligned content (Approach B)
- **Add eyebrow label** above headline: `"BDTS — COURTIER EN ASSURANCES"` — gold, 10px, 700, 0.2em tracking, with a short gold line after it (`::after` pseudo or a `<span>`)
- **Headline:** increase to `text-6xl lg:text-7xl`, `font-weight: 900`, tight tracking
- **Subheading:** unchanged style but increase opacity slightly (`text-white/70` → `text-white/75`)
- **CTA buttons — full replacement:**
  - Remove the boxy dashed "STEP · 01" button components entirely
  - Primary: gold fill pill button → `Obtenir un devis →`
  - Secondary: outline-light pill button → `Nos services`
- **Partner badges:** keep existing frosted-glass badges, move below buttons with `mt-10`
- Remove the gold left accent bar (already subtle — remove to clean up)

### 3.2 ThreePaths

**File:** `src/components/sections/home/ThreePaths.tsx`

- Section background: keep `bg-gray-950` (dark, matches Sauna Co. brand card section)
- **Add eyebrow + heading above cards:**
  - Eyebrow: `"NOS CLIENTS"` (gold-tinted)
  - Heading: translated heading text, white, 900 weight
  - Subtitle: short translated line
- **ImageCard changes** (see §4.1 below) — cards become landscape `aspect-[4/3]` instead of portrait `3/4`
- Remove `badges` from all three cards — cleaner Sauna Co. look
- Grid stays 3 columns on desktop

### 3.3 WhyBDTS

**File:** `src/components/sections/home/WhyBDTS.tsx`

- **Add eyebrow:** `"POURQUOI BDTS"`, mid-gray
- **Heading:** increase weight to 900, keep existing translation
- **Pillar cards:** remove the `§ 01` brutalist badge overlay. Replace with a clean icon container:
  - Icon: `w-11 h-11 bg-navy rounded-xl flex items-center justify-center` (navy square with rounded corners, not circle)
  - Card: keep `bg-white border border-border rounded-2xl p-6` but remove `hover:-translate-y-1` for subtlety — keep `hover:shadow-md`
  - No number badges

### 3.4 Testimonials

**File:** `src/components/sections/home/Testimonials.tsx`

- **Add eyebrow:** `"AVIS CLIENTS"`, mid-gray
- **Add "Voir tous les avis →"** link aligned top-right of the heading row
- Card background: change to `bg-off-white` (currently likely white or similar)
- No other structural changes

### 3.5 HomeCTA

**File:** `src/components/sections/home/HomeCTA.tsx`

- **Add eyebrow:** `"CONSULTATION GRATUITE"`, gold
- **CTA buttons:** replace with pill variants (primary gold + outline-light)
- Background: keep navy/dark

---

## 4. Shared Section Components

### 4.1 ImageCard

**File:** `src/components/sections/ImageCard.tsx`

- Change aspect ratio from `aspect-[3/4]` (portrait) → `aspect-[4/3]` (landscape) to match Sauna Co. brand cards
- Remove `max-w-[360px]` constraint — let grid control width
- Keep full-bleed image, gradient overlay, bottom text
- **Text layout:** label (eyebrow style, gold, 9px 700 tracking) above title
- Add eyebrow label slot (new optional prop `eyebrowLabel?: string`) shown above `title`
- **Badges prop:** keep as optional on the interface but stop passing it from ThreePaths — no runtime changes needed
- **CTA pill:** keep white pill at bottom, but left-align it instead of centering
- Border radius: change `rounded-3xl` → `rounded-xl` (less exaggerated, closer to Sauna Co.)

### 4.2 ServiceCard

**File:** `src/components/sections/ServiceCard.tsx`

- Add optional `eyebrowLabel?: string` prop displayed above the card title in gold 10px uppercase
- Replace any existing CTA button with pill variant (primary or outline depending on card background)
- Card container: `bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow`

### 4.3 PageHero

**File:** `src/components/sections/PageHero.tsx`

- Apply same eyebrow label pattern above page titles
- Increase heading weight to 900
- Any CTA buttons → pill shape

---

## 5. Service / Interior Pages

### 5.1 IndividualsServices, BusinessServices

**Files:** `src/components/sections/IndividualsServices.tsx`, `src/components/sections/BusinessServices.tsx`

- Add section eyebrow labels above each category group
- Service item cards: clean border cards with eyebrow label, heading, description, pill CTA
- Section headings: 900 weight

### 5.2 ServiceGrid / ServiceDetail

**Files:** `src/components/sections/ServiceGrid.tsx`, `src/components/sections/ServiceDetail.tsx`

- Eyebrow labels on all section headings
- Pill buttons on all CTAs
- Heading weight 900

### 5.3 ProcessSteps

**File:** `src/components/sections/ProcessSteps.tsx`

- Add eyebrow: `"NOTRE PROCESSUS"`
- Step numbers: clean styling, remove any brutalist badge elements
- Heading weight 900

### 5.4 PartnersSection / PartnerCard

**Files:** `src/components/sections/PartnersSection.tsx`, `src/components/sections/PartnerCard.tsx`

- Add eyebrow: `"NOS PARTENAIRES"`
- Logo cards: clean white `border border-border rounded-xl` cards, no shadow — hover adds subtle shadow
- Heading weight 900

### 5.5 GrowingOfferings

**File:** `src/components/sections/GrowingOfferings.tsx`

- Eyebrow label + 900 weight heading
- Pill CTAs

### 5.6 CoverageDetail

**File:** `src/components/sections/CoverageDetail.tsx`

- Eyebrow label + 900 weight heading
- Pill CTAs

---

## 6. News Section

**Files:** `src/components/sections/news/NewsGrid.tsx`, `src/components/sections/news/NewsletterStrip.tsx`

- NewsGrid: Add eyebrow `"ACTUALITÉS"`, heading 900 weight
- Article cards: clean white cards, border, rounded-xl, no heavy shadows — hover adds shadow
- NewsletterStrip: Pill CTA button, eyebrow label

---

## 7. Forms & Utility Components

**Files:** QuoteForm, AppointmentCalendar, ContactForm, DeclarationForm

- All submit/CTA buttons → pill shape (primary gold variant)
- No layout changes needed

---

## 8. Implementation Notes

- **No new fonts.** Montserrat + Inter stay.
- **orange-500 references** in Header and mobile nav: replace all `text-orange-500` and `hover:text-orange-500` with `text-gold` / `hover:text-gold`.
- **Framer Motion:** keep all existing animations — no changes to motion props.
- **i18n:** new eyebrow labels and the announcement bar text go into `en.json`, `fr.json`, `nl.json`. Keys to add: `announcement.text`, and eyebrow keys per section (e.g., `home.paths_eyebrow`, `home.why_eyebrow`, etc.).
- **Order of changes:** Start with globals (globals.css if needed, Button primitives, Header/Footer), then home page sections, then interior pages. This way each layer builds on a clean foundation.
- **`.superpowers/` in .gitignore:** add if not present.
