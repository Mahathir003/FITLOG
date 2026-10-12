"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  FaUser,
  FaWeightHanging,
  FaRulerVertical,
  FaBirthdayCake,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(22);
  const [gender, setGender] = useState("male");

  useEffect(() => {
    if (user) {
      if (user.weight) setWeight(user.weight);
      if (user.height) setHeight(user.height);
      if (user.age) setAge(user.age);
      if (user.gender) setGender(user.gender);
    }
  }, [user]);

  // Calculations
  const heightInMeters = Number(height) > 0 ? Number(height) / 100 : 1;
  const bmi =
    Number(weight) > 0
      ? (Number(weight) / (heightInMeters * heightInMeters)).toFixed(1)
      : "0";

  let bmr = 0;
  if (Number(weight) > 0 && Number(height) > 0 && Number(age) > 0) {
    if (gender === "male") {
      bmr = Math.round(
        10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5,
      );
    } else {
      bmr = Math.round(
        10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161,
      );
    }
  }

  const getBmiCategory = (val) => {
    const num = Number(val);
    if (num < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (num < 25) return { label: "Normal weight", color: "text-[#CCFF00]" };
    if (num < 30) return { label: "Overweight", color: "text-orange-400" };
    return { label: "Obese", color: "text-red-400" };
  };

  const bmiInfo = getBmiCategory(bmi);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      gender,
    });
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
        <p className="text-zinc-400 text-sm">
          Please log in to manage your health profile and metrics.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 bg-[#CCFF00] text-zinc-950 font-bold rounded-xl text-sm"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#CCFF00] transition"
      >
        <FaArrowLeft />
        <span>Back to Home</span>
      </Link>

      <div className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700"
        />
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-wide">
            {user.name}
          </h1>
          <p className="text-xs text-zinc-400">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form to update stats */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold uppercase tracking-wider text-white">
            Body Measurements
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5 flex items-center gap-2">
                <FaWeightHanging className="text-[#CCFF00]" />
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#CCFF00] transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5 flex items-center gap-2">
                <FaRulerVertical className="text-[#CCFF00]" />
                Height (cm)
              </label>
              <input
                type="number"
                step="1"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#CCFF00] transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5 flex items-center gap-2">
                  <FaBirthdayCake className="text-[#CCFF00]" />
                  Age
                </label>
                <input
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="22"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#CCFF00] transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#CCFF00] transition"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#CCFF00] text-zinc-950 font-black uppercase text-sm hover:opacity-90 transition shadow-lg shadow-[#CCFF00]/15"
            >
              <FaCheck />
              <span>Save Measurements</span>
            </button>
          </form>
        </div>

        {/* Live Calculation Cards */}
        <div className="space-y-4">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Body Mass Index
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-[#CCFF00]">{bmi}</span>
              <span className={`text-sm font-bold ${bmiInfo.color}`}>
                ({bmiInfo.label})
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Healthy range is typically 18.5 – 24.9.
            </p>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Basal Metabolic Rate (BMR)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">{bmr}</span>
              <span className="text-sm text-zinc-400">kcal / day</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The baseline energy your body expends at complete rest per day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
