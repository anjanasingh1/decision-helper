Problem Statement: People often struggle to decide which tasks to do first when everything feels important.

Solution: Decision Helper solves this by giving clear recommendations using a simple weighted scoring system and tracking daily engagement.

Features:
Add tasks/options with Effort, Impact, Urgency scores
Get AI-inspired recommendation of what to do next
Random mode for exploring other options
Track your daily streak (productivity motivation)
Weekly suggestions based on tasks added in the last 7 days
Persist your tasks in localStorage

Formula: Score = (Impact × 3) + (Urgency × 1.5) − Effort. Higher Impact + Urgency is better, Effort subtracts from score.

How to Run Locally

# Clone repo: git clone https://github.com/anjanasingh1/decision-helper

# Enter project folder: cd decision-helper

# Install dependencies npm install

# Start development server npm run dev

# App will run at: http://localhost:5173

Live Demo link: https://decision-helper-2026.vercel.app/
Screenshots

1. UI Front Page
2. Adding Tasks & Weighted Score Result
3. Weekly Recommendations
4. Streak Tracker
5. Random Mode
