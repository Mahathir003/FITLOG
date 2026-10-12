"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CgGym } from "react-icons/cg";
import {
  FaClock,
  FaFire,
  FaStar,
  FaCheck,
  FaTrash,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";
import { usePlan } from "@/context/PlanContext";

function MyPlanContent() {
  const {
    todayPlan = [],
    savedList = [],
    addToTodayPlan,
    removeFromTodayPlan,
    removeFromSaved,
    toggleComplete,
  } = usePlan() || {};

  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam === "saved" ? "saved" : "today",
  );
  const [sortBy, setSortBy] = useState("duration");

  // Keep active tab in sync when clicking Navbar links (?tab=saved or /my-plan)
  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("today");
    }
  }, [tabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newUrl = tab === "saved" ? "/my-plan?tab=saved" : "/my-plan";
    window.history.replaceState(null, "", newUrl);
  };

  const currentList = activeTab === "today" ? todayPlan : savedList;

  // Calculate Summary Metrics for Today's Plan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, item) => acc + (Number(item.duration) || 0),
    0,
  );
  const totalCalories = todayPlan.reduce(
    (acc, item) => acc + (Number(item.caloriesBurned) || 0),
    0,
  );

  // Sorting logic
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return Number(b.duration) - Number(a.duration);
    if (sortBy === "calories")
      return Number(b.caloriesBurned) - Number(a.caloriesBurned);
    if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-1">
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            Exercises
          </p>
          <p className="text-4xl font-black text-[#CCFF00]">{totalExercises}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-1">
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            Minutes
          </p>
          <p className="text-4xl font-black text-neutral-100">{totalMinutes}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-1">
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            Calories
          </p>
          <p className="text-4xl font-black text-orange-500">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs & Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTabChange("today")}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === "today"
                ? "bg-[#CCFF00] text-neutral-950"
                : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            Today's Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => handleTabChange("saved")}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === "saved"
                ? "bg-[#CCFF00] text-neutral-950"
                : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-neutral-200 font-medium focus:outline-none focus:border-[#CCFF00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {sortedList.length === 0 && (
        <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-16 text-center space-y-4">
          <h3 className="text-xl font-bold uppercase tracking-wider text-neutral-200">
            NOTHING HERE YET
          </h3>
          <p className="text-neutral-400 text-sm max-w-sm mx-auto">
            {activeTab === "today"
              ? "Browse the library and add a lift to get today moving."
              : "No saved workouts yet. Bookmark workouts to do later."}
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] text-neutral-950 font-bold transition hover:opacity-90"
            >
              <span>Go to workouts</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      )}

      {/* Workout Cards List */}
      <div className="space-y-4">
        {sortedList.map((item) => {
          const isItemInTodayPlan = todayPlan.some((p) => p.id === item.id);

          return (
            <div
              key={item.id}
              className={`bg-neutral-900 border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-6 transition ${
                item.isCompleted
                  ? "border-green-500/40 bg-neutral-900/60 opacity-80"
                  : "border-neutral-800"
              }`}
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-24 h-20 bg-neutral-950 rounded-xl overflow-hidden flex-shrink-0 relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                      <CgGym className="text-2xl" />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h4
                    className={`font-bold uppercase text-lg ${
                      item.isCompleted
                        ? "line-through text-neutral-400"
                        : "text-neutral-100"
                    }`}
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {item.equipment || "Bodyweight"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
                    <span className="flex items-center gap-1">
                      <FaClock className="text-neutral-500" /> {item.duration}{" "}
                      min
                    </span>
                    <span className="flex items-center gap-1">
                      <FaFire className="text-orange-500" />{" "}
                      {item.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" /> {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  href={`/workouts/${item.id}`}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition"
                >
                  View Details
                </Link>

                {activeTab === "today" ? (
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                      item.isCompleted
                        ? "bg-green-500 text-neutral-950"
                        : "bg-[#CCFF00] text-neutral-950 hover:opacity-90"
                    }`}
                  >
                    <FaCheck />
                    <span>
                      {item.isCompleted ? "Completed" : "Mark as Done"}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => addToTodayPlan(item)}
                    disabled={isItemInTodayPlan}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                      isItemInTodayPlan
                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                        : "bg-[#CCFF00] text-neutral-950 hover:opacity-90"
                    }`}
                  >
                    {isItemInTodayPlan ? <FaCheck /> : <FaPlus />}
                    <span>
                      {isItemInTodayPlan ? "In Today's Plan" : "Add to Today"}
                    </span>
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromTodayPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="p-2.5 rounded-xl bg-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 transition"
                  title="Remove"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-400">
          <div className="animate-pulse space-y-4 max-w-xl mx-auto">
            <div className="h-8 bg-neutral-900 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-neutral-900 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}
