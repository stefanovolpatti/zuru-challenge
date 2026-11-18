import { describe, expect, it } from "vitest";
import { getAllProducts, getBestSellers, getProductBySlug, getProductsByCategory } from "./content";

describe("content data", () => {
  it("finds the countertop blender by slug", () => {
    const product = getProductBySlug("countertop-blender");
    expect(product).toBeDefined();
    expect(product?.name).toBe("Octopus Countertop Blender");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProductBySlug("toaster-3000")).toBeUndefined();
  });

  it("has unique slugs and required fields on every product", () => {
    const products = getAllProducts();
    const slugs = products.map((p) => p.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const product of products) {
      expect(product.name.trim()).not.toBe("");
      expect(product.shortDescription.trim()).not.toBe("");
      expect(product.image.startsWith("/images/")).toBe(true);
      expect(product.imageAlt.trim()).not.toBe("");
    }
  });

  it("returns category products with the featured one first", () => {
    const kitchen = getProductsByCategory("kitchen");
    expect(kitchen.length).toBeGreaterThan(0);
    expect(kitchen[0].featured ?? false).toBe(true);
  });

  it("returns exactly the flagged best sellers", () => {
    const bestSellers = getBestSellers();

    expect(bestSellers.length).toBeGreaterThan(0);
    expect(bestSellers.every((product) => product.bestSeller)).toBe(true);
    expect(bestSellers.map((product) => product.slug).sort()).toEqual(
      ["blender", "countertop-blender", "outdoor-camera", "power-bank"].sort()
    );
  });
});
