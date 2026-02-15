export default function WeeklySuggestions({ options, getWeightedScore }) {
  if (!options.length) return <p className="text-center text-gray-500 mb-4">No options added in the last 7 days.</p>;
  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2">Weekly Suggestions</h2>
      {options.map(opt => (
        <div key={opt.id} className="p-2 mb-1 border rounded bg-white">
          <div className="flex justify-between">
            <span>{opt.name}</span>
            <span className="font-bold text-blue-600">{getWeightedScore(opt).toFixed(1)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
