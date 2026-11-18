import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion } from "./Accordion";

const content = <p>Power: 1500W</p>;

describe("Accordion", () => {
  it("renders open by default with the panel visible", () => {
    render(<Accordion title="Technical specifications">{content}</Accordion>);

    expect(screen.getByRole("button", { name: /technical specifications/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("region", { name: /technical specifications/i })).toBeInTheDocument();
    expect(screen.getByText("Power: 1500W")).toBeInTheDocument();
  });

  it("toggles the panel when the header is clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion title="Technical specifications">{content}</Accordion>);

    const toggle = screen.getByRole("button", { name: /technical specifications/i });

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("starts collapsed when defaultOpen is false", () => {
    render(
      <Accordion title="Technical specifications" defaultOpen={false}>
        {content}
      </Accordion>
    );

    expect(screen.getByRole("button", { name: /technical specifications/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("links the button to its panel via aria-controls", () => {
    render(<Accordion title="Technical specifications">{content}</Accordion>);

    const button = screen.getByRole("button", { name: /technical specifications/i });
    const panel = screen.getByRole("region", { name: /technical specifications/i });
    expect(button.getAttribute("aria-controls")).toBe(panel.id);
  });
});
