# Octopus Website — technical test

A demo of the Octopus consumer electronics site: the Homepage and the Countertop Blender product page, built with Next.js, React, TypeScript and Tailwind CSS.

> This README is a living document and the source of truth for the project. It is updated whenever the architecture, the status or the AI usage changes.

## Setup

Requires Node.js 20.9 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. Other commands: `npm run build`, `npm run start`, `npm run lint`.

## Testing

Component tests (Vitest + Testing Library) sit next to the components they cover; the end-to-end test lives in `e2e/`. The e2e test runs in your installed Google Chrome (headed locally, headless when CI is set). If Chrome is missing, install it or run `npx playwright install chrome`.

Then:

```bash
npm test          # unit + e2e
npm run test:unit # Vitest only
npm run test:e2e  # Playwright only, opens Chrome (builds and serves the production bundle)
```

What is covered and why:

- `Accordion.test.tsx` — the open/close state machine: `aria-expanded` toggling, panel region linkage and `defaultOpen`. It is the interactive primitive behind every spec section.
- `ProductCard.test.tsx` — name/description rendering, the `/products/[slug]` link, and the `cta={false}` variant used by the feature grid.
- `ColourSelector.test.tsx` — swatch selection updates `aria-checked` and the visible label.
- `lib/content.test.ts` — the data contract every page relies on: unique slugs, required fields, featured-first ordering.
- `e2e/product-journey.spec.ts` — homepage → click the blender card → PDP, asserts the h1 and that the spec accordion toggles. The one user journey that must never break.

Conventions: test behaviour, not markup; no snapshots; E2E stays limited to critical journeys; component tests colocated with the component.

## Status

| Area | State |
|---|---|
| Homepage sections rendered from JSON | Done |
| Header with collapsing menu, footer | Done |
| Best sellers carousel | Not started |
| Hair Care section | Not started (no products in the data yet) |
| Product Detail Page | Done (hero, feature grid, spec accordions, downloads); best-sellers carousel pending |
| Tests (component and end-to-end) | Done |
| SEO and Open Graph tags | Not started |
| Deployment and Lighthouse reports | Not started |

## Architecture

```
app/            routes: layout.tsx (header, main, footer), page.tsx (Homepage),
                products/[slug]/page.tsx (Product Detail Page)
components/
  ui/           primitives reused everywhere: Button, ProductCard, CategoryTile,
                Accordion, ColourSelector
  layout/       Header, Footer
  sections/     page blocks: Banner, PageSection, CategorySection, ExploreCategories,
                product-detail/ (ProductHero, ProductFeatureGrid, DownloadsRow)
e2e/            Playwright end-to-end tests (homepage → PDP journey)
*.test.tsx      component tests, colocated with the component they cover
data/           all content as JSON: products, categories, home sections, site navigation
lib/content.ts  the only module that reads data/
types/          content types shared by data, lib and components
public/images/  images referenced from the JSON
assets/         original Figma exports; the logos are imported from here
```

Why it is built this way:

- **Content lives in JSON, not in markup.** A product only names its category; adding one to `data/products.json` is enough for it to appear in the right section. The order of the Homepage sections is data too (`data/home.json`), and `app/page.tsx` just maps each entry to a component.
- **One data-access module.** Components never import JSON. They receive props, and pages get content from `lib/content.ts`. Replacing the JSON with a headless CMS or an API later means changing that one file.
- **Layout belongs to the section, not the product.** Each category declares an arrangement (`feature-top`, `feature-side` or `row`) and `CategorySection` picks the card layouts. Products stay free of presentation details.
- **Images are paths under `public/`.** JSON cannot hold static imports, and a path keeps "add a product" a data-only change. Cards and banners use `next/image` with `fill` inside fixed-ratio boxes, so nothing shifts while images load.
- **Three component layers.** `ui` knows nothing about the site, `sections` compose `ui`, and `layout` wraps every page. This keeps the primitives reusable for the product page.
- **Design tokens are defined once** in `app/globals.css` (`@theme`): colours and the two breakpoints from the brief, 810 px and 1200 px. Button styles are one base class plus one class per variant.
- **Server components by default.** The only client components are the Header (menu state), the Accordion (open/close) and the ColourSelector (selected swatch). Pages stay server-rendered and read data directly.
- **Pages compose, they don't layout.** `page.tsx` files only wire data to sections; layout lives in `components/sections/*`. A page that grows inline grids or hero markup wants a section component.
- **One `<h1>` per page** (the product name on the PDP), `<h2>` per section, `<h3>` inside cards.
- **Navigation CTAs are links.** `Button` with an `href` navigates; a bare `<button>` is only for JS actions.
- **Breakpoints agree between container and children.** `lg:grid-cols-3` pairs with `lg:col-span-2`, never a bare `md:col-span-*` inside an `lg:` grid.
- **Images get honest geometry.** Every `next/image` has an accurate `sizes`; the LCP (hero) image is `priority`; no fixed `min-h-*` fighting `aspect-*`, no duplicate hero images.
- **Types match reality.** A field stays required unless there is a real fallback; optional fields spread `??` through every render site.
- **Shared components grow props only with a caller.** `ProductCard`'s `cta={false}` exists because the feature grid hides the button; speculative props (title level, CTA label/href, children slots) were removed until needed.
- **Text on photos needs a contrast strategy.** Overlay text assumes a light, low-contrast photo; anything else uses the stacked card layout.

## Adding a product

1. Add images under `public/images/products/<slug>/`.
2. Add an entry to `data/products.json`: `slug`, `category`, `image`, `imageAlt`, `shortDescription`, `bestSeller`. Optionally `colours`, `features`, `specs`, `downloads`.
3. Run `npm run build`. The route is prerendered from the slug list; sections with no data simply don't render. No code changes needed.

## How AI tools were used

**Tool:** Claude Code (Anthropic), used as a planning and pair-programming assistant.

| Part | How AI was used |
|---|---|
| Brief analysis and plan | Claude Code read the brief and proposed the stack, structure and phases. |
| Project scaffold, first components and page | TODO: confirm whether these were written by hand or with an AI tool. |
| Code review | Claude Code reviewed my components for correctness, props, duplication and accessibility. |
| Data layer | Claude Code designed and wrote the JSON files, the content types and `lib/content.ts`. |
| Refactor | Claude Code rewrote the components and the page against the data layer (details below). |
| Product detail page | Claude Code built the dynamic route, sections and JSON from the brief; the page layout was reworked by hand afterwards, then reviewed again (fixes listed below). |
| Test suite | Claude Code proposed the Vitest + Playwright setup (unit vs e2e split, colocated tests) and wrote the initial tests and configs. |
| README | Drafted by Claude Code, reviewed by me. |

### Where the AI corrected or rewrote my code

- **Button:** a `<button>` was nested inside a link in the header and the product cards (invalid HTML, two tab stops). `Button` now renders as a link when it gets an `href`. The `type` prop became `variant`, and the nested ternary became a lookup map.
- **Page:** 250 lines of hard-coded arrays and image imports in `app/page.tsx` moved to JSON. Cards that linked to the wrong product now build their link from the product slug.
- **Banner:** CSS background images were replaced with `next/image`, an empty element and two overlapping colour props were removed.
- **Header:** the menu toggle had no icon and was invisible, there was no Escape handling, and the menu collapsed at 768 px instead of below 1200 px. All three are fixed.
- **Cards:** `Card` duplicated `ProductCard` and carried a commented-out example; it is now a small `CategoryTile`. `ProductCard` takes a `product` instead of eight loose props, and classes that referenced an undefined `brand` colour are gone.
- **Semantics:** section titles were `<h5>` and the page had no `<main>`; sections now use `<section>` with an `<h2>`, inside a `<main>`.
- **Shared code:** three identical link types became one `LinkItem`. Header and Footer moved into the root layout so both pages share them.
- **Product page:** the hero CTA was a `<button>` with no `href` (dead on click) — it now links to `/where-to-buy`. The page had no `<h1>`, the hero image forced `min-h-[900px]` over its aspect ratio, the grid mixed `lg:` columns with `md:` spans, and `DownloadsRow` had drifted inside the Specifications landmark. `ProductCard` also lost the speculative props (`titleAs`, `ctaLabel`, `ctaHref`, `children`) added for a reuse that was later reworked; only `cta` remains, because the feature grid calls it.
- **Styles:** breakpoints were Tailwind's defaults and are now the brief's. Three button classes that repeated the same base were split into a base plus variants. Unused Geist font loading was removed.

