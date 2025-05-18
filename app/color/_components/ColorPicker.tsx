"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ColorPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colorParam = searchParams.get("color");
  const color = colorParam ? `#${colorParam}` : "#000000";

  const handleColorChange = (newColor: string) => {
    router.replace(`/?color=${newColor.substring(1)}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <label
          htmlFor="color-input"
          className="block w-40 h-40 rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 group-hover:border-gray-300 group-hover:shadow-lg"
          style={{ backgroundColor: color }}
        >
          <span className="sr-only">Choose color</span>
        </label>
        <input
          id="color-input"
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="sr-only"
        />
        <div className="mt-3 text-center">
          <p className="font-mono text-sm">{color.toUpperCase()}</p>
          <p className="text-sm text-gray-500 mt-1">Click to change color</p>
        </div>
      </div>
    </div>
  );
}
