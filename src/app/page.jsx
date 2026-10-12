"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { useAuth } from "@/context/AuthContext";
import { FaFire, FaUtensils, FaDumbbell } from "react-icons/fa";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [caloriesIn, setCaloriesIn] = useState(0);

  const { todayPlan = [] } = usePlan() || {};
  const { user } = useAuth() || {};

  // Fetch Workouts Library
  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workouts:", err);
        setLoading(false);
      });
  }, []);

  // Read logged food intake from localStorage
  useEffect(() => {
    try {
      const storedMeals = localStorage.getItem("fitlog_logged_food");
      if (storedMeals) {
        const parsed = JSON.parse(storedMeals);
        const totalIn = parsed.reduce(
          (acc, item) => acc + (Number(item.calories) || 0),
          0,
        );
        setCaloriesIn(Math.round(totalIn));
      }
    } catch (e) {
      console.error("Failed to read meals:", e);
    }
  }, []);

  const muscleGroups = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Core",
    "Arms",
    "Shoulders",
    "Full Body",
  ];

  // Workouts Burned Out
  const totalBurnedCalories = todayPlan.reduce(
    (acc, item) => acc + (Number(item.caloriesBurned) || 0),
    0,
  );

  // BMI Calculation
  const weight = user?.weight || 70;
  const height = user?.height || 175;
  const age = user?.age || 22;
  const gender = user?.gender || "male";

  const heightInMeters = height > 0 ? height / 100 : 1;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  // BMR Calculation (Mifflin-St Jeor)
  const bmr =
    gender === "male"
      ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
      : Math.round(10 * weight + 6.25 * height - 5 * age - 161);

  const filteredWorkouts = workouts.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equipment?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle =
      selectedMuscle === "All" || item.muscleGroups?.includes(selectedMuscle);
    return matchesSearch && matchesMuscle;
  });

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* DAILY CALORIE LEDGER & HEALTH ANALYSIS BANNER */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-[#18181b]/95 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: Heading & Action Shortcuts */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#CCFF00]">
                  Live Physiology & Energy Ledger
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                TODAY&apos;S <span className="text-[#CCFF00]">ANALYSIS</span>
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Monitor your metabolic baseline, track energy intake from meals,
                and review calories burned from your training routine.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#workouts"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CCFF00] text-zinc-950 font-bold text-xs uppercase hover:opacity-90 transition shadow-lg shadow-[#CCFF00]/15"
                >
                  <FaDumbbell />
                  <span>Browse Lifts</span>
                </a>
                <Link
                  href="/diet"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold text-xs uppercase hover:border-[#CCFF00] hover:text-[#CCFF00] transition"
                >
                  <FaUtensils />
                  <span>Log Food & Diet</span>
                </Link>
              </div>
            </div>

            {/* Right: Metrics Grid (Calories In, Calories Out, BMI, BMR) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
              {/* Calories In */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-t-2 border-t-blue-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <FaUtensils className="text-blue-400 text-xs" />
                  Calories In
                </span>
                <div className="my-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {caloriesIn}
                  </span>
                  <span className="text-xs text-zinc-500 ml-1">kcal</span>
                </div>
                <span className="text-[10px] text-zinc-500">From food log</span>
              </div>

              {/* Calories Out */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-t-2 border-t-orange-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <FaFire className="text-orange-500 text-xs" />
                  Calories Out
                </span>
                <div className="my-2">
                  <span className="text-3xl sm:text-4xl font-black text-orange-400">
                    {totalBurnedCalories}
                  </span>
                  <span className="text-xs text-zinc-500 ml-1">kcal</span>
                </div>
                <span className="text-[10px] text-zinc-500">
                  {todayPlan.length} lifts active
                </span>
              </div>

              {/* BMI Card */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-t-2 border-t-[#CCFF00]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Body Mass Index
                </span>
                <div className="my-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#CCFF00]">
                    {bmi}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500">
                  {weight}kg · {height}cm
                </span>
              </div>

              {/* BMR Card */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-t-2 border-t-purple-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Basal BMR
                </span>
                <div className="my-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {bmr}
                  </span>
                  <span className="text-xs text-zinc-500 ml-1">kcal</span>
                </div>
                <span className="text-[10px] text-zinc-500">Resting burn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE WORKOUT LIBRARY SECTION */}
      <section
        id="workouts"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              THE LIBRARY
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Select exercises to add to your plan or bookmark for later.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search exercises or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
          </div>
        </div>

        {/* Muscle Group Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {muscleGroups.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedMuscle === muscle
                  ? "bg-[#CCFF00] text-zinc-950 shadow-md shadow-[#CCFF00]/20 font-bold"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-zinc-900/50 animate-pulse border border-zinc-800/50"
              />
            ))}
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/50">
            <p className="text-zinc-400 text-lg">
              No workouts found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="group bg-[#18181b]/80 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#CCFF00]/50 transition-all duration-300 flex flex-col shadow-xl"
              >
                <div className="relative h-48 overflow-hidden bg-zinc-950">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {workout.muscleGroups?.map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#CCFF00] text-zinc-950 uppercase tracking-wider"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-wide group-hover:text-[#CCFF00] transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mb-4">
                      {workout.equipment || "Bodyweight"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-800/80">
                    <span>⏱️ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span className="text-amber-400 font-semibold">
                      ⭐ {workout.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
