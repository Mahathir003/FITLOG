"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { useAuth } from "@/context/AuthContext";
import { FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { todayPlan = [], savedList = [] } = usePlan() || {};
  const { user, logout } = useAuth() || {};
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { name: "Workouts", href: "/" },
    { name: "Diet", href: "/diet" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-zinc-800 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#CCFF00] flex items-center justify-center text-zinc-950 shadow-lg shadow-[#CCFF00]/20 group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5"
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
            <span className="font-black text-lg tracking-wider text-white">
              FIT<span className="text-[#CCFF00]">LOG</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 border border-zinc-800/80 p-1 rounded-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition ${
                    isActive
                      ? "bg-[#CCFF00] text-zinc-950 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Counters + Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Plan Badge */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-xs hover:border-[#CCFF00] transition"
            >
              <span>Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#CCFF00] text-zinc-950 flex items-center justify-center text-[10px] font-black">
                {todayPlan.length}
              </span>
            </Link>

            {/* Saved Badge */}
            <Link
              href="/my-plan?tab=saved"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-xs hover:border-[#CCFF00] transition"
            >
              <span>Saved</span>
              <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[10px] font-bold border border-zinc-700">
                {savedList.length}
              </span>
            </Link>

            {/* User Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#CCFF00] transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full bg-zinc-800"
                  />
                  <span className="text-xs font-bold text-white max-w-[90px] truncate">
                    {user.name}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50">
                    <div className="px-3 py-2 border-b border-zinc-800">
                      <p className="text-[10px] uppercase font-bold text-zinc-500">
                        Signed in as
                      </p>
                      <p className="text-xs font-bold text-white truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* My Profile Link (Above Logout) */}
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-xl transition"
                    >
                      <FaUser className="text-[#CCFF00]" />
                      <span>My Profile</span>
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:bg-zinc-800 rounded-xl transition"
                    >
                      <FaSignOutAlt />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#CCFF00] text-zinc-950 font-bold text-xs hover:opacity-90 transition shadow-sm"
              >
                <FaUserCircle className="text-sm" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-900">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-bold uppercase ${
                pathname === link.href ? "text-[#CCFF00]" : "text-zinc-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
