import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ColourSelector } from "./ColourSelector";

const colours = [
  { name: "Graphite", value: "#2B2B2B" },
  { name: "Cream", value: "#EDE6DA" },
];

describe("ColourSelector", () => {
  it("renders nothing when there are no colours", () => {
    const { container } = render(<ColourSelector colours={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("selects the first colour by default", () => {
    render(<ColourSelector colours={colours} />);

    expect(screen.getByRole("radio", { name: "Graphite" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Cream" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByText("Graphite")).toBeInTheDocument();
  });

  it("updates the selection when a swatch is clicked", async () => {
    const user = userEvent.setup();
    render(<ColourSelector colours={colours} />);

    await user.click(screen.getByRole("radio", { name: "Cream" }));

    expect(screen.getByRole("radio", { name: "Cream" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Graphite" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByText("Cream")).toBeInTheDocument();
  });
});
