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

## Status

| Area | State |
|---|---|
| Homepage sections rendered from JSON | Done |
| Header with collapsing menu, footer | Done |
| Best sellers carousel | Not started |
| Hair Care section | Not started (no products in the data yet) |
| Product Detail Page | Not started |
| Tests (component and end-to-end) | Not started |
| SEO and Open Graph tags | Not started |
| Deployment and Lighthouse reports | Not started |

## Architecture

```
app/            routes: layout.tsx (header, main, footer) and page.tsx (Homepage)
components/
  ui/           primitives reused everywhere: Button, ProductCard, CategoryTile
  layout/       Header, Footer
  sections/     page blocks: Banner, PageSection, CategorySection, ExploreCategories
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
- **Server components by default.** Only the Header is a client component, because the menu needs state.

## How AI tools were used

**Tool:** Claude Code (Anthropic), used as a planning and pair-programming assistant.

| Part | How AI was used |
|---|---|
| Brief analysis and plan | Claude Code read the brief and proposed the stack, structure and phases. |
| Project scaffold, first components and page | TODO: confirm whether these were written by hand or with an AI tool. |
| Code review | Claude Code reviewed my components for correctness, props, duplication and accessibility. |
| Data layer | Claude Code designed and wrote the JSON files, the content types and `lib/content.ts`. |
| Refactor | Claude Code rewrote the components and the page against the data layer (details below). |
| README | Drafted by Claude Code, reviewed by me. |

### Where the AI corrected or rewrote my code

- **Button:** a `<button>` was nested inside a link in the header and the product cards (invalid HTML, two tab stops). `Button` now renders as a link when it gets an `href`. The `type` prop became `variant`, and the nested ternary became a lookup map.
- **Page:** 250 lines of hard-coded arrays and image imports in `app/page.tsx` moved to JSON. Cards that linked to the wrong product now build their link from the product slug.
- **Banner:** CSS background images were replaced with `next/image`, an empty element and two overlapping colour props were removed.
- **Header:** the menu toggle had no icon and was invisible, there was no Escape handling, and the menu collapsed at 768 px instead of below 1200 px. All three are fixed.
- **Cards:** `Card` duplicated `ProductCard` and carried a commented-out example; it is now a small `CategoryTile`. `ProductCard` takes a `product` instead of eight loose props, and classes that referenced an undefined `brand` colour are gone.
- **Semantics:** section titles were `<h5>` and the page had no `<main>`; sections now use `<section>` with an `<h2>`, inside a `<main>`.
- **Shared code:** three identical link types became one `LinkItem`. Header and Footer moved into the root layout so both pages share them.
- **Styles:** breakpoints were Tailwind's defaults and are now the brief's. Three button classes that repeated the same base were split into a base plus variants. Unused Geist font loading was removed.

