import Image from "next/image";
import { cn } from "cn";
import { Button } from "@/components/ui/button/Button";
import type { Product } from "@/types/content";

/**
 * One card, four layouts. Everything the designs share (rounded surface,
 * title and description type, red pill button) lives here once. Only the
 * arrangement changes, and that is a set of classes per layout.
 */
export type ProductCardLayout =
  | "split" // text left, image right
  | "stacked" // image on top, text left below
  | "stacked-center" // text centered, image below
  | "overlay"; // full-bleed photo, text on top

type LayoutClasses = { root: string; text: string; media: string };

// Mobile is identical for every layout: text centered on top, image below.
// A layout only changes things from `md` upward.
const base: LayoutClasses = {
  root: "flex-col items-center text-center",
  text: "w-full max-w-md p-8",
  media: "relative aspect-[5/4] w-full",
};

const layouts: Record<ProductCardLayout, LayoutClasses> = {
  split: {
    root: cn(base.root, "md:flex-row md:text-left"),
    text: cn(base.text, "md:w-1/2 md:max-w-none md:p-12"),
    media: cn(base.media, "md:aspect-auto md:w-1/2 md:self-stretch"),
  },
  stacked: {
    root: cn(base.root, "md:flex-col-reverse md:items-stretch md:justify-end md:text-left"),
    text: cn(base.text, "md:max-w-none md:p-6"),
    media: cn(base.media, "md:aspect-square"),
  },
  "stacked-center": base,
  overlay: {
    root: cn(base.root, "md:flex-row md:items-center md:text-left"),
    text: cn(base.text, "md:relative md:z-10 md:p-16"),
    media: cn(base.media, "md:absolute md:inset-0 md:aspect-auto"),
  },
};

export type ProductCardProps = {
  product: Product;
  layout?: ProductCardLayout;
  /** Hide the call-to-action button. Defaults to showing it. */
  cta?: boolean;
  className?: string;
};

export function ProductCard({ product, layout = "split", cta = true, className }: ProductCardProps) {
  const classes = layouts[layout];

  return (
    <article
      className={cn(
        "relative flex overflow-hidden rounded-3xl bg-neutral-50",
        classes.root,
        className
      )}
    >
      <div className={classes.text}>
        <h3 className="text-2xl font-medium text-neutral-900 md:text-3xl">{product.name}</h3>
        <p className="mt-3 text-neutral-600">{product.shortDescription}</p>

        {cta && (
          <Button href={`/products/${product.slug}`} variant="red" className="mt-6">
            Learn more
            <span className="sr-only"> about {product.name}</span>
          </Button>
        )}
      </div>

      <div className={classes.media}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 810px) 50vw, 100vw"
          className={layout === "overlay" ? "object-cover" : "object-contain p-6"}
        />
      </div>
    </article>
  );
}
