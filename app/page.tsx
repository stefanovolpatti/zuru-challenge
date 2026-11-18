import { Banner } from "@/components/sections/banner/Banner";
import { CategorySection } from "@/components/sections/category-section/CategorySection";
import { BestSellers } from "@/components/sections/best-sellers/BestSellers";
import { ExploreCategories } from "@/components/sections/explore-categories/ExploreCategories";
import {
  getBestSellers,
  getCategories,
  getCategory,
  getHomeSections,
  getProductsByCategory,
} from "@/lib/content";
import type { HomeSection } from "@/types/content";

const categoryNames = Object.fromEntries(
  getCategories().map((category) => [category.id, category.name])
);

/** Maps one entry of data/home.json to the component that renders it. */
function renderSection(section: HomeSection) {
  switch (section.type) {
    case "best-sellers":
      return (
        <BestSellers
          key={section.id}
          id={section.id}
          products={getBestSellers()}
          categoryNames={categoryNames}
          className="p-4 lg:mx-32"
        />
      );

    case "category": {
      const category = getCategory(section.category);
      if (!category) return null;

      return (
        <CategorySection
          key={section.id}
          category={category}
          products={getProductsByCategory(category.id)}
          cta={section.cta}
        />
      );
    }

    case "banner":
      return (
        <Banner
          key={section.id}
          title={section.title}
          subtitle={section.subtitle}
          image={section.image}
          mobileImage={section.mobileImage}
          cta={section.cta}
        />
      );

    case "category-tiles":
      return (
        <ExploreCategories
          key={section.id}
          id={section.id}
          title={section.title}
          categories={getCategories()}
        />
      );
  }
}

export default function Home() {
  return <>{getHomeSections().map(renderSection)}</>;
}
