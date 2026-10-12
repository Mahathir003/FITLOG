"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("fitlog_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
  }, []);

  const login = (email, password) => {
    const mockUser = {
      name: email.split("@")[0].toUpperCase(),
      email,
      weight: 70, // kg default
      height: 175, // cm default
      age: 22,
      gender: "male",
      calorieGoal: 2200,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
    };

    setUser(mockUser);
    localStorage.setItem("fitlog_user", JSON.stringify(mockUser));
    toast.success(`Welcome back, ${mockUser.name}!`);
    router.push("/");
  };

  const register = (name, email) => {
    const newUser = {
      name,
      email,
      weight: 70, // kg
      height: 175, // cm
      age: 22,
      gender: "male",
      calorieGoal: 2200,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
    };

    setUser(newUser);
    localStorage.setItem("fitlog_user", JSON.stringify(newUser));
    toast.success("Account created successfully!");
    router.push("/");
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem("fitlog_user", JSON.stringify(updated));
    toast.success("Profile & health metrics updated!");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fitlog_user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      login: () => {},
      register: () => {},
      updateProfile: () => {},
      logout: () => {},
    };
  }
  return context;
};
