export default function WeeklySuggestions({ options, getWeightedScore }) {
  if (!options.length)
    return <p className="text-center mt-2">No options added in the last 7 days.</p>;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Weekly Suggestions</h2>
      <ul className="list-disc pl-5">
        {options.map((opt) => (
          <li key={opt.id}>
            {opt.name} - Weighted Score: {getWeightedScore(opt).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
