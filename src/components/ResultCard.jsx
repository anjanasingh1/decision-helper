export default function ResultCard({ recommendedOption, getWeightedScore }) {
  if (!recommendedOption) return null;
  const score = getWeightedScore(recommendedOption);
  return (
    <div className="p-4 rounded bg-yellow-100 border border-yellow-400 mt-4 text-center">
      <h2 className="font-bold text-lg mb-2">Recommended Option</h2>
      <p className="text-xl font-semibold">{recommendedOption.name}</p>
      <p className="mt-1 text-gray-700">Weighted Score: {score.toFixed(1)}</p>
    </div>
  );
}
