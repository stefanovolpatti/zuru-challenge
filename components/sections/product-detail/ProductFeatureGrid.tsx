import { cn } from "cn";
import { ProductCard } from "@/components/ui/card/ProductCard";
import type { Product, ProductFeature } from "@/types/content";

/**
 * Bento grid of feature cards rendered through ProductCard (CTA hidden).
 * Wide features span both columns as a full-bleed overlay card with fixed
 * height; narrow features stack text over image like the homepage cards.
 * Cards without an image render as plain panels.
 */
export function ProductFeatureGrid({
    product,
    features,
}: {
    product: Product;
    features: ProductFeature[];
}) {
    if (features.length === 0) return null;

    return (
        <section aria-label="Features" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {features.map((feature, index) =>
                feature.image ? (
                    <ProductCard
                        key={feature.title}
                        product={{
                            id: `${product.id}-feature-${index}`,
                            slug: product.slug,
                            name: feature.title,
                            category: product.category,
                            shortDescription: feature.body ?? "",
                            image: feature.image,
                            imageAlt: feature.imageAlt ?? feature.title,
                            bestSeller: false,
                        }}
                        layout={feature.wide ? "overlay" : "stacked"}
                        cta={false}
                        className={cn(feature.wide && "sm:col-span-2 aspect-[16/10] sm:aspect-[21/10]")}
                    />
                ) : (
                    <div
                        key={feature.title}
                        className={cn(
                            "flex flex-col justify-center gap-2 rounded-3xl bg-neutral-50 p-6 md:p-8",
                            feature.wide && "sm:col-span-2"
                        )}
                    >
                        <h3 className="text-lg font-medium text-neutral-900">{feature.title}</h3>
                        {feature.body && <p className="text-neutral-600">{feature.body}</p>}
                    </div>
                )
            )}
        </section>
    );
}
