"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUtensils,
  FaDumbbell,
  FaCalculator,
  FaChartLine,
  FaWeight,
  FaHeart,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register, login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
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

  const leftFeatures = [
    {
      icon: <FaUtensils className="text-[#00A3FF]" />,
      title: "Track Your Food",
      desc: "Choose ingredients, set weights, and see your calorie intake.",
    },
    {
      icon: <FaDumbbell className="text-[#00A3FF]" />,
      title: "Plan Workouts",
      desc: "Pick workouts for today and tomorrow, and see calories burned.",
    },
    {
      icon: <FaCalculator className="text-[#00A3FF]" />,
      title: "BMI & BMR",
      desc: "Know your body better with accurate calculations.",
    },
    {
      icon: <FaChartLine className="text-[#00A3FF]" />,
      title: "Weekly Analysis",
      desc: "Compare calories in vs. calories out and track your progress.",
    },
    {
      icon: <FaWeight className="text-[#00A3FF]" />,
      title: "Weight Progress",
      desc: "Update your weight monthly and see real improvements.",
    },
    {
      icon: <FaHeart className="text-[#00A3FF]" />,
      title: "Live Healthier",
      desc: "Small steps every day lead to big results.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#030816] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00A3FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Value Props & Branding */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#00A3FF] font-semibold block">
              YOUR HEALTH. YOUR GOALS.
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Fitness & Nutrition <br />
              <span className="text-[#00A3FF] drop-shadow-[0_0_30px_rgba(0,163,255,0.5)]">
                Made Simple.
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
              Track your calories, plan your workouts, calculate your BMI & BMR,
              and build a healthier you — all in one place[cite: 5].
            </p>
          </div>

          {/* 6-Grid Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {leftFeatures.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#061536] border border-sky-900/50 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(0,163,255,0.25)]">
                  {item.icon}
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Decorative script signature */}
          <div className="pt-4">
            <p className="font-serif italic text-lg text-[#00A3FF] tracking-wide -rotate-2">
              Your journey to a healthier you starts here[cite: 5].
            </p>
          </div>
        </div>

        {/* Right Column: Register Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-[#05112B]/85 border border-sky-800/40 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,163,255,0.15)] backdrop-blur-2xl space-y-6">
            {/* Header */}
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
                Create your account to start tracking today.
              </p>
            </div>

            {/* Segmented Sign In / Register Tab Toggle */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#03091B] border border-sky-950">
              <Link
                href="/login"
                className="py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white text-center transition"
              >
                Sign In
              </Link>
              <button
                type="button"
                className="py-2.5 rounded-xl text-xs font-bold bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.5)] transition"
              >
                Register
              </button>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Create a password (min. 6 characters)"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 text-xs transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#03091B] border border-sky-950 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#00A3FF] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 text-xs transition"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00A3FF] text-white font-bold text-xs uppercase tracking-wide hover:bg-[#008fe3] transition shadow-[0_0_25px_rgba(0,163,255,0.45)] mt-2"
              >
                <span>Create Account</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-sky-950 w-full" />
              <span className="bg-[#05112B] px-3 text-[10px] uppercase font-bold text-slate-500 relative">
                OR
              </span>
            </div>

            {/* Google OAuth Shortcut */}
            <button
              type="button"
              onClick={() => login("google.user@gmail.com", "password")}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#03091B] border border-sky-950 hover:border-[#00A3FF] text-xs font-bold text-slate-200 transition"
            >
              <FcGoogle className="text-base" />
              <span>Sign up with Google</span>
            </button>

            {/* Switch to Sign In */}
            <p className="text-center text-xs text-slate-400 pt-1">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#00A3FF] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Sign In</span>
                <FaArrowRight className="text-[9px]" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
