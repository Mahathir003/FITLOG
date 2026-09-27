"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const context = usePlan();
  const plan = context?.plan || [];
  const savedWorkouts = context?.savedWorkouts || [];

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-zinc-800 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top bar: Logo & Plan/Saved counters */}
        <div className="h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-lime-400 flex items-center justify-center text-zinc-950 shadow-lg shadow-lime-400/20 group-hover:scale-105 transition-transform">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 4h12M6 20h12M12 4v16"
                />
              </svg>
            </div>
            <span className="font-black text-sm sm:text-lg tracking-wider text-white">
              FIT<span className="text-lime-400">LOG</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full bg-zinc-800/80 text-lime-400 font-medium text-sm border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className="px-3 py-1.5 text-zinc-400 hover:text-white font-medium text-sm transition-colors"
            >
              My Plan
            </Link>
          </nav>

          {/* Right Counters */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href="/my-plan"
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-lime-400 text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-lime-300 transition-colors shadow-sm"
            >
              <span>Plan</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-zinc-950 text-lime-400 flex items-center justify-center text-[10px] sm:text-xs font-bold">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 font-semibold text-xs sm:text-sm hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <span>Saved</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center text-[10px] sm:text-xs font-bold border border-zinc-700">
                {savedWorkouts.length}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Sub-bar (Workouts & My Plan buttons) */}
        <div className="flex md:hidden items-center justify-center gap-2 pb-2.5 pt-0.5 border-t border-zinc-900">
          <Link
            href="/"
            className="flex-1 text-center py-1 rounded-full bg-zinc-800/80 text-lime-400 font-semibold text-xs border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className="flex-1 text-center py-1 rounded-full bg-zinc-900 text-zinc-300 font-semibold text-xs border border-zinc-800 hover:text-white transition-colors"
          >
            My Plan
          </Link>
        </div>
      </div>
    </header>
  );
}
