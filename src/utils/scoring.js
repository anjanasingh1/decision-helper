export function calculateScore(option) {
  const effort = Number(option.effort);
  const impact = Number(option.impact);
  const urgency = Number(option.urgency);

  return (impact * 2) + (urgency * 1.5) - effort;
}

export function getBestOption(options) {
  if (options.length === 0) return null;
  let best = options[0];
  let bestScore = calculateScore(best);

  options.forEach(opt => {
    const score = calculateScore(opt);
    if (score > bestScore) {
      best = opt;
      bestScore = score;
    }
  });

  return best;
}
