import { test, expect } from "@playwright/test";

test("homepage links through to the countertop blender PDP", async ({ page }) => {
  await page.goto("/");

  // Homepage card for the countertop blender → PDP.
  await page.getByRole("link", { name: /learn more about octopus countertop blender/i }).first().click();
  await expect(page).toHaveURL(/\/products\/countertop-blender$/);
  await expect(page.getByRole("heading", { level: 1, name: "Octopus Countertop Blender" })).toBeVisible();

  // The spec accordion toggles from the PDP.
  const spec = page.getByRole("button", { name: "Technical specifications" });
  await expect(spec).toHaveAttribute("aria-expanded", "true");
  await spec.click();
  await expect(spec).toHaveAttribute("aria-expanded", "false");
});
