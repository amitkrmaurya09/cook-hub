// components/RecipeGrid.jsx
// ─── Section header + 3-col grid of RecipeCards ──────────────────────────────

import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }) {
  return (
    <div className="max-w-6xl mx-auto px-8 pb-10">
      <div className="flex items-baseline justify-between mb-5">
        <h2
          className="text-2xl font-bold text-stone-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Latest Recipes
        </h2>
        <button className="text-sm text-orange-600 font-medium hover:underline">
          See all →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </div>
    </div>
  );
}
