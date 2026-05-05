// components/FeaturedBanner.jsx
// ─── Full-width dark banner for a chef's pick / featured recipe ──────────────

export default function FeaturedBanner({ featured }) {
  const { badge, title, description, author, imageUrl } = featured;

  return (
    <div className="max-w-6xl mx-auto px-8 pb-14">
      <div
        className="rounded-2xl overflow-hidden grid grid-cols-2 gap-0"
        style={{ background: "#2C1810" }}
      >
        {/* Left: copy */}
        <div className="p-10 flex flex-col justify-center">
          <span
            className="inline-block text-[11px] uppercase tracking-widest px-3 py-1 rounded mb-4 font-medium"
            style={{ background: "rgba(216,90,48,0.3)", color: "#F0997B" }}
          >
            {badge}
          </span>
          <h2
            className="text-[34px] font-bold leading-snug text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            {description}
          </p>
          <button className="self-start bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
            View full recipe →
          </button>
        </div>

        {/* Right: image */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ minHeight: 280 }}
          />
          <div
            className="absolute top-3 right-3 text-[11px] text-white font-medium px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            By {author}
          </div>
        </div>
      </div>
    </div>
  );
}
