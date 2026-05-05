// components/CategoryChips.jsx
// ─── Horizontal pill-filter row for recipe categories ───────────────────────

export default function CategoryChips({ categories, active, onChange }) {
  return (
    <div className="max-w-6xl mx-auto px-8 pb-4 flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-150
            ${active === cat
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-stone-500 border-stone-200 hover:border-orange-400 hover:text-orange-600"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
