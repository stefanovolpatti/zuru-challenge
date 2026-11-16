// TODO: check accessibility rules for the footer

import Link from "next/link";
import Image from 'next/image'
import Logo from "../../../assets/images/Type=Logo + Type Small, Color=White.svg"


interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
    grid?: boolean;
}

interface FooterProps {
    columns: FooterColumn[];
}

const Footer = ({
    columns,
}: FooterProps) => {
    return (
        <footer className="w-full bg-red px-5 py-8 text-white md:px-10 md:py-6 xl:px-[128px]">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:justify-between">

                <Link href="/" className="shrink-0">
                    <Image
                        src={Logo}
                        alt="Logo octopus"
                        className="h-auto w-16"
                        loading="eager"
                    />
                </Link>

                <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12 lg:gap-16">
                    {columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="mb-6 font-semibold">
                                {column.title}
                            </h3>

                            <ul
                                className={
                                    column.grid
                                        ? "grid grid-cols-2 gap-x-10 gap-y-1"
                                        : "flex flex-col gap-1"
                                }
                            >
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="transition-opacity hover:opacity-70"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>

            <div className="mt-8 flex flex-col items-start gap-4 text-[10px] md:flex-row md:items-center md:justify-between">
                <p>Copyright 2026 Octopus - All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
