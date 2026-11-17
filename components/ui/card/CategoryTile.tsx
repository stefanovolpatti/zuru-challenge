import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";

export type CategoryTileProps = {
  label: string;
  /** Path under /public, e.g. "/images/products/blender.png" */
  image: string;
  /** Defaults to the label. */
  imageAlt?: string;
  /** With `href` the whole tile is a link. */
  href?: string;
  className?: string;
};

export function CategoryTile({ label, image, imageAlt, href, className }: CategoryTileProps) {
  const classes = cn(
    "group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900",
    className
  );

  const content = (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-100">
        <Image
          src={image}
          alt={imageAlt ?? label}
          fill
          sizes="(min-width: 1200px) 20vw, (min-width: 810px) 25vw, 50vw"
          className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-4 text-center text-sm text-neutral-800">{label}</p>
    </>
  );

  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
