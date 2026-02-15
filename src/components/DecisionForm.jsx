import { useState } from 'react';

export default function DecisionForm({ options, setOptions }) {
  const [optionInput, setOptionInput] = useState({
    name: '',
    effort: '',
    impact: '',
    urgency: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptionInput({ ...optionInput, [name]: value });
  };

  // Add new option
  const addOption = () => {
    if (!optionInput.name) return;

    const effort = Number(optionInput.effort);
    const impact = Number(optionInput.impact);
    const urgency = Number(optionInput.urgency);

    // Validation: scores must be 1–5
    if (
      effort < 1 || effort > 5 ||
      impact < 1 || impact > 5 ||
      urgency < 1 || urgency > 5
    ) {
      alert('Scores must be between 1 and 5');
      return;
    }

    const newOpt = {
      id: Date.now(),
      name: optionInput.name,
      effort,
      impact,
      urgency,
      date: new Date().toISOString()  // <-- date added for streak
    };

    setOptions([...options, newOpt]);
    setOptionInput({ name:'', effort:'', impact:'', urgency:'' });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="font-semibold mb-2">Add a Task / Option</h2>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Task name"
          value={optionInput.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <div className="flex gap-2">
          <input
            type="number"
            name="effort"
            placeholder="Effort (1-5)"
            value={optionInput.effort}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
            min="1"
            max="5"
          />
          <input
            type="number"
            name="impact"
            placeholder="Impact (1-5)"
            value={optionInput.impact}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
            min="1"
            max="5"
          />
          <input
            type="number"
            name="urgency"
            placeholder="Urgency (1-5)"
            value={optionInput.urgency}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
            min="1"
            max="5"
          />
        </div>

        <button
          onClick={addOption}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-2"
        >
          Add Option
        </button>
      </div>
    </div>
  );
}
