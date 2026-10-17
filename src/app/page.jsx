"use client";

import Link from "next/link";
import {
  FaUtensils,
  FaDumbbell,
  FaChartLine,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth() || {};

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
      link: user ? "/profile" : "/login",
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
      <section className="relative w-full min-h-[640px] sm:min-h-[720px] flex items-center overflow-hidden">
        {/* Full-bleed background image with directional gradients */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[center_right] lg:bg-[right_center] z-0"
          style={{ backgroundImage: "url('/hero-banner.png')" }}
        >
          {/* Left-to-right fade: guarantees readable text and seamless blending on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030816] via-[#030816]/85 to-transparent sm:via-[#030816]/60 lg:to-transparent" />

          {/* Top and bottom subtle vignettes */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030816] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030816] to-transparent" />
        </div>

        {/* Floating Decorative Tagline on the Top Right */}
        <div className="hidden lg:block absolute top-12 right-16 sm:right-24 z-10 pointer-events-none select-none">
          <p className="font-serif italic text-xl text-[#00A3FF] tracking-wide rotate-[6deg] drop-shadow-[0_0_12px_rgba(0,163,255,0.5)]">
            Better Choices <br />
            <span className="text-sky-200">Bigger Results</span>
          </p>
        </div>

        {/* Hero Interactive Text Layer */}
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

            <div className="pt-2">
              <Link
                href={user ? "/workouts" : "/register"}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00A3FF] text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[#008fe3] hover:scale-105 shadow-[0_0_30px_rgba(0,163,255,0.55)] group"
              >
                <span>Get Started</span>
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 FEATURE PILLARS */}
      <section className="border-t border-sky-950/60 bg-[#040C1F]/60 backdrop-blur-md py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="group flex flex-col items-center text-center space-y-3 p-4 rounded-2xl hover:bg-sky-950/30 transition-all duration-200 border border-transparent hover:border-sky-900/30"
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
              </Link>
            ))}
          </div>

          <div className="text-center pt-8 border-t border-sky-950/40 mt-8">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-500">
              HEALTHYCISE
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
