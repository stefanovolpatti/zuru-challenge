import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type BaseProps = {
    /** Image source (local import or URL). Remote hosts must be allowed in next.config.js */
    image: StaticImageData;
    /** Alt text for the image. Defaults to the title/label. */
    imageAlt?: string;
    /** Optional link; the whole card becomes clickable. */
    href?: string;
    className?: string;
};

type CategoryCardProps = BaseProps & {
    variant: "category";
    /** Label shown centered under the image, e.g. "Kitchen" */
    label: string;
};

type ProductCardProps = BaseProps & {
    variant: "product";
    /** Product name, e.g. "Octopus Blender" */
    title: string;
    /** Short description under the title */
    description: string;
};

export type CardProps = CategoryCardProps | ProductCardProps;

export default function Card(props: CardProps) {
    const { image, href, className = "" } = props;
    const text = props.variant === "category" ? props.label : props.title;
    const alt = props.imageAlt ?? text;

    const content = (
        <>
            {/* Image tile */}
            <div
                className={`relative w-full overflow-hidden rounded-3xl bg-neutral-100 ${props.variant === "category" ? "aspect-[1/1]" : "aspect-[3/4]"
                    }`}
            >
                <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Text */}
            {props.variant === "category" ? (
                <p className="mt-4 text-center text-sm text-neutral-800">
                    {props.label}
                </p>
            ) : (
                <div className="mt-5">
                    <h3 className="text-lg font-semibold text-neutral-900">
                        {props.title}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-neutral-600">
                        {props.description}
                    </p>
                </div>
            )}
        </>
    );

    const base = `group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 rounded-3xl ${className}`;

    return href ? (
        <Link href={href} className={base}>
            {content}
        </Link>
    ) : (
        <div className={base}>{content}</div>
    );
}