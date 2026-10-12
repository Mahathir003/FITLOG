"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    register(username, email);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">
            CREATE <span className="text-[#CCFF00]">ACCOUNT</span>
          </h1>
          <p className="text-zinc-400 text-xs">
            Start tracking workouts, diet, and calorie intake.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. mahi_fitness"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#CCFF00] transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
              Gmail / Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@gmail.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#CCFF00] transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#CCFF00] transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#CCFF00] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#CCFF00] text-zinc-950 font-black uppercase text-sm hover:opacity-90 transition shadow-lg shadow-[#CCFF00]/15"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#CCFF00] hover:underline font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
