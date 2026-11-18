/**
 * The only module that reads the JSON in /data. Pages and components ask
 * these functions for content, so swapping the JSON for a CMS or an API later
 * means changing this file only.
 */
import categoriesJson from "@/data/categories.json";
import homeJson from "@/data/home.json";
import productsJson from "@/data/products.json";
import siteJson from "@/data/site.json";
import type {
  Category,
  CategoryId,
  HomeSection,
  Product,
  SiteContent,
} from "@/types/content";

const categories = categoriesJson as Category[];
const products = productsJson as Product[];
const site = siteJson as SiteContent;
const homeSections = homeJson.sections as HomeSection[];

export function getSiteContent(): SiteContent {
  return site;
}

export function getHomeSections(): HomeSection[] {
  return homeSections;
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((category) => category.id === id);
}

/** Products of a category in data order, with the featured one first. */
export function getProductsByCategory(id: CategoryId): Product[] {
  return products
    .filter((product) => product.category === id)
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
