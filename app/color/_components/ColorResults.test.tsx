import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ColorResults from "./ColorResults";

describe("ColorResults", () => {
  const mockMatches = [
    { name: "Red", hex: "#FF0000", distance: 0 },
    { name: "Blue", hex: "#0000FF", distance: 0 },
  ];

  it("should not render anything when matches array is empty", () => {
    render(<ColorResults matches={[]} />);
    expect(screen.queryByText("Closest Matches:")).not.toBeInTheDocument();
  });

  it("should render matches when provided", () => {
    render(<ColorResults matches={mockMatches} />);

    // Check for heading
    expect(screen.getByText("Closest Matches:")).toBeInTheDocument();

    // Check for color items
    mockMatches.forEach((match) => {
      expect(screen.getByText(match.name)).toBeInTheDocument();
      expect(screen.getByText(match.hex)).toBeInTheDocument();

      // Check for color swatch
      const swatch = screen.getByText(match.name).previousElementSibling;
      expect(swatch).toHaveStyle({ backgroundColor: match.hex });
    });
  });

  it("should maintain correct order of matches", () => {
    render(<ColorResults matches={mockMatches} />);

    const colorNames = screen
      .getAllByText(/Red|Blue/)
      .map((el) => el.textContent);
    expect(colorNames).toEqual(["Red", "Blue"]);
  });
});
