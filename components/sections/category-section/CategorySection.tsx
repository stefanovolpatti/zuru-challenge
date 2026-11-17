import { PageSection } from "@/components/sections/page-section/PageSection";
import { ProductCard } from "@/components/ui/card/ProductCard";
import type { Category, Cta, Product } from "@/types/content";

type CategorySectionProps = {
  category: Category;
  /** Featured product first: it gets the large card in the feature layouts. */
  products: Product[];
  cta?: Cta;
};

/**
 * Renders one category with the card arrangement named in its data
 * (`category.layout`). The section owns the arrangement; a product only
 * says which category it belongs to.
 */
export function CategorySection({ category, products, cta }: CategorySectionProps) {
  const [featured, ...rest] = products;

  if (!featured) return null;

  return (
    <PageSection id={category.id} title={category.name} description={category.tagline} cta={cta}>
      {category.layout === "feature-top" && (
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
          <ProductCard
            product={featured}
            layout="overlay"
            className="md:col-span-2 md:min-h-[26rem]"
          />
          {rest.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              layout="stacked-center"
              className="md:max-h-[880px]"
            />
          ))}
        </div>
      )}

      {category.layout === "feature-side" && (
        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:gap-6">
          <ProductCard product={featured} layout="stacked-center" className="md:h-screen" />
          <div className="flex flex-col gap-4 md:h-screen">
            {rest.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="split"
                className="w-full md:h-full"
              />
            ))}
          </div>
        </div>
      )}

      {category.layout === "row" && (
        <div className="flex flex-col gap-6 p-4 md:flex-row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} layout="stacked" className="w-full" />
          ))}
        </div>
      )}
    </PageSection>
  );
}
