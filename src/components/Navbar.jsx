"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth() || {};
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Workouts", href: "/workouts" },
    { name: "Diet", href: "/diet" },
    { name: "My Profile", href: "/profile" },
  ];

  // Universal handler that works from ANY page to scroll down smoothly
  const handleAuthClick = (authType) => {
    if (pathname === "/") {
      // If already on home page, change URL query without refreshing and scroll smoothly
      router.push(`/?auth=${authType}`, { scroll: false });
      const element = document.getElementById("auth-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If on another page, navigate to home page with query param
      router.push(`/?auth=${authType}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#030816]/80 backdrop-blur-xl border-b border-sky-950/40 w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Healthycise Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,163,255,0.7)]"
              />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Healthy<span className="text-[#00A3FF]">cise</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#06122C]/70 border border-sky-900/30 p-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-[#00A3FF] text-white font-bold shadow-[0_0_20px_rgba(0,163,255,0.6)]"
                      : "text-slate-400 hover:text-white hover:bg-sky-950/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#06122C] border border-sky-800/40 hover:border-[#00A3FF] transition cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full bg-sky-950"
                  />
                  <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#06122C] border border-sky-900/50 rounded-2xl shadow-2xl p-2 space-y-1 z-50 backdrop-blur-xl">
                    <div className="px-3 py-2 border-b border-sky-900/40">
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        Signed In As
                      </p>
                      <p className="text-xs font-bold text-white truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-sky-950/60 rounded-xl transition"
                    >
                      <FaUser className="text-[#00A3FF]" />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
                    >
                      <FaSignOutAlt />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleAuthClick("login")}
                  className="px-5 py-2 rounded-full bg-[#06122C]/80 border border-sky-900/50 text-xs font-bold text-slate-200 hover:text-white hover:border-[#00A3FF] transition cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleAuthClick("register")}
                  className="px-5 py-2 rounded-full bg-[#00A3FF] text-xs font-bold text-white hover:bg-[#008fdf] transition shadow-[0_0_20px_rgba(0,163,255,0.5)] cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-sky-950/40">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-semibold ${
                pathname === link.href
                  ? "text-[#00A3FF] font-bold"
                  : "text-slate-400"
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
