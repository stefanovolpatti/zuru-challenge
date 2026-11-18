"use client";

import { useId, useState } from "react";
import { cn } from "cn";

export type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};


export function Accordion({ title, children, defaultOpen = true, className }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const buttonId = useId();
  const panelId = useId();

  return (
    <button
      type="button"
      id={buttonId}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={() => setOpen((value) => !value)}
      className={cn(
        "block w-full cursor-pointer rounded-3xl bg-background text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
    >
      <span className="flex items-center justify-between gap-4 px-6 py-5">
        <span className="text-base leading-6 font-semibold text-primary">{title}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "size-5 shrink-0 text-primary transition-transform duration-300",
            open && "rotate-180"
          )}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>

      <span
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows,visibility] duration-300 ease-in-out",
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        )}
      >
        <span className="overflow-hidden">
          <span className="block px-6 pb-6 text-left text-[15px] leading-7 text-secondary">
            {children}
          </span>
        </span>
      </span>
    </button>
  );
}
