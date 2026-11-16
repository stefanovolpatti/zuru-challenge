// TODO: check accessibility rules for the card

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "cn"; // tiny helper: (...c) => twMerge(clsx(c))
import Button from "../button/Button";

/**
 * One card, four layouts. Everything that is the same in all five designs
 * (rounded surface, title/description type, red pill button) lives here once.
 * Only the arrangement changes, and that is just a class string per layout.
 */

type Layout =
    | "split"          // text left, image right        (Air Fryer, Doorbell)
    | "stacked"        // image on top, text left below (Power Bank)
    | "stacked-center" // text centered, image below    (Blender)
    | "overlay";       // full-bleed photo, text on top (Kettle)

export type ProductCardProps = {
    title: string;
    description: string;
    href: string;
    image: StaticImageData;
    imageAlt?: string;
    eyebrow?: string;  // "Kitchen" in the first card
    layout?: Layout;
    className?: string;
};

// Layout = container classes + text block classes + image wrapper classes.
// Mobile (default) is identical for every layout: text centered on top,
// image below. The layout only changes things from `md` upward.
const base = {
    root: "flex-col items-center text-center",
    text: "w-full max-w-md p-8",
    media: "relative aspect-[5/4] w-full",
};

// Layout = container classes + text block classes + image wrapper classes.
const layouts: Record<Layout, { root: string; text: string; media: string }> = {
    split: {
        root: `${base.root} md:flex-row md:text-left`,
        text: `${base.text} md:w-1/2 md:max-w-none md:p-12`,
        media: `${base.media} md:aspect-auto md:w-1/2 md:self-stretch`,
    },
    stacked: {
        root: `${base.root} md:flex-col-reverse md:items-stretch md:justify-end md:text-left`,
        text: `${base.text} md:max-w-none md:p-6`,
        media: `${base.media} md:aspect-square`,
    },
    "stacked-center": {
        root: base.root,
        text: base.text,
        media: base.media,
    },
    overlay: {
        root: `${base.root} md:flex-row md:items-center md:text-left`,
        text: `${base.text} md:relative md:z-10 md:p-16`,
        media: `${base.media} md:absolute md:inset-0 md:aspect-auto`,
    },
};

export function ProductCard({
    title,
    description,
    href,
    image,
    imageAlt = "",
    eyebrow,
    layout = "split",
    className,
}: ProductCardProps) {
    const l = layouts[layout];
    const isOverlay = layout === "overlay";

    return (
        <article
            className={cn(
                "relative flex overflow-hidden rounded-3xl bg-neutral-50",
                l.root,
                className
            )}
        >
            <div className={l.text}>
                {eyebrow && <p className="mb-3 text-sm text-brand">{eyebrow}</p>}

                <h3 className="text-2xl font-medium text-neutral-900 md:text-3xl">
                    {title}
                </h3>
                <p className="mt-3 text-neutral-600">{description}</p>

                <Link href={href}
                    className="mt-6 inline-flex rounded-full bg-brand  text-sm text-white transition hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                    <Button type="red" label="Learn more" />
                </Link>
            </div>

            <div className={l.media}>
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={isOverlay ? "object-cover" : "object-contain p-6"}
                />
            </div>
        </article>
    );
}
