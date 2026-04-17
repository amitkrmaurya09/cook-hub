import { STATS } from "./data";

export default function Stats() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-6 grid grid-cols-4 gap-3">
      {STATS.map((s) => (
        <div key={s.label} className="bg-white rounded-xl px-5 py-4 text-center">
          <span className="text-[28px] text-orange-600">{s.value}</span>
          <span className="text-xs text-stone-400">{s.label}</span>
        </div>
      ))}
    </div>
  );
}