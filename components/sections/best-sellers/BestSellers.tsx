"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/ui/card/ProductCard";
import { Button } from "@/components/ui/button/Button";
import { cn } from "cn";
import type { Product } from "@/types/content";

const ChevronLeft = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

const ChevronRight = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);

type BestSellersProps = {
  id: string;
  products: Product[];
  /** Display name per category id, used for the card eyebrow label. */
  categoryNames: Record<string, string>;
  title?: string;
  /** Extra classes for the outer section; callers own the outer spacing. */
  className?: string;
};

/**
 * Horizontally scrolling row of best-seller cards. Scroll-snap based, so it
 * works with touch, trackpad and the arrow buttons without any carousel
 * library. Cards are `ProductCard` in the `showcase` layout (image on top on
 * mobile, text-left/image-right from md up).
 */
export function BestSellers({
  id,
  products,
  categoryNames,
  title = "Best sellers",
  className,
}: BestSellersProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByOneCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>(":scope > *");
    if (!track || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
    track.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("flex flex-col gap-6", className)}>
      <h2 id={`${id}-heading`} className="text-xl font-bold text-primary md:text-2xl">
        {title}
      </h2>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[82%] shrink-0 snap-start sm:w-[62%] md:w-[56%] lg:w-[46%]"
          >
            <ProductCard
              product={product}
              layout="showcase"
              eyebrow={categoryNames[product.category]}
              className="h-full"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="neutral"
          iconOnly
          icon={ChevronLeft}
          aria-label="Scroll to previous products"
          onClick={() => scrollByOneCard(-1)}
          disabled={!canScrollPrev}
        />
        <Button
          variant="neutral"
          iconOnly
          icon={ChevronRight}
          aria-label="Scroll to next products"
          onClick={() => scrollByOneCard(1)}
          disabled={!canScrollNext}
        />
      </div>
    </section>
  );
}
