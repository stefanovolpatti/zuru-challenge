import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/content";

const product: Product = {
  id: "kettle",
  slug: "kettle",
  name: "Octopus Kettle 1.7 L",
  category: "kitchen",
  shortDescription: "A 1.7 L kettle that boils fast on 1800W",
  image: "/images/products/kettle.png",
  imageAlt: "Pouring hot water from the Octopus Kettle into a cup",
  bestSeller: false,
};

describe("ProductCard", () => {
  it("renders the product name, description and image", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.shortDescription)).toBeInTheDocument();
    expect(screen.getByAltText(product.imageAlt)).toBeInTheDocument();
  });

  it("links the CTA to the product detail page", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute(
      "href",
      "/products/kettle"
    );
  });

  it("hides the CTA when cta is false", () => {
    render(<ProductCard product={product} cta={false} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
  });
});
