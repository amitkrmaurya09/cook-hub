const categories = [
  "Indian recipes",
  "Street food",
  "Desserts",
  "Healthy recipes",
  "Fast food",
];

export default function CategoryBar({ onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="px-4 py-2 bg-white rounded-full shadow text-sm hover:bg-orange-100"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}