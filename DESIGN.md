---
version: alpha
name: Farmart
description: A friendly, practical grocery storefront for everyday shopping.
colors:
  primary: "#FF7417"
  foreground: "#283342"
  muted: "#788291"
  canvas: "#FFFFFF"
  neutral: "#F2F3F5"
  promo-yellow: "#FFCC0B"
  soft-warm: "#FFF8F1"
  category-snacks: "#F4E7FF"
  category-soup: "#FFFBEA"
  category-soda: "#C9F9EF"
  category-organic: "#DCFBEA"
typography:
  body:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    lineHeight: "1.5"
  heading:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 19px
    fontWeight: "700"
  utility:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 11px
    fontWeight: "600"
rounded:
  sm: 4px
  md: 7px
spacing:
  sm: 4px
  md: 12px
  lg: 20px
  section: 36px
  container-max: 974px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    height: 29px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    height: 29px
  body-copy:
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
  utility-copy:
    textColor: "{colors.muted}"
    typography: "{typography.utility}"
  promotion-neutral:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground}"
  promotion-highlight:
    backgroundColor: "{colors.promo-yellow}"
    textColor: "{colors.foreground}"
  category-active:
    backgroundColor: "{colors.soft-warm}"
    textColor: "{colors.foreground}"
  category-snacks:
    backgroundColor: "{colors.category-snacks}"
    textColor: "{colors.foreground}"
  category-soup:
    backgroundColor: "{colors.category-soup}"
    textColor: "{colors.foreground}"
  category-soda:
    backgroundColor: "{colors.category-soda}"
    textColor: "{colors.foreground}"
  category-organic:
    backgroundColor: "{colors.category-organic}"
    textColor: "{colors.foreground}"
---

## Overview

Farmart is a grocery storefront for value-conscious shoppers, families, and
people who want convenient access to everyday essentials. Help visitors find
categories quickly, browse useful offers, and feel confident about shopping.

The brand is friendly, practical, natural, trustworthy, and energetic without
being noisy. Keep the voice warm, direct, and reassuring. Favor everyday value
and clear product information over luxury language.

## Colors

Use a white canvas and deep slate foreground as the foundation. Farmart orange
is the primary accent for actions and active states; the warm yellow supports
promotions. Pale neutral and food-inspired tints provide quiet section and
category backgrounds. The muted slate is for secondary labels, not essential
instructions or other text that must stand out.

Use the deep slate foreground on the orange primary action color for small
button labels to maintain readable contrast. Keep text and interactive states
distinct from their backgrounds.

## Typography

Use Arial, Helvetica, or a compatible sans-serif fallback. Body text is compact
and readable; headings are bold and concise. Utility labels are small and
secondary, with uppercase styling and increased tracking reserved for short
eyebrows and navigation labels. Avoid decorative type treatments.

## Layout

Center the storefront in a content area with a maximum width of 974px and
20px horizontal gutters. Keep a compact header with the brand at left, search
near the center, and utility actions at right. Place the secondary navigation
directly below it.

Follow the header with a two-column promotional area, a browse-by-category
section, and featured products or brands. Preserve clear grouping and
consistent vertical rhythm. At tablet and mobile widths, reflow columns and
navigation so labels, search, and actions remain legible and usable.

## Elevation & Depth

Keep surfaces mostly flat. Use borders and restrained background changes to
separate controls and cards; do not rely on heavy shadows, gradients, or
decorative depth effects.

## Shapes

Use compact 4px corners for buttons and controls, and 7px corners for cards.
Category cards should remain uniform and tidy. Avoid oversized pills or
ornamental shapes.

## Components

- **Header and navigation:** Keep the masthead aligned and functional. Make
  “Shop All Category” the clear entry point, with compact secondary links.
- **Search and controls:** Use subtle neutral borders, compact sizing, and
  readable input text. Keep the category selector and search field visually
  connected.
- **Buttons:** Use orange for primary actions and white or pale surfaces for
  secondary actions. Maintain clear labels and sufficient text contrast.
- **Promotions:** Use concise offer labels, a clear message, and a product
  illustration. Keep urgency helpful rather than aggressive.
- **Category and product cards:** Use consistent spacing, lightweight
  illustrations or emoji-style product cues, concise names, and restrained
  hover changes.
- **Badges:** Keep labels such as “Organic” or “20% Sale Off” short and
  visually consistent.

## Do's and Don'ts

- Do favor simple, cheerful food and product illustrations over photorealistic
  imagery unless a specific art direction calls for photography.
- Do keep hover transitions fast (about 150ms) and limited to color, border, or
  background changes.
- Do keep the storefront responsive and easy to scan.
- Don't use large transforms, heavy motion, excessive shadows, or luxury-heavy
  styling.
- Don't overload cards with dense information or decorative layers.
