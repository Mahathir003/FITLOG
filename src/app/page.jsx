"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaClock, FaFire, FaStar, FaArrowRight } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workouts");
        return res.json();
      })
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const scrollToLibrary = () => {
    const section = document.getElementById("library");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 border-b border-neutral-800">
        <div className="max-w-2xl space-y-6">
          <span className="text-[#CCFF00] font-mono tracking-widest text-xs uppercase bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-none">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <div>
            <button
              onClick={scrollToLibrary}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#CCFF00] text-neutral-950 font-bold transition hover:opacity-90 shadow-lg shadow-[#CCFF00]/10"
            >
              <span>BROWSE WORKOUTS</span>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Hero Illustration / Banner Image */}
        {/* Hero Illustration / Banner Image */}
        <div className="relative w-full lg:w-[450px] h-[350px] sm:h-[420px] flex items-center justify-center">
          <Image
            src="/banner.png"
            alt="Workout Banner"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </section>

      {/* Library Section */}
      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider">
            THE LIBRARY
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-neutral-900/50 rounded-2xl border border-neutral-800 animate-pulse flex flex-col justify-end p-6"
              >
                <div className="h-4 bg-neutral-800 rounded w-1/3 mb-3"></div>
                <div className="h-6 bg-neutral-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-950/40 border border-red-900/50 rounded-xl text-red-400 text-center">
            Error loading workouts: {error}. Please check your connection.
          </div>
        )}

        {/* Workout Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="group bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden transition-all duration-300 hover:border-[#CCFF00]/50 hover:shadow-xl hover:shadow-[#CCFF00]/5 flex flex-col"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full bg-neutral-950 overflow-hidden">
                  {workout.image ? (
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                      <CgGym className="text-4xl" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {Array.isArray(workout.category) ? (
                      workout.category.map((cat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur text-[10px] font-bold text-[#CCFF00] uppercase tracking-wider"
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur text-[10px] font-bold text-[#CCFF00] uppercase tracking-wider">
                        {workout.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-neutral-100 group-hover:text-[#CCFF00] transition-colors uppercase">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {workout.equipment || "Bodyweight"}
                    </p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs text-neutral-400">
                    <div className="flex items-center gap-1">
                      <FaClock className="text-neutral-500" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaFire className="text-orange-500" />
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
