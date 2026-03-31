// pages/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

// ── Dummy data (replace API.get("/recipes") when backend is ready) ──────────
const DUMMY_RECIPES = [
  {
    _id: "1",
    title: "Butter Chicken",
    cuisine: "Indian",
    time: "45 min",
    veg: false,
    likes: 284,
    author: { name: "Priya Sharma", initials: "PS", color: "#D85A30" },
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=70",
  },
  {
    _id: "2",
    title: "Cacio e Pepe",
    cuisine: "Italian",
    time: "20 min",
    veg: true,
    likes: 196,
    author: { name: "Marco Rossi", initials: "MR", color: "#185FA5" },
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=70",
  },
  {
    _id: "3",
    title: "Pav Bhaji",
    cuisine: "Indian",
    time: "30 min",
    veg: true,
    likes: 312,
    author: { name: "Rohit Kumar", initials: "RK", color: "#3B6D11" },
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=70",
  },
  {
    _id: "4",
    title: "Pad Thai",
    cuisine: "Asian",
    time: "25 min",
    veg: false,
    likes: 178,
    author: { name: "Aisha Noor", initials: "AN", color: "#854F0B" },
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&q=70",
  },
  {
    _id: "5",
    title: "Chocolate Lava Cake",
    cuisine: "Dessert",
    time: "35 min",
    veg: true,
    likes: 421,
    author: { name: "Sofia Duarte", initials: "SD", color: "#712B13" },
    imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=70",
  },
  {
    _id: "6",
    title: "Dal Makhani",
    cuisine: "Indian",
    time: "60 min",
    veg: true,
    likes: 255,
    author: { name: "Neha Verma", initials: "NV", color: "#3C3489" },
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=70",
  },
];

const CATEGORIES = ["All", "Indian", "Italian", "Asian", "Vegan", "Desserts", "Quick (< 30 min)", "Street Food"];

const STATS = [
  { value: "12k+", label: "Recipes shared" },
  { value: "4.2k", label: "Active cooks" },
  { value: "98%",  label: "Success rate" },
  { value: "35+",  label: "Cuisines" },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="relative h-44 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.parentElement.style.background = "#fef3ee"; e.target.style.display = "none"; }}
        />
      </div>

      <div className="p-4">
        {/* Tags */}
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
        <h3 className="font-bold text-[17px] leading-snug mb-1.5 text-stone-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {recipe.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
          <span>⏱ {recipe.time}</span>
          <span className="opacity-30">•</span>
          <span>{liked ? recipe.likes + 1 : recipe.likes} likes</span>
        </div>

        {/* Footer */}
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
            {liked ? "♥" : "♡"} {liked ? recipe.likes + 1 : recipe.likes}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [recipes, setRecipes] = useState(DUMMY_RECIPES);
  const [activeCategory, setActiveCategory] = useState("All");

  // Swap dummy data for real API when ready:
  // useEffect(() => {
  //   API.get("/recipes").then(res => setRecipes(res.data));
  // }, []);

  return (
    <div>

      <Navbar />
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>


      {/* ── Hero ── */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-orange-50 text-orange-700 text-[11px] font-medium uppercase tracking-widest px-3 py-1 rounded mb-4">
              ✦ Community Recipes
            </span>
            <h1 className="text-[52px] font-bold leading-[1.15] mb-4 text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cook.<br />Share.<br />
              <em className="text-orange-600">Enjoy.</em>
            </h1>
            <p className="text-stone-500 text-[15px] leading-relaxed mb-7 max-w-md">
              Discover thousands of recipes made by real home cooks — from quick weeknight dinners to elaborate weekend feasts.
            </p>
            <div className="flex gap-3 items-center">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
                Browse Recipes
              </button>
              <button className="border border-stone-200 hover:bg-stone-50 text-stone-600 px-6 py-3 rounded-lg text-sm transition-colors">
                Share yours →
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80"
              alt="Featured dish"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-3 py-2.5 flex items-center gap-2.5 border border-stone-100">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-content-center text-lg">🔥</div>
              <div>
                <p className="text-[13px] font-medium text-stone-800">Trending today</p>
                <span className="text-[11px] text-stone-400">Spicy Lamb Rogan Josh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-6xl mx-auto px-8 py-6 grid grid-cols-4 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white border border-stone-100 rounded-xl px-5 py-4 text-center">
            <span className="block text-[28px] font-bold text-orange-600" style={{ fontFamily: "'Playfair Display', serif" }}>
              {s.value}
            </span>
            <span className="text-xs text-stone-400">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Category Chips ── */}
      <div className="max-w-6xl mx-auto px-8 pb-4 flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
          key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-150
              ${activeCategory === cat
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-stone-500 border-stone-200 hover:border-orange-400 hover:text-orange-600"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Recipes Grid ── */}
      <div className="max-w-6xl mx-auto px-8 pb-10">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Latest Recipes
          </h2>
          <button className="text-sm text-orange-600 font-medium hover:underline">See all →</button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {recipes.map((r) => (
            <RecipeCard key={r._id} recipe={r} />
          ))}
        </div>
      </div>

      {/* ── Featured Banner ── */}
      <div className="max-w-6xl mx-auto px-8 pb-14">
        <div className="rounded-2xl overflow-hidden grid grid-cols-2 gap-0" style={{ background: "#2C1810" }}>
          <div className="p-10 flex flex-col justify-center">
            <span className="inline-block text-[11px] uppercase tracking-widest px-3 py-1 rounded mb-4 font-medium"
              style={{ background: "rgba(216,90,48,0.3)", color: "#F0997B" }}>
              Chef's Pick
            </span>
            <h2 className="text-[34px] font-bold leading-snug text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mastering the Perfect Biryani
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              A 3-hour journey through layers of slow-cooked basmati, whole spices, and caramelised onions — the way your dadi made it.
            </p>
            <button className="self-start bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
              View full recipe →
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"
              alt="Biryani"
              className="w-full h-full object-cover"
              style={{ minHeight: 280 }}
            />
            <div className="absolute top-3 right-3 text-[11px] text-white font-medium px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              By Arjun Mehta
            </div>
          </div>
        </div>
      </div>
    </div>
                </div>
  );
}