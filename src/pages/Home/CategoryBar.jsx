import { CATEGORIES } from "./data";

export default function CategoryBar({ activeCategory, setActiveCategory }) {
  return (
    <div className="max-w-6xl mx-auto px-8 pb-4 flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-1.5 rounded-full border ${
            activeCategory === cat
              ? "bg-orange-600 text-white"
              : "bg-white text-stone-500"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}