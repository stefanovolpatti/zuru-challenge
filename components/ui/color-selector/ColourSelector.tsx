"use client";

import { useState } from "react";
import { cn } from "cn";
import type { ProductColour } from "@/types/content";

export type ColourSelectorProps = {
  colours: ProductColour[];
  className?: string;
};

/** Swatch picker for a product's colour options. Visual selection only. */
export function ColourSelector({ colours, className }: ColourSelectorProps) {
  const [selected, setSelected] = useState(0);

  if (colours.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div role="radiogroup" aria-label="Colour" className="flex items-center gap-2">
        {colours.map((colour, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={colour.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={colour.name}
              title={colour.name}
              onClick={() => setSelected(index)}
              style={{ backgroundColor: colour.value }}
              className={cn(
                "size-6 cursor-pointer rounded-full border border-black/10 transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isSelected && "ring-2 ring-primary ring-offset-2"
              )}
            />
          );
        })}
      </div>
      <span className="text-sm text-secondary">{colours[selected].name}</span>
    </div>
  );
}
