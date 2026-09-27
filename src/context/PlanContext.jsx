"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedList, setSavedList] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedList(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    }
  }, []);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
  }, [savedList]);

  const addToTodayPlan = (workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    if (todayPlan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, isCompleted: false }]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }
    setSavedList((prev) => [...prev, workout]);
    toast.success("Saved for later!");
  };

  const removeFromTodayPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.error("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.error("Removed from saved list");
  };

  const toggleComplete = (id) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
    toast.success("Workout status updated!");
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedList,
        addToTodayPlan,
        addToSaved,
        removeFromTodayPlan,
        removeFromSaved,
        toggleComplete,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
