"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import type { LinkItem } from "@/types/content";

type HeaderProps = {
  navLinks: LinkItem[];
  cta?: LinkItem;
};

const MOBILE_MENU_ID = "mobile-navigation";

export function Header({ navLinks, cta }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and hands focus back to the button that opened it.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="w-full px-2 py-6 md:px-6 lg:px-10 xl:px-34">
      <nav
        aria-label="Main"
        className="relative flex items-center justify-between rounded-full bg-white px-5 py-2 shadow-md"
      >
        <Link href="/" aria-label="Octopus home" className="shrink-0">
          <Image src="/images/logo-red-large.svg" alt="" className="hidden h-7 w-auto md:block" loading="eager" width={64} height={64} unoptimized />
          <Image src="/images/logo-red.svg" alt="" className="block h-7 w-auto md:hidden" loading="eager" width={64} height={64} unoptimized />
        </Link>

        {/* Full navigation, from 1200px up */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Button href={link.href} variant="ghost">
                  {link.label}
                </Button>
              </li>
            ))}
          </ul>

          {cta && (
            <Button href={cta.href} variant="red">
              {cta.label}
            </Button>
          )}
        </div>

        {/* Menu toggle, below 1200px */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="-my-1.5 flex h-10 w-10 items-center justify-center rounded-full text-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        {/* Collapsed navigation. Any click on a link inside closes it. */}
        {isOpen && (
          <div
            id={MOBILE_MENU_ID}
            onClick={() => setIsOpen(false)}
            className="absolute top-full left-0 z-50 mt-3 w-full rounded-2xl bg-white p-5 shadow-lg lg:hidden"
          >
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="block text-sm text-gray">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {cta && (
              <Button href={cta.href} variant="red" className="mt-5 w-full">
                {cta.label}
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
