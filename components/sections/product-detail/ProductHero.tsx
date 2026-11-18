import Image from "next/image";
import { Button } from "@/components/ui/button/Button";
import { ColourSelector } from "@/components/ui/color-selector/ColourSelector";
import type { Product } from "@/types/content";

/**
 * Product detail hero: large image on the left, name, description,
 * colour selector and the "Where to buy" call to action on the right.
 * Stacks to a single column below lg.
 */
export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-background md:aspect-[8/9] lg:col-span-2">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority
          sizes="(min-width: 1200px) 66vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-start justify-center gap-6">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-primary md:text-4xl lg:text-5xl">
          {product.name}
        </h1>
        <p className="text-secondary">{product.shortDescription}</p>
        {product.colours && product.colours.length > 0 && (
          <ColourSelector colours={product.colours} />
        )}
        <Button href="/where-to-buy" variant="red" className="w-full md:w-auto lg:w-full">
          Where to buy
        </Button>
      </div>
    </section>
  );
}
