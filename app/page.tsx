"use client";

import { useState } from "react";
import { findClosestColors } from "./actions/findClosestColors";
import { ColorMatch } from "./types/colors";
import ColorResults from "./color/_components/colorResults";

export default function Home() {
  const [color, setColor] = useState("#000000");
  const [matches, setMatches] = useState<ColorMatch[]>([]);

  const handleColorChange = async (newColor: string) => {
    setColor(newColor);
    const closestColors = await findClosestColors(newColor);
    setMatches(closestColors);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-2xl font-bold mb-4">Color Picker</h1>

      <div className="flex flex-col items-center gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-24 h-12 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-2">
          <div
            className="w-32 h-32 border border-gray-200"
            style={{ backgroundColor: color }}
          />
          <p className="font-mono">{color.toUpperCase()}</p>
        </div>

        <ColorResults matches={matches} />
      </div>
    </main>
  );
}
