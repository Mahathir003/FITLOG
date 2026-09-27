"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { CgGym } from "react-icons/cg";
import {
  FaBookmark,
  FaPlus,
  FaArrowLeft,
  FaClock,
  FaFire,
  FaStar,
  FaCheck,
} from "react-icons/fa";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { todayPlan, savedList, addToTodayPlan, addToSaved } = usePlan();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workout details");
        return res.json();
      })
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-400">
        <div className="animate-pulse space-y-4 max-w-xl mx-auto">
          <div className="h-64 bg-neutral-900 rounded-2xl"></div>
          <div className="h-8 bg-neutral-900 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-neutral-900 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-400">Workout Not Found</h2>
        <p className="text-neutral-400">
          {error || "The requested workout does not exist."}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-[#CCFF00] text-neutral-950 font-bold rounded-xl"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  const isAlreadyInPlan = todayPlan.some((item) => item.id === workout.id);
  const isAlreadySaved = savedList.some((item) => item.id === workout.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#CCFF00] transition-colors"
      >
        <FaArrowLeft />
        <span>Back to Workouts</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Side: Visual / Media */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl relative h-[400px] sm:h-[500px]">
          {workout.image ? (
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-700">
              <CgGym className="text-6xl" />
            </div>
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {Array.isArray(workout.category) ? (
                workout.category.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-bold text-[#CCFF00] uppercase"
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-bold text-[#CCFF00] uppercase">
                  {workout.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-100">
              {workout.name}
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {workout.description ||
                "A professional compound movement designed to build strength, endurance, and target key muscle groups effectively."}
            </p>
          </div>

          {/* Key Specs Table / Panel */}
          <div className="bg-neutral-900/80 rounded-2xl border border-neutral-800 overflow-hidden divide-y divide-neutral-800 text-sm">
            <div className="flex justify-between px-5 py-3">
              <span className="text-neutral-400 font-medium">EQUIPMENT</span>
              <span className="font-semibold text-neutral-200">
                {workout.equipment || "None"}
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-neutral-400 font-medium">DIFFICULTY</span>
              <span className="font-semibold text-neutral-200">
                {workout.difficulty || "Intermediate"}
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-neutral-400 font-medium">SETS</span>
              <span className="font-semibold text-neutral-200">
                {workout.sets || "3"}
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-neutral-400 font-medium">REPS</span>
              <span className="font-semibold text-neutral-200">
                {workout.reps || "8-12"}
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-neutral-400 font-medium">DURATION</span>
              <span className="font-semibold text-neutral-200">
                {workout.duration} min
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-neutral-400 font-medium">CALORIES</span>
              <span className="font-semibold text-neutral-200">
                {workout.caloriesBurned} kcal
              </span>
            </div>
            <div className="flex justify-between px-5 py-3">
              <span className="text-neutral-400 font-medium">RATING</span>
              <span className="font-semibold text-neutral-200 flex items-center gap-1">
                <FaStar className="text-yellow-500 text-xs" /> {workout.rating}
              </span>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-sm text-neutral-300">
              Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-400 leading-relaxed">
              {workout.instructions && Array.isArray(workout.instructions) ? (
                workout.instructions.map((step, idx) => (
                  <li key={idx}>
                    <span className="text-neutral-200">{step}</span>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <span className="text-neutral-200">
                      Position yourself correctly on the equipment or mat with
                      stable form.
                    </span>
                  </li>
                  <li>
                    <span className="text-neutral-200">
                      Engage core muscles and execute the movement with
                      controlled tempo.
                    </span>
                  </li>
                  <li>
                    <span className="text-neutral-200">
                      Maintain smooth breathing through the concentric and
                      eccentric phases.
                    </span>
                  </li>
                  <li>
                    <span className="text-neutral-200">
                      Complete the prescribed reps and rest before the next set.
                    </span>
                  </li>
                </>
              )}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => addToTodayPlan(workout)}
              disabled={isAlreadyInPlan}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition shadow-lg ${
                isAlreadyInPlan
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : "bg-[#CCFF00] text-neutral-950 hover:opacity-90 shadow-[#CCFF00]/10"
              }`}
            >
              {isAlreadyInPlan ? <FaCheck /> : <FaPlus />}
              <span>
                {isAlreadyInPlan
                  ? "Added to Today's Plan"
                  : "Add to today's plan"}
              </span>
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={isAlreadySaved}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-bold transition ${
                isAlreadySaved
                  ? "border-neutral-800 text-neutral-600 cursor-not-allowed bg-neutral-900/50"
                  : "border-neutral-700 text-neutral-200 hover:border-[#CCFF00] hover:text-[#CCFF00] bg-neutral-900"
              }`}
            >
              <FaBookmark />
              <span>{isAlreadySaved ? "Saved" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
