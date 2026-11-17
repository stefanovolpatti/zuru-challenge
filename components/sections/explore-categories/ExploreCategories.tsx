import { CategoryTile } from "@/components/ui/card/CategoryTile";
import type { Category } from "@/types/content";

type ExploreCategoriesProps = {
  id: string;
  title: string;
  categories: Category[];
};

export function ExploreCategories({ id, title, categories }: ExploreCategoriesProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="my-[180px] p-4 lg:mx-32 lg:p-0">
      <h2 id={headingId} className="mb-8 text-3xl font-bold text-primary">
        {title}
      </h2>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryTile
              label={category.name}
              image={category.tileImage}
              imageAlt={category.tileImageAlt}
              href={`/#${category.id}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
