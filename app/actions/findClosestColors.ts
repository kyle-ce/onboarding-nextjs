"use server";

import { sherwinPaintColors } from "../data/SherwinPaintColors";
import { ColorMatch } from "../types/colors";

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function calculateDistance(
  color1: [number, number, number],
  color2: [number, number, number]
): number {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
  );
}

export async function findClosestColors(
  hexColor: string
): Promise<ColorMatch[]> {
  const targetRgb = hexToRgb(hexColor);

  const colorMatches = sherwinPaintColors
    .filter(color => color.hex) // Skip colors without hex values
    .map((color) => ({
    name: color.name,
    hex: color.hex,
    distance: calculateDistance(targetRgb, color.rgb || hexToRgb(color.hex)),
  }));

  return colorMatches.sort((a, b) => a.distance - b.distance).slice(0, 3);
}
