"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaPlus,
  FaTrash,
  FaUtensils,
  FaArrowLeft,
  FaClock,
} from "react-icons/fa";
import ingredientsData from "@/data/ingredients.json";

export default function DietPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIngredient, setSelectedIngredient] = useState(
    ingredientsData[0],
  );
  const [grams, setGrams] = useState(150);
  const [loggedMeals, setLoggedMeals] = useState([]);

  const categories = [
    "All",
    "Meat & Poultry",
    "Seafood",
    "Vegetables",
    "Fruits",
    "Grains & Legumes",
    "Dairy & Eggs",
    "Nuts & Oils",
  ];

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fitlog_logged_food");
      if (stored) setLoggedMeals(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveMeals = (meals) => {
    setLoggedMeals(meals);
    localStorage.setItem("fitlog_logged_food", JSON.stringify(meals));
  };

  // Filter list by category and search term
  const filteredIngredients = ingredientsData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate metrics for current input
  const factor = (Number(grams) || 0) / 100;
  const computedCalories = Math.round(
    (selectedIngredient?.caloriesPer100g || 0) * factor,
  );
  const computedProtein = ((selectedIngredient?.protein || 0) * factor).toFixed(
    1,
  );
  const computedCarbs = ((selectedIngredient?.carbs || 0) * factor).toFixed(1);
  const computedFat = ((selectedIngredient?.fat || 0) * factor).toFixed(1);

  // Add ingredient to active log
  const handleAddFood = () => {
    if (!selectedIngredient || grams <= 0) {
      toast.error("Please enter a valid amount in grams.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: selectedIngredient.name,
      category: selectedIngredient.category,
      grams: Number(grams),
      calories: computedCalories,
      protein: Number(computedProtein),
      carbs: Number(computedCarbs),
      fat: Number(computedFat),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newItem, ...loggedMeals];
    saveMeals(updated);
    toast.success(`Logged ${grams}g of ${selectedIngredient.name}!`);
  };

  const handleRemoveFood = (id) => {
    const updated = loggedMeals.filter((m) => m.id !== id);
    saveMeals(updated);
    toast.error("Removed food entry");
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all logged food for today?")) {
      saveMeals([]);
      toast.success("Food log cleared");
    }
  };

  // Aggregate totals
  const totalCalories = loggedMeals.reduce(
    (acc, i) => acc + (Number(i.calories) || 0),
    0,
  );
  const totalProtein = loggedMeals
    .reduce((acc, i) => acc + (Number(i.protein) || 0), 0)
    .toFixed(1);
  const totalCarbs = loggedMeals
    .reduce((acc, i) => acc + (Number(i.carbs) || 0), 0)
    .toFixed(1);
  const totalFat = loggedMeals
    .reduce((acc, i) => acc + (Number(i.fat) || 0), 0)
    .toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-[#CCFF00] transition mb-2"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
            DIET & <span className="text-[#CCFF00]">CALORIE COUNTER</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Select raw ingredients, enter your portion weight in grams, and
            track incoming nutrition.
          </p>
        </div>

        {loggedMeals.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-red-400 hover:bg-zinc-800 transition"
          >
            Clear Today&apos;s Meals
          </button>
        )}
      </div>

      {/* Aggregate Metrics Header Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 border-t-2 border-t-[#CCFF00]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Total Calories
          </span>
          <p className="text-3xl font-black text-[#CCFF00] my-1">
            {totalCalories} <span className="text-xs text-zinc-500">kcal</span>
          </p>
          <span className="text-[10px] text-zinc-500">
            {loggedMeals.length} items logged
          </span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 border-t-2 border-t-blue-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Protein
          </span>
          <p className="text-3xl font-black text-white my-1">
            {totalProtein} <span className="text-xs text-zinc-500">g</span>
          </p>
          <span className="text-[10px] text-zinc-500">Muscle support</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 border-t-2 border-t-amber-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Carbohydrates
          </span>
          <p className="text-3xl font-black text-white my-1">
            {totalCarbs} <span className="text-xs text-zinc-500">g</span>
          </p>
          <span className="text-[10px] text-zinc-500">Energy intake</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 border-t-2 border-t-orange-400">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Fats
          </span>
          <p className="text-3xl font-black text-white my-1">
            {totalFat} <span className="text-xs text-zinc-500">g</span>
          </p>
          <span className="text-[10px] text-zinc-500">Lipids</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ingredient Selection & Grams Input (7 Columns) */}
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <FaUtensils className="text-[#CCFF00]" />
            <span>1. Choose Raw Ingredient</span>
          </h2>

          {/* Search bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-3.5 text-zinc-500 text-sm" />
            <input
              type="text"
              placeholder="Search chicken, tomato, beef, rice, egg, avocado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#CCFF00] transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-[#CCFF00] text-zinc-950 font-bold"
                    : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ingredient Scrollable List */}
          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 border border-zinc-800/80 rounded-2xl p-2 bg-zinc-950/60">
            {filteredIngredients.map((ing) => (
              <button
                key={ing.id}
                onClick={() => setSelectedIngredient(ing)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  selectedIngredient?.id === ing.id
                    ? "bg-[#CCFF00] text-zinc-950 font-bold"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                <div className="text-left">
                  <span>{ing.name}</span>
                  <span className="block text-[10px] opacity-70">
                    {ing.category}
                  </span>
                </div>
                <span
                  className={
                    selectedIngredient?.id === ing.id
                      ? "text-zinc-950 font-bold"
                      : "text-zinc-400"
                  }
                >
                  {ing.caloriesPer100g} kcal{" "}
                  <span className="text-[10px] opacity-70">/ 100g</span>
                </span>
              </button>
            ))}
          </div>

          {/* Grams Amount Section */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="flex justify-between items-center text-xs font-bold uppercase text-zinc-400">
              <label>2. Enter Weight in Grams</label>
              <span className="text-[#CCFF00] font-mono text-sm">
                {grams} g
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="5000"
                value={grams}
                onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-lg font-bold focus:outline-none focus:border-[#CCFF00] transition"
              />
              {/* Quick-add buttons */}
              <button
                type="button"
                onClick={() => setGrams((prev) => prev + 25)}
                className="px-3 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-zinc-300 hover:border-[#CCFF00] transition"
              >
                +25g
              </button>
              <button
                type="button"
                onClick={() => setGrams((prev) => prev + 50)}
                className="px-3 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-zinc-300 hover:border-[#CCFF00] transition"
              >
                +50g
              </button>
              <button
                type="button"
                onClick={() => setGrams((prev) => prev + 100)}
                className="px-3 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-zinc-300 hover:border-[#CCFF00] transition"
              >
                +100g
              </button>
            </div>
          </div>

          {/* Portion Calculation Preview Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-baseline border-b border-zinc-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white uppercase">
                  {selectedIngredient?.name}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {grams} grams portion
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#CCFF00]">
                  {computedCalories}
                </span>
                <span className="text-xs text-zinc-500 ml-1">kcal</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Protein
                </span>
                <span className="text-sm font-bold text-white">
                  {computedProtein}g
                </span>
              </div>
              <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Carbs
                </span>
                <span className="text-sm font-bold text-white">
                  {computedCarbs}g
                </span>
              </div>
              <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Fats
                </span>
                <span className="text-sm font-bold text-white">
                  {computedFat}g
                </span>
              </div>
            </div>

            <button
              onClick={handleAddFood}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#CCFF00] text-zinc-950 font-black uppercase text-xs hover:opacity-90 transition shadow-lg shadow-[#CCFF00]/15"
            >
              <FaPlus />
              <span>Log Ingredient to Today&apos;s Diet</span>
            </button>
          </div>
        </div>

        {/* Right Column: Logged Food History (5 Columns) */}
        <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center justify-between">
            <span>Today&apos;s Meal Log</span>
            <span className="text-xs font-mono text-[#CCFF00]">
              {loggedMeals.length} items
            </span>
          </h2>

          {loggedMeals.length === 0 ? (
            <div className="py-20 text-center border border-zinc-800/80 rounded-2xl p-6 bg-zinc-950/40 space-y-2">
              <FaUtensils className="mx-auto text-zinc-700 text-3xl" />
              <p className="text-zinc-400 text-xs font-bold uppercase">
                No meals logged yet
              </p>
              <p className="text-[11px] text-zinc-600">
                Pick any ingredient on the left, type the weight in grams, and
                add it here. You can return anytime to add more.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {loggedMeals.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-zinc-700 transition"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white uppercase">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                      <span>{item.grams}g</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-[9px]" /> {item.timestamp}
                      </span>
                    </p>
                    <div className="flex gap-2 text-[10px] text-zinc-400 pt-1">
                      <span>P: {item.protein}g</span>
                      <span>C: {item.carbs}g</span>
                      <span>F: {item.fat}g</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-[#CCFF00]">
                      {item.calories} kcal
                    </span>
                    <button
                      onClick={() => handleRemoveFood(item.id)}
                      className="p-2 rounded-lg bg-zinc-900 text-zinc-500 hover:text-red-400 transition"
                      title="Remove"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
