"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">
            SIGN <span className="text-[#CCFF00]">IN</span>
          </h1>
          <p className="text-zinc-400 text-xs">
            Access your workouts, diet logs, and profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-zinc-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@fitlog.app"
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

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#CCFF00] text-zinc-950 font-black uppercase text-sm hover:opacity-90 transition shadow-lg shadow-[#CCFF00]/15"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#CCFF00] hover:underline font-bold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
