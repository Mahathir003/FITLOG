# 🏋️‍♂️ Fit Log – Workout Library & Planning Web Application

Fit Log is a sleek, dark-themed fitness companion web application built using **Next.js (App Router)** and **Tailwind CSS**. It allows users to browse a dynamic library of workouts, manage a daily fitness plan, track completion status, calculate aggregate workout metrics, and store data persistently.

---

## ✨ Features & Requirements Met

- **Dynamic Workout Library:** Fetches live data from the API endpoint to display a responsive grid of exercises with category tags, duration, calories burned, and ratings.
- **Dynamic Routing Details Pages (`/workouts/[id]`):** Detailed views for individual lifts featuring complete specifications (equipment, difficulty, sets, reps) and step-by-step instructions.
- **Interactive Planning (`/my-plan`):** Add lifts to Today's Plan (capped at 5 for focus) or save them for later. Features live summary metrics (_Exercises, Total Minutes, Total Calories_), tab switching, sorting options (_Duration, Calories, Rating_), and completion toggles.
- **State Persistence:** Uses React's Context API combined with `Browser localStorage` so your workouts and plan persist across page reloads.
- **Custom 404 Error Page:** A custom error view matching the dark neon-green theme for invalid routes.
- **Notifications & UI Polish:** Integrated with `react-hot-toast` for action feedback and `react-icons` for modern UI elements.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS (v4)
- **Icons:** React Icons
- **Notifications:** React Hot Toast
- **State Management:** React Context API & LocalStorage

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd FITLOG
   ```
