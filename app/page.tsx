import { findClosestColors } from "./actions/findClosestColors";
import ColorPicker from "./color/_components/ColorPicker";
import ColorResults from "./color/_components/ColorResults";
export default async function Home({
  searchParams,
}: {
  searchParams: { color?: string };
}) {
  const color = searchParams.color ? `#${searchParams.color}` : "#000000";
  const matches = await findClosestColors(color);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Paint Color</h1>
        <p className="text-gray-600">Choose any color to find matching Sherwin-Williams paint colors</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-8">
          <ColorPicker />
          <ColorResults matches={matches} />
        </div>
      </div>
    </div>
  );
}
