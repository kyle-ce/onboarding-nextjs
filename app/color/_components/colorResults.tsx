import React from "react";
import { ColorMatch } from "../../types/colors";

const ColorResults = ({ matches }: { matches: ColorMatch[] }) => {
  return (
    <>
      {matches.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Closest Matches:</h2>
          <div className="flex flex-col gap-2">
            {matches.map((match, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 border border-gray-200"
                  style={{ backgroundColor: match.hex }}
                />
                <span>{match.name}</span>
                <span className="font-mono text-sm">{match.hex}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ColorResults;
