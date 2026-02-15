import { useState } from 'react';

export default function DecisionForm({ options, setOptions }) {
  const [optionInput, setOptionInput] = useState({ name:'', effort:'', impact:'', urgency:'' });

  const handleChange = (e) => setOptionInput({ ...optionInput, [e.target.name]: e.target.value });

  const addOption = () => {
    if (!optionInput.name) return;
    const effort = Number(optionInput.effort);
    const impact = Number(optionInput.impact);
    const urgency = Number(optionInput.urgency);
    if (effort<1||effort>5||impact<1||impact>5||urgency<1||urgency>5){
      alert("Scores must be 1-5"); return;
    }
    const newOpt = { id: Date.now(), name: optionInput.name, effort, impact, urgency, date: new Date().toISOString() };
    setOptions([...options, newOpt]);
    setOptionInput({ name:'', effort:'', impact:'', urgency:'' });
  };

  return (
    <div className="mb-4 p-4 rounded bg-white border border-gray-300">
      <h2 className="font-semibold mb-2 text-center">Add a Decision</h2>
      <input type="text" name="name" value={optionInput.name} onChange={handleChange} placeholder="Decision title" className="w-full mb-2 p-2 border rounded" />
      <div className="flex gap-2 mb-2">
        <input type="number" name="effort" value={optionInput.effort} onChange={handleChange} placeholder="Effort 1-5" min="1" max="5" className="flex-1 p-2 border rounded" />
        <input type="number" name="impact" value={optionInput.impact} onChange={handleChange} placeholder="Impact 1-5" min="1" max="5" className="flex-1 p-2 border rounded" />
        <input type="number" name="urgency" value={optionInput.urgency} onChange={handleChange} placeholder="Urgency 1-5" min="1" max="5" className="flex-1 p-2 border rounded" />
      </div>
      <button onClick={addOption} className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Add Option</button>
    </div>
  );
}
