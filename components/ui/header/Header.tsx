'use client'

// TODO: check accessibility rules for the header
// TODO: handle mobile view

import { useState } from "react";
import Logo from "../../../assets/images/Type=Logo + Type Large, Color=Red.svg"
import LogoMobile from "../../../assets/images/Type=Logo, Color=Red.svg"
import Link from "next/link";
import Image from 'next/image'
import Button from "../button/Button";
// import { Menu, X } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
}

interface HeaderCTA {
    label: string;
    href: string;
}

interface HeaderProps {
    navLinks: NavLink[];
    cta?: HeaderCTA | null;
}

const Header = ({
    navLinks,
    cta = null,
}: HeaderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="w-full px-2 py-2">
            <nav className="relative flex items-center justify-between rounded-full bg-white px-5 py-2 shadow-md">

                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src={Logo}
                        alt="Logo octopus"
                        className="hidden md:block h-7 w-auto"
                        loading="eager"
                    />
                    <Image
                        src={LogoMobile}
                        alt="Logo octopus"
                        className="block md:hidden h-7 w-auto"
                        loading="eager"
                    />

                </Link>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                >
                                    <Button type="ghost" label={link.label} />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {cta && (
                        // <a
                        //     href={cta.href}
                        //     className="rounded-full bg-red-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
                        // >
                        //     {cta.label}
                        // </a>
                        <Link href={cta.href}>
                            <Button type="red" label={cta.label} />
                        </Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center justify-center md:hidden"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                >
                    {/* {isOpen ? <X size={24} /> : <Menu size={24} />} */}
                </button>

                {/* Mobile navigation */}
                {isOpen && (
                    <div
                        id="mobile-navigation"
                        className="absolute left-0 top-full z-50 mt-3 w-full rounded-2xl bg-white p-5 shadow-lg md:hidden"
                    >
                        <ul className="flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-sm text-gray-700"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {cta && (
                            <a
                                href={cta.href}
                                onClick={() => setIsOpen(false)}
                                className="mt-5 block rounded-full bg-red-600 px-5 py-3 text-center text-sm font-medium text-white"
                            >
                                {cta.label}
                            </a>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
