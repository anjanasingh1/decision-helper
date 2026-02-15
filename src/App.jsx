import { useState, useEffect } from 'react';
import DecisionForm from './components/DecisionForm.jsx';
import OptionList from './components/OptionList.jsx';
import ResultCard from './components/ResultCard.jsx';
import WeeklySuggestions from './components/WeeklySuggestions.jsx';
import ScreenshotsGallery from './components/ScreenshotsGallery.jsx';

// Weighted score calculation
const getWeightedScore = (option) =>
  option.impact * 2 + option.urgency * 1.5 - option.effort;

// Get best option by weighted score
const getBestOption = (options) => {
  if (!options.length) return null;
  return options.reduce((best, current) =>
    getWeightedScore(current) > getWeightedScore(best) ? current : best
  , options[0]);
};

export default function App() {
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem('options');
    return saved ? JSON.parse(saved) : [];
  });

  const [recommendedOption, setRecommendedOption] = useState(() =>
    getBestOption(JSON.parse(localStorage.getItem('options') || '[]'))
  );

  // Last 7 days options
  const last7DaysOptions = options.filter((opt) => {
    if (!opt.date) return false;
    const optDate = new Date(opt.date);
    const today = new Date();
    const diff = (today - optDate) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });

  // Persist options + recalc recommended if deleted
  useEffect(() => {
    localStorage.setItem('options', JSON.stringify(options));
    if (
      recommendedOption &&
      !options.find((opt) => opt.id === recommendedOption.id)
    ) {
      setRecommendedOption(getBestOption(options));
    }
  }, [options]);

  const handleDecide = () => setRecommendedOption(getBestOption(options));

  const handleRandom = () => {
    if (!options.length) return;
    const rand = options[Math.floor(Math.random() * options.length)];
    setRecommendedOption(rand);
  };

  // Streak tracker
  const computeStreak = (options) => {
    if (!options.length) return 0;

    const dates = Array.from(
      new Set(options.map((opt) => opt.date.split('T')[0]))
    ).sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let dateStr of dates) {
      const optDate = new Date(dateStr);
      optDate.setHours(0, 0, 0, 0);

      if (+optDate === +today) {
        streak++;
        today.setDate(today.getDate() - 1);
      } else if (+optDate < +today) {
        break;
      }
    }

    return streak;
  };

  const streak = computeStreak(options);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-center">Decision Helper</h1>

        {/* Streak Display */}
        {streak > 0 && (
          <p className="text-center text-yellow-600 font-semibold mb-4">
            🔥 Decision Streak: {streak} {streak === 1 ? 'day' : 'days'}
          </p>
        )}

        {/* Add Option Form */}
        <DecisionForm options={options} setOptions={setOptions} />

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2 mb-4">
          <button
            onClick={handleDecide}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          >
            Help Me Decide
          </button>
          <button
            onClick={handleRandom}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded"
          >
            Random Mode
          </button>
        </div>

        {/* Options List */}
        <OptionList
          options={options}
          setOptions={setOptions}
          recommendedOption={recommendedOption}
          getWeightedScore={getWeightedScore}
        />

        {/* Recommended Result */}
        <ResultCard
          recommendedOption={recommendedOption}
          getWeightedScore={getWeightedScore}
        />

        {/* Weekly Suggestions */}
        <WeeklySuggestions
          options={last7DaysOptions}
          getWeightedScore={getWeightedScore} // <-- pass weighted score
        />

        {/* Screenshots Gallery */}
        <ScreenshotsGallery />
      </div>
    </div>
  );
}
