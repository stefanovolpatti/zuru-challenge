import type { ButtonVariant } from "@/components/ui/button/Button";

export type CategoryId = "kitchen" | "home-security" | "hair-care" | "accessories";

export type LinkItem = {
  label: string;
  href: string;
};

/** A call to action. Without `href` it renders as a plain button. */
export type Cta = {
  label: string;
  href?: string;
  variant?: ButtonVariant;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  shortDescription: string;
  /** Path under /public, e.g. "/images/products/kettle.png" */
  image: string;
  imageAlt: string;
  /** The featured product gets the large card of its category section. */
  featured?: boolean;
  bestSeller: boolean;
  colours?: ProductColour[];
  features?: ProductFeature[];
  specs?: { title: string; items: string[] }[];
  downloads?: ProductDownload[];
};

/** How a category section arranges its product cards. */
export type CategoryLayout = "feature-top" | "feature-side" | "row";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  tileImage: string;
  tileImageAlt: string;
  layout: CategoryLayout;
};

export type BannerContent = {
  title: string;
  subtitle?: string;
  image: string;
  /** Optional image for small screens; falls back to `image`. */
  mobileImage?: string;
  cta?: Cta;
};

export type HomeSection =
  | { id: string; type: "category"; category: CategoryId; cta?: Cta }
  | ({ id: string; type: "banner" } & BannerContent)
  | { id: string; type: "category-tiles"; title: string }
  | { id: string; type: "best-sellers" };

export type FooterColumn = {
  title: string;
  links: LinkItem[];
  /** Lay the links out in two columns. */
  grid?: boolean;
};

export type SiteContent = {
  navigation: LinkItem[];
  headerCta: LinkItem;
  footerColumns: FooterColumn[];
};

export type ProductFeature = {
  title: string;
  body?: string;
  /** Path under /public. Cards without an image render as text-only. */
  image?: string;
  imageAlt?: string;
  /** Spans both columns of the feature grid on md+. */
  wide?: boolean;
};

export type ProductColour = {
  name: string;
  /** CSS color used for the swatch, e.g. "#2B2B2B". */
  value: string;
};

export type ProductDownload = {
  label: string;
  href: string;
};
