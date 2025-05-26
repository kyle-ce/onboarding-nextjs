import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ColorPicker from "./ColorPicker";
import { mockRouter, setMockSearchParams } from "../../../test/utils";

describe("ColorPicker", () => {
  it("should render", () => {
    setMockSearchParams({});
    render(<ColorPicker />);

    // Check for the main container
    expect(
      screen.getByRole("group", { name: /choose color/i })
    ).toBeInTheDocument();

    // Check for the color input
    const colorInput = screen.getByTestId("color-input");
    expect(colorInput).toBeInTheDocument();
    expect(colorInput).toHaveAttribute("type", "color");

    // Check for the color value display
    expect(screen.getByText(/#[0-9A-F]{6}/i)).toBeInTheDocument();

    // Check for help text
    expect(screen.getByText(/click to change color/i)).toBeInTheDocument();
  });

  it("should initialize with default color (#000000)", () => {
    setMockSearchParams({});
    render(<ColorPicker />);

    const colorInput = screen.getByTestId("color-input") as HTMLInputElement;
    const colorLabel = screen.getByRole("group", { name: /choose color/i });
    const colorValue = screen.getByText(/#000000/i);

    expect(colorInput.value).toBe("#000000");
    expect(window.getComputedStyle(colorLabel).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)"
    );
    expect(colorValue).toHaveTextContent("#000000");
  });

  it("should initialize with provided color from URL params", () => {
    setMockSearchParams({ color: "FF0000" });
    render(<ColorPicker />);

    const colorInput = screen.getByTestId("color-input") as HTMLInputElement;
    const colorLabel = screen.getByRole("group", { name: /choose color/i });
    const colorValue = screen.getByText(/#FF0000/i);

    expect(colorInput.value.toUpperCase()).toBe("#FF0000");
    expect(window.getComputedStyle(colorLabel).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)"
    );
    expect(colorValue).toHaveTextContent("#FF0000");
  });

  it("updates URL when color changes", async () => {
    const user = userEvent.setup();
    setMockSearchParams({});

    render(<ColorPicker />);

    const colorInput = screen.getByTestId("color-input") as HTMLInputElement;

    // Simulate color change
    await user.type(colorInput, "#ff5500");
    fireEvent.change(colorInput, { target: { value: "#ff5500" } });

    // Check if router.replace was called with the correct URL
    expect(mockRouter.replace).toHaveBeenCalledWith("/?color=FF5500");
  });

  it("displays color value in uppercase", () => {
    setMockSearchParams({ color: "ff0000" });
    render(<ColorPicker />);

    // Check if the color value is displayed in uppercase
    expect(screen.getByText("#FF0000")).toBeInTheDocument();
  });
});
