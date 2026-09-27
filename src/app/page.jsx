"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");

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

  const filteredWorkouts = workouts.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle =
      selectedMuscle === "All" || item.muscleGroups?.includes(selectedMuscle);
    return matchesSearch && matchesMuscle;
  });

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section Container Box */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-[#18181b]/90 border border-zinc-800/80 rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="max-w-xl">
            <span className="text-lime-400 text-xs font-bold tracking-widest uppercase block mb-3">
              Workout Library
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 uppercase leading-tight">
              Train with intent. Log every set.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mb-8 leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#workouts"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-lime-400 text-zinc-950 font-bold text-sm hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/25"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right Banner Image from Public Folder */}
          <div className="relative w-full max-w-sm lg:max-w-md aspect-square flex items-center justify-center overflow-hidden rounded-2xl">
            <img
              src="/banner.png"
              alt="FitLog Banner"
              className="w-full h-full object-cover rounded-2xl opacity-90 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* The Library Section */}
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
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search exercises or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-lime-400 transition-colors"
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
                  ? "bg-lime-400 text-zinc-950 shadow-md shadow-lime-400/20"
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
                className="group bg-[#18181b]/80 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-lime-400/50 transition-all duration-300 flex flex-col shadow-xl"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden bg-zinc-950">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Lime Muscle Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {workout.muscleGroups?.map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-lime-400 text-zinc-950 uppercase tracking-wider"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-wide group-hover:text-lime-400 transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mb-4">
                      {workout.equipment}
                    </p>
                  </div>

                  {/* Footer Stats */}
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
