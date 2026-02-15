export default function OptionList({ options, setOptions, recommendedOption, getWeightedScore }) {
  const handleDelete = (id) => setOptions(options.filter(opt => opt.id!==id));

  return (
    <div className="mb-4">
      {options.map(opt => (
        <div key={opt.id} className={`p-2 mb-2 border rounded ${recommendedOption?.id===opt.id?'bg-green-100':'bg-white'}`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{opt.name}</span>
            <span className="font-bold text-blue-600">Score: {getWeightedScore(opt).toFixed(1)}</span>
          </div>
          <div className="flex gap-2 mt-1">
            <span className="text-sm px-2 py-0.5 rounded bg-blue-200">Effort: {opt.effort}</span>
            <span className="text-sm px-2 py-0.5 rounded bg-green-200">Impact: {opt.impact}</span>
            <span className="text-sm px-2 py-0.5 rounded bg-red-200">Urgency: {opt.urgency}</span>
          </div>
          <button onClick={()=>handleDelete(opt.id)} className="mt-1 text-sm text-red-600 hover:underline">Delete</button>
        </div>
      ))}
    </div>
  );
}
