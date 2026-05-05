// components/StatsBar.jsx
// ─── 4-column stat tiles below the hero ─────────────────────────────────────

export default function StatsBar({ stats }) {
  return (
    <div className="max-w-6xl mx-auto px-8 py-6 grid grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-stone-100 rounded-xl px-5 py-4 text-center">
          <span
            className="block text-[28px] font-bold text-orange-600"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {s.value}
          </span>
          <span className="text-xs text-stone-400">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
