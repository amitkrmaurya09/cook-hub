// components/RecipeCard.jsx
// ─── Single recipe tile used inside RecipeGrid ───────────────────────────────

import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);
  const likeCount = liked ? recipe.likes + 1 : recipe.likes;

  return (
    <div className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">

      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.parentElement.style.background = "#fef3ee";
            e.target.style.display = "none";
          }}
        />
      </div>

      <div className="p-4">
        {/* Cuisine / Veg tags */}
        <div className="flex gap-1.5 flex-wrap mb-2">
          <span className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded bg-orange-50 text-orange-700">
            {recipe.cuisine}
          </span>
          {recipe.veg && (
            <span className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded bg-green-50 text-green-700">
              Veg
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-bold text-[17px] leading-snug mb-1.5 text-stone-900"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {recipe.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
          <span>⏱ {recipe.time}</span>
          <span className="opacity-30">•</span>
          <span>{likeCount} likes</span>
        </div>

        {/* Footer: author + like button */}
        <div className="flex items-center justify-between pt-2.5 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white"
              style={{ background: recipe.author.color }}
            >
              {recipe.author.initials}
            </div>
            <span className="text-xs text-stone-500 font-medium">{recipe.author.name}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-all duration-150
              ${liked
                ? "bg-orange-50 border-orange-300 text-orange-700"
                : "border-stone-200 text-stone-400 hover:border-orange-300 hover:text-orange-600"
              }`}
          >
            {liked ? "♥" : "♡"} {likeCount}
          </button>
        </div>
      </div>
    </div>
  );
}
