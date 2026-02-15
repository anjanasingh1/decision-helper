import { useState, useEffect } from "react";
import DecisionForm from "./components/DecisionForm";
import OptionList from "./components/OptionList";
import ResultCard from "./components/ResultCard";
import WeeklySuggestions from "./components/WeeklySuggestions";

/* ================================
   Weighted Score Function
================================ */
const getWeightedScore = (opt) =>
  opt.impact * 2 + opt.urgency * 1.5 - opt.effort;

/* ================================
   Get Best Option (Tie Safe)
================================ */
const getBestOption = (options) => {
  if (!options.length) return null;

  const scored = options.map((opt) => ({
    ...opt,
    score: getWeightedScore(opt),
  }));

  const maxScore = Math.max(...scored.map((o) => o.score));
  const topOptions = scored.filter((o) => o.score === maxScore);

  const randomIndex = Math.floor(Math.random() * topOptions.length);
  return topOptions[randomIndex];
};

export default function App() {
  /* ================================
     State
  ================================= */
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("options");
    return saved ? JSON.parse(saved) : [];
  });

  const [recommendedOption, setRecommendedOption] = useState(null);

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak")) || 0;
  });

  const [lastUsedDate, setLastUsedDate] = useState(() => {
    return localStorage.getItem("lastUsedDate") || null;
  });

  /* ================================
     Persist Options
  ================================= */
  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  /* ================================
     Persist Streak
  ================================= */
  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  useEffect(() => {
    if (lastUsedDate) {
      localStorage.setItem("lastUsedDate", lastUsedDate);
    }
  }, [lastUsedDate]);

  /* ================================
     Update Streak Logic
  ================================= */
  const updateStreak = () => {
    const today = new Date().toDateString();

    if (!lastUsedDate) {
      setStreak(1);
      setLastUsedDate(today);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (today === lastUsedDate) {
      // already counted today
      return;
    }

    if (lastUsedDate === yesterday.toDateString()) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1);
    }

    setLastUsedDate(today);
  };

  /* ================================
     Handlers
  ================================= */
  const handleDecide = () => {
    const best = getBestOption(options);
    setRecommendedOption(best);
    updateStreak();
  };

  const handleRandom = () => {
    if (!options.length) return;
    const rand = options[Math.floor(Math.random() * options.length)];
    setRecommendedOption(rand);
    updateStreak();
  };

  /* ================================
     UI
  ================================= */
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">

        <h1 className="text-2xl font-bold mb-2 text-center">
          Decision Helper
        </h1>

        {/* 🔥 STREAK DISPLAY */}
        <div className="text-center mb-4">
          <span className="text-lg font-semibold">
            🔥 Streak: {streak} day{streak !== 1 ? "s" : ""}
          </span>
        </div>

        <DecisionForm options={options} setOptions={setOptions} />

        <div className="flex gap-2 mt-3 mb-4">
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

        <OptionList
          options={options}
          setOptions={setOptions}
          recommendedOption={recommendedOption}
          getWeightedScore={getWeightedScore}
        />

        <ResultCard
          recommendedOption={recommendedOption}
          getWeightedScore={getWeightedScore}
        />

        <WeeklySuggestions
          options={options}
          getWeightedScore={getWeightedScore}
        />

      </div>
    </div>
  );
}
