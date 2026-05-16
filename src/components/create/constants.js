// ─── Shared Tailwind class strings ───────────────────────────────────────────
export const inp =
  "w-full bg-white border border-orange-200 focus:border-orange-500 " +
  "text-gray-800 placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none " +
  "transition-all focus:ring-2 focus:ring-orange-500/20 text-sm";

// ─── Static data ──────────────────────────────────────────────────────────────
export const CUISINES = [
  "Indian", "Italian", "Chinese", "Mexican", "Japanese",
  "Thai", "Mediterranean", "American", "French", "Other",
];

export const DIFFICULTY_STYLES = {
  Easy:   "border-green-400  bg-green-50  text-green-700",
  Medium: "border-yellow-400 bg-yellow-50 text-yellow-700",
  Hard:   "border-red-400    bg-red-50    text-red-700",
};

export const DIFFICULTY_ICONS = { Easy: "🌱", Medium: "🔥", Hard: "💀" };

export const MAX_IMAGE_BYTES = 5e6;   //   5 MB
export const MAX_VIDEO_BYTES = 100e6; // 100 MB
