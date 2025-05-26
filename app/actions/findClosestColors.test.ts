import { describe, it, expect, vi, beforeEach } from "vitest";
import { findClosestColors } from "./findClosestColors";

describe("findClosestColors", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should find closest colors to red", async () => {
    vi.doMock("../data/SherwinPaintColors", () => ({
      sherwinPaintColors: [
        { name: "Pure Red", hex: "#FF0000", rgb: [255, 0, 0] },
        { name: "Pure Blue", hex: "#0000FF", rgb: [0, 0, 255] },
        { name: "Pure Green", hex: "#00FF00", rgb: [0, 255, 0] },
      ],
    }));
    const { findClosestColors } = await import("./findClosestColors");
    const matches = await findClosestColors("#FF0000");

    expect(matches).toHaveLength(3);
    expect(matches[0]).toEqual({
      name: "Pure Red",
      hex: "#FF0000",
      distance: 0,
    });
  });

  it("should find closest colors to a mixed color", async () => {
    vi.doMock("../data/SherwinPaintColors", () => ({
      sherwinPaintColors: [
        { name: "Pure Red", hex: "#FF0000", rgb: [255, 0, 0] },
        { name: "Pure Blue", hex: "#0000FF", rgb: [0, 0, 255] },
        { name: "Pure Green", hex: "#00FF00", rgb: [0, 255, 0] },
      ],
    }));
    const { findClosestColors } = await import("./findClosestColors");
    const matches = await findClosestColors("#FF00FF"); // Magenta (mix of red and blue)

    expect(matches).toHaveLength(3);
    // First two matches should be red and blue as they're equidistant
    const topTwoColors = matches.slice(0, 2).map(m => m.hex).sort();
    expect(topTwoColors).toEqual(["#0000FF", "#FF0000"]);
    // Their distances should be equal
    expect(matches[0].distance).toEqual(matches[1].distance);
  });

  it("should find closest colors to white", async () => {
    vi.doMock("../data/SherwinPaintColors", () => ({
      sherwinPaintColors: [
        { name: "White", hex: "#FFFFFF", rgb: [255, 255, 255] },
        { name: "Black", hex: "#000000", rgb: [0, 0, 0] },
        { name: "Gray", hex: "#808080", rgb: [128, 128, 128] },
      ],
    }));
    const { findClosestColors } = await import("./findClosestColors");
    const matches = await findClosestColors("#FFFFFF");

    expect(matches).toHaveLength(3);
    expect(matches[0]).toEqual({
      name: "White",
      hex: "#FFFFFF",
      distance: 0,
    });
  });

  it("should handle colors without rgb values", async () => {
    vi.doMock("../data/SherwinPaintColors", () => ({
      sherwinPaintColors: [
        { name: "Red", hex: "#FF0000" }, // No rgb
        { name: "Blue", hex: "#0000FF", rgb: [0, 0, 255] },
      ],
    }));
    const { findClosestColors } = await import("./findClosestColors");
    const matches = await findClosestColors("#FF0000");

    expect(matches).toHaveLength(2);
    expect(matches[0]).toEqual({
      name: "Red",
      hex: "#FF0000",
      distance: 0,
    });
  });

  it("should handle invalid hex colors gracefully", async () => {
    vi.doMock("../data/SherwinPaintColors", () => ({
      sherwinPaintColors: [
        { name: "Red", hex: "#FF0000", rgb: [255, 0, 0] },
        { name: "Blue", hex: "#0000FF", rgb: [0, 0, 255] },
      ],
    }));
    const { findClosestColors } = await import("./findClosestColors");
    const matches = await findClosestColors("#GGGGGG");

    expect(matches).toHaveLength(2);
    // All distances will be NaN due to invalid hex parsing
    expect(matches.every(m => isNaN(m.distance))).toBe(true);
  });

  it("should skip colors without hex values", async () => {
    vi.doMock("../data/SherwinPaintColors", () => ({
      sherwinPaintColors: [
        { name: "Red", hex: "#FF0000" },
        { name: "Invalid", rgb: [0, 0, 255] }, // No hex
      ],
    }));
    const { findClosestColors } = await import("./findClosestColors");
    const matches = await findClosestColors("#FF0000");

    expect(matches).toHaveLength(1);
    expect(matches[0]).toEqual({
      name: "Red",
      hex: "#FF0000",
      distance: 0,
    });
  });
});
