import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="relative h-44 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex gap-1.5 flex-wrap mb-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-orange-50 text-orange-700">
            {recipe.cuisine}
          </span>
          {recipe.veg && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-green-50 text-green-700">
              Veg
            </span>
          )}
        </div>

        <h3 className="font-bold text-[17px] mb-1.5">
          {recipe.title}
        </h3>

        <div className="text-xs text-stone-400 mb-3">
          ⏱ {recipe.time} • {liked ? recipe.likes + 1 : recipe.likes} likes
        </div>

        <button onClick={() => setLiked(!liked)}>
          {liked ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}