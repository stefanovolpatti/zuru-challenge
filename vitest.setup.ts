import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// RTL only auto-cleans when the test runner exposes globals; with
// globals: false we unmount explicitly after each test.
afterEach(() => {
  cleanup();
});

// next/image renders a plain <img> in tests: no optimizer, no fill wrapper.
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: Record<string, unknown> & { fill?: boolean; priority?: boolean }) =>
    createElement("img", props),
}));
