"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedList } = usePlan();

  return (
    <header className="border-b border-neutral-800 bg-[#121212]/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-100 font-bold text-xl tracking-wider"
        >
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span>FITLOG</span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-[#CCFF00] ${
              pathname === "/" ? "text-[#CCFF00]" : "text-neutral-400"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`transition-colors hover:text-[#CCFF00] ${
              pathname === "/my-plan" ? "text-[#CCFF00]" : "text-neutral-400"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Status Badges */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CCFF00] text-neutral-950 transition hover:opacity-90"
          >
            <span>Plan</span>
            <span className="w-5 h-5 bg-neutral-950 text-[#CCFF00] rounded-full flex items-center justify-center text-[10px]">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-700 text-neutral-300 transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
          >
            <span>Saved</span>
            <span className="w-5 h-5 bg-neutral-800 text-neutral-200 rounded-full flex items-center justify-center text-[10px]">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
