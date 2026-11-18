import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/accordion/Accordion";
import { ProductHero } from "@/components/sections/product-detail/ProductHero";
import { ProductFeatureGrid } from "@/components/sections/product-detail/ProductFeatureGrid";
import { DownloadsRow } from "@/components/sections/product-detail/DownloadsRow";
import { getAllProducts, getProductBySlug } from "@/lib/content";
import { Suspense } from "react";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}


export default function ProductPage({
  params,
}: PageProps<'/products/[slug]'>) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ProductDetails params={params} searchParams={params} />
    </Suspense>
  );
}


async function ProductDetails({
  params,
}: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-20 pt-6 md:gap-14 md:px-10 md:pt-10">
      <ProductHero product={product} />

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-background md:aspect-[16/9]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1200px) 1152px, 100vw"
          className="object-cover"
        />
      </div>

      {product.features && <ProductFeatureGrid product={product} features={product.features} />}

      {product.specs && product.specs.length > 0 && (
        <section aria-label="Specifications" className="flex flex-col gap-4">
          {product.specs.map((section, index) => (
            <Accordion key={section.title} title={section.title} defaultOpen={index === 0}>
              <ul className="list-disc pl-5">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Accordion>
          ))}
        </section>
      )}

      <DownloadsRow downloads={product.downloads} />
    </div>
  );
}
