import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/Type=Logo + Type Small, Color=White.svg";
import type { FooterColumn } from "@/types/content";

type FooterProps = {
  columns: FooterColumn[];
};

export function Footer({ columns }: FooterProps) {
  return (
    <footer className="w-full bg-red px-5 py-8 text-white md:px-10 md:py-6 xl:px-32">
      <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
        <Link href="/" aria-label="Octopus home" className="shrink-0">
          <Image src={Logo} alt="" className="h-auto w-16" loading="eager" />
        </Link>

        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12 lg:gap-16">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-6 font-semibold">{column.title}</h2>

              <ul
                className={
                  column.grid ? "grid grid-cols-2 gap-x-10 gap-y-1" : "flex flex-col gap-1"
                }
              >
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-[10px]">Copyright 2026 Octopus - All rights reserved</p>
    </footer>
  );
}
