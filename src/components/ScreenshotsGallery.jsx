export default function ScreenshotsGallery() {
  const screenshots = [
    { src: '/screenshots/decision_helper_front_page_1.png', alt: 'UI Front Page' },
    { src: '/screenshots/decision_helper_weighted_score_and_adding_tasks_2.png', alt: 'Add Tasks & Weighted Score' },
    { src: '/screenshots/decision_helper_weekly_suggestions_3.png', alt: 'Weekly Suggestions' },
    { src: '/screenshots/decision_helper_streak_4.png', alt: 'Streak Tracker' },
    { src: '/screenshots/decision_random_score_5.png', alt: 'Random Mode' },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2 text-center">Screenshots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {screenshots.map((shot, index) => (
          <div
            key={index}
            className="border rounded shadow p-2 bg-white"
          >
            <img src={shot.src} alt={shot.alt} className="w-full h-auto" />
            <p className="text-sm mt-1 text-center">{shot.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
