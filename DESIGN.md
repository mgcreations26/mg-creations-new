# Design System & Implementation Guide: MG Creations

This document formalizes the design system extracted from the Google Stitch project **"MG Creations Storefront Redesign"** (`projects/12912698361800092246`), establishing clear tokens, typography, component rules, and layout structures for the Next.js storefront.

---

## 1. Core Brand & Visual Identity

- **Brand Tone**: Warm, boutique, artisanal, trustworthy, handcrafted yet modern.
- **Visual Motif**: Soft warm cream backdrop (`#fff8f5`), terracotta/burnt orange accents (`#a93017` / `#e85d3f`), warm charcoal typography (`#1f1b17`), and full pill roundness (`rounded-full`).

---

## 2. Color System (Tokens & Variables)

### Brand & Accents
| Token | Hex | Role / Usage |
|---|---|---|
| `primary` | `#a93017` | Primary brand action, buttons, badges, key accents |
| `primary-hover` / `primary-container` | `#cb482c` | Button hover state, primary highlight fills |
| `primary-fixed` | `#ffdad3` | Light terracotta pill tags, badge backgrounds |
| `on-primary` | `#ffffff` | Text / icons on top of primary buttons |
| `secondary` | `#a43c22` | Secondary accents, tags (e.g. "New Drop") |
| `tertiary` | `#825100` | Warm golden rating stars and craft badges |
| `tertiary-fixed` | `#ffddb8` | Soft amber subtle glow / decorative circles |

### Surfaces & Backgrounds
| Token | Hex | Role / Usage |
|---|---|---|
| `surface` / `background` | `#fff8f5` | Page background, light boutique cream |
| `surface-container-low` | `#fdf2eb` | Section cards, banner backings, search inputs |
| `surface-container` | `#f7ece5` | Slightly elevated sections, image containers |
| `surface-container-high` | `#f1e6df` | Subtle border contrast, hovered chips |
| `surface-container-lowest` | `#ffffff` | Pure white product cards, elevated modals |
| `surface-variant` | `#ebe0da` | Dividers, subtle category backgrounds |

### Typography & Neutrals
| Token | Hex | Role / Usage |
|---|---|---|
| `on-surface` / `on-background` | `#1f1b17` | Primary text, deep warm espresso charcoal |
| `on-surface-variant` | `#59413c` | Secondary text, subtitles, descriptions |
| `outline` | `#8d716b` | Placeholder text, neutral borders |
| `outline-variant` | `#e0bfb8` | Soft borders, light card outlines |

---

## 3. Typography Hierarchy

### Font Families
- **Display & Headings**: `Playfair Display` (Serif: elegant, artisanal, editorial)
- **Body, Labels & UI**: `Plus Jakarta Sans` (Geometric sans: ultra-clean, legible)

### Scale & Weight
| Style | Font Family | Size / Line Height | Weight | Letter Spacing |
|---|---|---|---|---|
| **Display** | Playfair Display | 56px / 64px (mobile 38px/46px) | 700 Bold | `-0.02em` |
| **Headline LG** | Playfair Display | 40px / 48px (mobile 30px/38px) | 600 SemiBold | `-0.015em` |
| **Headline MD** | Playfair Display | 28px / 36px | 600 SemiBold | Normal |
| **Headline SM** | Playfair Display | 22px / 30px | 600 SemiBold | Normal |
| **Title LG** | Plus Jakarta Sans | 20px / 28px | 600 SemiBold | Normal |
| **Title MD** | Plus Jakarta Sans | 16px / 24px | 600 SemiBold | Normal |
| **Body LG** | Plus Jakarta Sans | 18px / 28px | 400 Regular | Normal |
| **Body MD** | Plus Jakarta Sans | 15px / 24px | 400 Regular | Normal |
| **Body SM** | Plus Jakarta Sans | 13px / 20px | 400 Regular | Normal |
| **Label LG** | Plus Jakarta Sans | 14px / 20px | 600 SemiBold | `0.01em` |
| **Label SM** | Plus Jakarta Sans | 11px / 16px | 700 Bold | `0.04em` uppercase |

---

## 4. Components & Interactive Patterns

### 1. Buttons
- **Primary CTA**:
  - `rounded-full bg-[#a93017] text-white font-semibold shadow-[0_12px_32px_-8px_rgba(169,48,23,0.35)] hover:bg-[#cb482c] transition-all transform hover:-translate-y-0.5`
- **Secondary CTA / Ghost**:
  - `rounded-full bg-[#f7ece5] text-[#1f1b17] font-semibold hover:bg-[#f1e6df] transition-all` or border-based: `border border-[#1f1b17]/15 bg-white/70 hover:border-[#a93017] hover:text-[#a93017]`
- **Card Action / Add to Cart**:
  - `rounded-full bg-[#a93017] text-white px-4 py-2 font-semibold text-xs hover:bg-[#cb482c] transition-all flex items-center gap-1.5 shadow-sm`

### 2. Product Cards
- Container: `bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group border border-[#e0bfb8]/40`
- Image: `relative aspect-square bg-[#f7ece5] overflow-hidden` with `group-hover:scale-105 transition-transform duration-500`
- Badges: Pill shaped at top-left (`bg-[#a43c22] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`)
- Price: Highlighted in bold `text-[#1f1b17] font-bold text-lg`
- Dynamic Integration: Mapped to Google Sheets listings with live price, slug, category, and direct Add-to-Cart hook.

### 3. Header & Announcement Bar
- **Announcement Bar**: `bg-[#a93017] text-white py-1.5 px-4 text-xs font-semibold text-center tracking-wide`
- **Header**: Sticky `bg-[#fff8f5]/90 backdrop-blur-xl border-b border-[#e0bfb8]/50 shadow-sm`
- **Navigation Links**: Clean uppercase or capitalized Plus Jakarta Sans with hover color `#a93017`
- **Cart Badge**: Real-time connected count from `useCart()`, pill badge floating on cart icon.

### 4. Bespoke Trust Ribbon / Value Props
- 4-column grid with circular icon backgrounds (`bg-[#a93017]/10 text-[#a93017]`) and curated value promises:
  1. Hand-Finished & Inspected
  2. Live Custom Proofing Available
  3. Plastic-Free Gift Packaging
  4. Quick 48-72 hr Dispatch

---

## 5. Architectural Integrity & Safety Rules
1. **Google Sheets Preservation**: `lib/sheets.ts` remains the single source of truth for products, categories, themes, and moods.
2. **Cart Context**: Shopping cart drawer and `/cart` keep using `CartContext.tsx` with all options (`selectedColor`, `selectedSize`).
3. **Checkout**: Stripe checkout endpoint `/api/checkout` and webhook `/api/stripe/webhook` remain intact and connected.

