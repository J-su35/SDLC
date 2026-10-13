# DESIGN.md

## 1. Product and audience

- Product: Farmart storefront landing page for a modern grocery and household shopping experience.
- Primary audience: value-conscious shoppers, families, and convenience-driven consumers buying everyday essentials online.
- Core goal: help users discover categories quickly, browse featured offers, and feel confident that the store is fresh, practical, and trustworthy.
- UX promise: simple navigation, strong category scanning, and approachable merchandising that feels warm and clean rather than luxury-heavy.

## 2. Brand personality

- Brand name: Farmart
- Personality: friendly, practical, natural, trustworthy, energetic without feeling noisy.
- Voice: warm, direct, and reassuring; product language should stay simple and useful.
- Brand attributes: fresh, everyday, family-oriented, accessible, efficient.
- Positioning: a grocery brand for real life—quick decisions, affordable value, and everyday essentials.

## 3. Design principles

- Clarity first: every section should read in a glance; labels and CTAs should be easy to understand.
- Freshness over excess: favor bright, natural tones and clean layouts over dark, heavy luxury styling.
- Utility-focused: the interface should prioritize speed and browsing efficiency over decorative complexity.
- Warm confidence: combine approachable colors with firm structure so the store feels dependable.
- Mobile-friendly simplicity: content should remain legible and navigable at small widths without visual overload.

## 4. Visual language

- Overall aesthetic: light, airy, grocery-retail, and clean.
- Style direction: bright neutral surfaces, vivid accent colors, crisp category blocks, and simple iconography.
- The page should feel like an online grocery marketplace, not a premium lifestyle brand.
- Visual motifs: natural produce references, food icons, and friendly illustrated cues (emoji-style) used sparingly for product and category cues.

### Color palette

- Background: `#FFFFFF`
- Foreground / text: `#283342`
- Muted text: `#788291`
- Accent orange: `#FF7417`
- Support yellow: `#FFCC0B`
- Light neutral: `#F2F3F5`
- Border: `#ECEEF1`
- Soft warm backgrounds: `#FFF8F1`, `#FFFBEA`, `#F4E7FF`, `#C9F9EF`, `#DCFBEA`

### Imagery and icons

- Use simple, cheerful, product-first visual cues: fruits, bakery items, beverage graphics, produce symbols, and packaging illustrations.
- Prefer clean emoji-like or generative product-icon treatments over photorealistic photography unless a specific product art direction is added later.
- Icons should remain lightweight and clearly readable at small sizes.

## 5. Layout and structure

- Use a centered content container with a max width around `974px` and generous horizontal gutters.
- Split the storefront into a clear sequence:
  1. Header with logo, search, and utility actions
  2. Category navigation row
  3. Promotional hero band
  4. Browse-by-category section
  5. Featured brands or products section
- Keep vertical rhythm consistent with generous whitespace between sections.
- The primary structure should remain narrow and readable, with strong content grouping and low visual noise.

### Header

- Top bar should feel compact and controlled, not oversized.
- Left: brand mark plus store name.
- Center: search bar with category selector and search field.
- Right: phone number, account action, wishlist, cart, cart total.
- The masthead should remain clear and functional, with little ornamentation and strong alignment.

### Navigation

- Use a secondary navigation row beneath the header.
- Include a prominent orange “Shop All Category” block for the category entry point.
- Menu text should be compact, uppercase or small-caps style labels, and low-contrast for secondary items.
- Hover state should emphasize orange and subtle color transitions.

## 6. Typography

- Use a clean sans-serif type system with a friendly but functional tone.
- Base text should be compact and highly readable, with lightweight utility labeling and strong hierarchy.
- Recommended typographic behavior:
  - Headings: bold, compact, and visually confident
  - Eyebrow labels: tiny uppercase labels with strong tracking and warm accent color
  - Body text: compact, readable, and neutral
  - Utility labels: small, dense, and low-contrast, often uppercase for navigation and controls
- Keep text weights accessible and avoid over-styling; the interface should read like a practical commerce app, not a design magazine.

## 7. Components

### Buttons

- Rounded rectangle buttons with subtle radius (`4px`), short height, and strong contrast.
- Primary CTAs use the warm orange accent with white text.
- Secondary CTAs use white or pale backgrounds for soft emphasis.
- Buttons should convey direct action without extra decoration.

### Cards

- Category cards are rectangular, low-contrast, and uniform in size.
- Product and feature cards use soft rounded corners (`7px`) and balanced internal spacing.
- Hover states should lightly shift border color and apply a subtle warm highlight, not dramatic motion.

### Search and form controls

- Inputs and selects should be compact and subtle, bordered with neutral tones.
- Keep fields easy to scan and highly legible on desktop and mobile.
- Controls should retain a straightforward utility aesthetic rather than a glossy SaaS look.

### Badges and labels

- Use compact labels such as “Fresh Drink,” “Organic,” “20% Sale Off,” and other short promotional tags.
- Eyebrow text should stay consistent in size and color to preserve the brand’s familiar grocery rhythm.

## 8. Product merchandising and content patterns

- Category navigation and promotional modules should be easy to scan in under a second.
- Use two-column promotional sections with a clear focal message and product illustration.
- Merchandising should prioritize freshness and urgency without feeling aggressive.
- Featured categories and product blocks should be visually consistent and have a clear hierarchy:
  - label
  - product name
  - supporting illustration or icon
- Keep product cards lightweight and approachable, with no overbuilt columns or dense information layouts.

## 9. Interaction, responsiveness, and implementation notes

- Motion should be subtle and fast: prefer short hover transitions (`150ms`) and minimal animation.
- Hover states should primarily change color, border, and background; avoid large scale or heavy transforms.
- The design should be fully responsive across desktop, tablet, and small mobile widths.
- Maintain strong readability of labels, search, and CTA elements at reduced widths.
- Do not add excessive shadows, gradients, or luxury visual effects; the design should remain practical and trustworthy.
- Prefer simple, maintainable CSS and component logic over complicated UI frameworks or decorative layers.
- Default to a clear structure: static commerce layout, neutral typography, warm accent system, and restrained motion.

## Final intent

This storefront should feel like a real, modern grocery website: clean enough for daily use, warm enough to feel human, and practical enough to support high-volume browsing. The visual system is intentionally simple, readable, and efficient, so the product remains trustworthy and easy to shop.
