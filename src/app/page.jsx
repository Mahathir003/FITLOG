"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaUtensils,
  FaDumbbell,
  FaChartLine,
  FaUser,
  FaArrowRight,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaFire,
  FaWeight,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";

function HomeContent() {
  const { user, login, register } = useAuth() || {};
  const searchParams = useSearchParams();
  const authParam = searchParams.get("auth");

  const [authMode, setAuthMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Automatically scroll & switch tab if ?auth=login or ?auth=register is present
  useEffect(() => {
    if (!user && (authParam === "login" || authParam === "register")) {
      setAuthMode(authParam);
      const timer = setTimeout(() => {
        const element = document.getElementById("auth-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [authParam, user]);

  const scrollToAuth = (mode = "login") => {
    setAuthMode(mode);
    const element = document.getElementById("auth-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    register(username.trim(), email.trim());
  };

  // ==========================================
  // VIEW 1: POST-LOGIN FITNESS DASHBOARD
  // ==========================================
  if (user) {
    const userName = user.name || "Mahathir";
    const currentBmi = "21.5";
    const currentBmr = "1,620";

    return (
      <main className="min-h-screen bg-[#030816] text-white px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Greeting & Motivational Banner */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Greeting Card */}
          <div className="lg:col-span-7 bg-[#05112B]/90 border border-sky-800/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,163,255,0.15)] backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none hidden sm:block">
              <div className="w-full h-full bg-gradient-to-l from-[#00A3FF]/20 to-transparent" />
            </div>
            <div className="space-y-3 relative z-10">
              <p className="text-xs text-slate-400 font-medium">
                Good Morning,
              </p>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {userName} 👋
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md">
                Stay consistent. Your goals are closer than you think.
              </p>
            </div>
            <div className="pt-6 relative z-10 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#03091B] border border-sky-900 text-xs text-slate-300">
                <FaCalendarAlt className="text-[#00A3FF]" />
                <span>Thu, Oct 16, 2025</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Cards (Calories Consumed, Burned, Balance) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            {/* Calories Consumed */}
            <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-4 flex flex-col justify-between backdrop-blur-xl">
              <div className="w-8 h-8 rounded-xl bg-[#061536] border border-sky-800/40 flex items-center justify-center text-[#00A3FF]">
                <FaFire />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Consumed
                </p>
                <p className="text-lg font-black text-white">1,245</p>
                <p className="text-[9px] text-slate-500">/ 2,000 kcal</p>
              </div>
              <div className="h-1.5 w-full bg-sky-950 rounded-full overflow-hidden">
                <div className="h-full bg-[#00A3FF] w-[62%]" />
              </div>
            </div>

            {/* Calories Burned */}
            <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-4 flex flex-col justify-between backdrop-blur-xl">
              <div className="w-8 h-8 rounded-xl bg-[#061536] border border-sky-800/40 flex items-center justify-center text-[#00A3FF]">
                <FaDumbbell />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Burned
                </p>
                <p className="text-lg font-black text-white">620</p>
                <p className="text-[9px] text-slate-500">/ 1,000 kcal</p>
              </div>
              <div className="h-1.5 w-full bg-sky-950 rounded-full overflow-hidden">
                <div className="h-full bg-[#00A3FF] w-[62%]" />
              </div>
            </div>

            {/* Calorie Balance */}
            <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-4 flex flex-col justify-between backdrop-blur-xl">
              <div className="w-8 h-8 rounded-xl bg-[#061536] border border-sky-800/40 flex items-center justify-center text-[#00A3FF]">
                <FaWeight />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Balance
                </p>
                <p className="text-lg font-black text-emerald-400">+625</p>
                <p className="text-[9px] text-slate-500">kcal net</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-400">
                Optimal
              </span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Middle Section */}
          <div className="lg:col-span-8 space-y-8">
            {/* Weekly Calorie Overview & Distribution Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Calorie Overview Bar Chart Card */}
              <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                    Weekly Calorie Overview
                  </h3>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-[#00A3FF]" />{" "}
                      Consumed
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-sky-600" />{" "}
                      Burned
                    </span>
                  </div>
                </div>
                {/* Simplified visual bar preview */}
                <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2 border-b border-sky-950">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day, i) => (
                      <div
                        key={day}
                        className="flex flex-col items-center gap-1 flex-1"
                      >
                        <div className="w-full flex items-end justify-center gap-1 h-32">
                          <div
                            className="w-2.5 bg-[#00A3FF] rounded-t"
                            style={{ height: `${60 + i * 5}%` }}
                          />
                          <div
                            className="w-2.5 bg-sky-600/70 rounded-t"
                            style={{ height: `${40 + i * 4}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {day}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Weekly Calorie Distribution */}
              <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-6 backdrop-blur-xl space-y-4 flex flex-col justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                  Weekly Calorie Distribution
                </h3>
                <div className="flex items-center justify-around py-4">
                  <div className="relative w-32 h-32 rounded-full border-8 border-[#00A3FF] border-t-sky-900 border-r-sky-700 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-slate-400 uppercase">
                      Total Intake
                    </span>
                    <span className="text-sm font-black text-white">
                      8,735 kcal
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#00A3FF]" />
                      <span className="text-slate-300">Carbs (52%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-sky-400" />
                      <span className="text-slate-300">Protein (24%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-500" />
                      <span className="text-slate-300">Fat (24%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BMI & BMR + Recent Workouts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BMI & BMR Card */}
              <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                    BMI & BMR
                  </h3>
                  <Link
                    href="/profile"
                    className="text-xs text-[#00A3FF] font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#03091B] p-4 rounded-2xl border border-sky-950 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      BMI
                    </span>
                    <p className="text-2xl font-black text-white">
                      {currentBmi}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                      Normal
                    </span>
                  </div>
                  <div className="bg-[#03091B] p-4 rounded-2xl border border-sky-950 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      BMR
                    </span>
                    <p className="text-xl font-black text-white">
                      {currentBmr}
                    </p>
                    <span className="text-[10px] text-slate-400">kcal/day</span>
                  </div>
                </div>
              </div>

              {/* Recent Workouts */}
              <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                    Recent Workouts
                  </h3>
                  <Link
                    href="/workouts"
                    className="text-xs text-[#00A3FF] font-semibold hover:underline"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs bg-[#03091B] p-3 rounded-xl border border-sky-950">
                    <div>
                      <p className="font-bold text-white">Full Body Workout</p>
                      <p className="text-[10px] text-slate-400">
                        Today • 45 min
                      </p>
                    </div>
                    <span className="font-black text-[#00A3FF]">320 kcal</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-[#03091B] p-3 rounded-xl border border-sky-950">
                    <div>
                      <p className="font-bold text-white">HIIT Session</p>
                      <p className="text-[10px] text-slate-400">
                        Yesterday • 20 min
                      </p>
                    </div>
                    <span className="font-black text-[#00A3FF]">280 kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workout Analysis & Your Progress (BMI Graph) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Workout Analysis */}
            <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                  Workout Analysis
                </h3>
                <Link
                  href="/workouts"
                  className="text-xs text-[#00A3FF] font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>
              <div className="bg-[#03091B] p-4 rounded-2xl border border-sky-950 space-y-2">
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Total Calories Burned (This Week)
                </p>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black text-white">
                    4,340 kcal
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    ↑ 12%
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-sky-950">
                  <span className="text-slate-400">Most Burned</span>
                  <span className="font-bold text-white">
                    Running (420 kcal)
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-sky-950">
                  <span className="text-slate-400">Avg per Workout</span>
                  <span className="font-bold text-white">312 kcal</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Total Workout Time</span>
                  <span className="font-bold text-white">7h 45m</span>
                </div>
              </div>
            </div>

            {/* Your Progress — BMI Graph Card */}
            <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                  Your Progress — BMI
                </h3>
                <Link
                  href="/profile"
                  className="text-xs text-[#00A3FF] font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                Average Monthly Body Mass Index
              </p>

              {/* SVG Line Graph */}
              <div className="relative h-40 w-full pt-2">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 300 120"
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="dashBmiGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#00A3FF"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="#00A3FF"
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 15 25 Q 70 40 120 55 T 225 80 T 285 95 L 285 120 L 15 120 Z"
                    fill="url(#dashBmiGrad)"
                  />
                  <path
                    d="M 15 25 Q 70 40 120 55 T 225 80 T 285 95"
                    stroke="#00A3FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {[
                    { x: 15, y: 25, val: "25.2" },
                    { x: 72, y: 40, val: "24.5" },
                    { x: 120, y: 55, val: "23.8" },
                    { x: 172, y: 68, val: "23.2" },
                    { x: 225, y: 80, val: "22.4" },
                    { x: 285, y: 95, val: currentBmi },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill="#030816"
                      stroke="#00A3FF"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
                <div className="absolute inset-x-0 bottom-[-10px] flex justify-between text-[10px] font-mono text-slate-400 px-1">
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-sky-950">
                <div className="bg-[#03091B] p-2.5 rounded-xl border border-sky-950">
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Current BMI
                  </span>
                  <p className="font-black text-white text-base">
                    {currentBmi}
                  </p>
                </div>
                <div className="bg-[#03091B] p-2.5 rounded-xl border border-sky-950">
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Change
                  </span>
                  <p className="font-bold text-emerald-400 text-xs flex items-center gap-1">
                    -2.8 ↓
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // VIEW 2: PRE-LOGIN LANDING PAGE
  // ==========================================
  const features = [
    {
      icon: <FaUtensils className="text-[#00A3FF] text-lg" />,
      title: "Track Your Food",
      desc: "Choose ingredients, enter weights, and see the calories you consume.",
      link: "/diet",
    },
    {
      icon: <FaDumbbell className="text-[#00A3FF] text-lg" />,
      title: "Plan Your Workouts",
      desc: "Pick workouts for today and tomorrow, and watch calories burn.",
      link: "/workouts",
    },
    {
      icon: <FaChartLine className="text-[#00A3FF] text-lg" />,
      title: "See Your Progress",
      desc: "Get weekly analysis and track your steady physiological improvement.",
      link: "#auth-section",
      onClick: () => scrollToAuth("login"),
    },
    {
      icon: <FaUser className="text-[#00A3FF] text-lg" />,
      title: "Manage Your Profile",
      desc: "Update your measurements, track BMI, BMR, and monthly weight changes.",
      link: "/profile",
    },
  ];

  return (
    <main className="min-h-screen bg-[#030816] text-white flex flex-col justify-between overflow-x-hidden">
      {/* FULL-WIDTH HERO BANNER SECTION */}
      <section className="relative w-full min-h-[640px] sm:min-h-[720px] flex items-center overflow-hidden bg-[#030816]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-banner.JPG"
            alt="Healthycise Hero Athlete"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030816] via-[#030816]/90 to-transparent sm:via-[#030816]/70 lg:to-transparent" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030816] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030816] to-transparent" />
        </div>

        <div className="hidden lg:block absolute top-12 right-16 sm:right-24 z-10 pointer-events-none select-none">
          <p className="font-serif italic text-xl text-[#00A3FF] tracking-wide rotate-[6deg] drop-shadow-[0_0_12px_rgba(0,163,255,0.5)]">
            Better Choices <br />
            <span className="text-sky-200">Bigger Results</span>
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-2xl space-y-6">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#00A3FF] font-semibold block">
              TRACK · EAT · WORKOUT · IMPROVE
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
              Your Health. <br />
              <span className="text-[#00A3FF] drop-shadow-[0_0_35px_rgba(0,163,255,0.6)]">
                Our Priority.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Track your calories, plan your meals, choose your workouts, and
              reach your fitness goals — all in one unified place.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => scrollToAuth("register")}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00A3FF] text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[#008fe3] hover:scale-105 shadow-[0_0_30px_rgba(0,163,255,0.55)] group cursor-pointer"
              >
                <span>Get Started</span>
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 FEATURE PILLARS */}
      <section className="border-t border-sky-950/60 bg-[#040C1F]/60 backdrop-blur-md py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                onClick={item.onClick}
                className="group flex flex-col items-center text-center space-y-3 p-4 rounded-2xl hover:bg-sky-950/35 transition-all duration-200 border border-transparent hover:border-sky-900/30 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#061536] border border-sky-800/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,163,255,0.2)] group-hover:scale-110 group-hover:border-[#00A3FF] transition-all">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider group-hover:text-[#00A3FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMBEDDED AUTH SECTION (SCROLL TARGET) */}
      <section
        id="auth-section"
        className="py-20 px-4 sm:px-6 lg:px-8 relative flex justify-center items-center bg-gradient-to-b from-[#030816] to-[#05112B]"
      >
        <div className="absolute w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#05112B]/90 border border-sky-800/40 rounded-3xl p-8 sm:p-10 shadow-[0_0_60px_rgba(0,163,255,0.2)] backdrop-blur-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <img
                src="/logo.png"
                alt="Healthycise Logo"
                width={42}
                height={42}
                className="object-contain drop-shadow-[0_0_12px_rgba(0,163,255,0.8)]"
              />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Healthy<span className="text-[#00A3FF]">cise</span>
            </h2>
            <p className="text-slate-400 text-xs">
              {authMode === "login"
                ? "Welcome back! Log in to continue your journey."
                : "Create your account to start tracking today."}
            </p>
          </div>

          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#03091B] border border-sky-950">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                authMode === "login"
                  ? "bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                authMode === "register"
                  ? "bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {authMode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 text-xs transition cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#03091B] border-sky-950 text-[#00A3FF] focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-[11px]">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00A3FF] text-white font-bold text-xs uppercase tracking-wide hover:bg-[#008fe3] transition shadow-[0_0_25px_rgba(0,163,255,0.45)] cursor-pointer"
              >
                <span>Sign In</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="athlete@gmail.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min. 6 chars)"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00A3FF] text-white font-bold text-xs uppercase tracking-wide hover:bg-[#008fe3] transition shadow-[0_0_25px_rgba(0,163,255,0.45)] cursor-pointer"
              >
                <span>Create Account</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </form>
          )}

          <div className="relative flex items-center justify-center pt-2">
            <div className="border-t border-sky-950 w-full" />
            <span className="bg-[#05112B] px-3 text-[10px] uppercase font-bold text-slate-500 relative">
              OR
            </span>
          </div>

          <button
            type="button"
            onClick={() => login("google.user@gmail.com", "password")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#03091B] border border-sky-950 hover:border-[#00A3FF] text-xs font-bold text-slate-200 transition cursor-pointer"
          >
            <FcGoogle className="text-base" />
            <span>Continue with Google</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030816]" />}>
      <HomeContent />
    </Suspense>
  );
}
