// components/HeroSection.jsx
// ─── Top hero banner with headline, CTAs, and featured image card ────────────


export default function HeroSection({ authRef }) {
  const handleShowFeed = () => {
    alert("you are navigating to feed...")
    authRef.current.openFeed();
  }

  const handleShareRecipe = () => {
    alert("opening create...")
    authRef.current.openCreate();
  }
  return (
    <div className="bg-white border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-2 gap-12 items-center">

        {/* Left: Copy + CTAs */}
        <div>
          <span className="inline-block bg-orange-50 text-orange-700 text-[11px] font-medium uppercase tracking-widest px-3 py-1 rounded mb-4">
            ✦ Community Recipes
          </span>
          <h1
            className="text-[52px] font-bold leading-[1.15] mb-4 text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Cook.<br />Share.<br />
            <em className="text-orange-600">Enjoy.</em>
          </h1>
          <p className="text-stone-500 text-[15px] leading-relaxed mb-7 max-w-md">
            Discover thousands of recipes made by real home cooks — from quick weeknight
            dinners to elaborate weekend feasts.
          </p>
          <div className="flex gap-3 items-center">
            <button onClick={handleShowFeed} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
              Browse Recipes
            </button>
            <button
              className="border border-stone-200 hover:bg-stone-50 text-stone-600 px-6 py-3 rounded-lg text-sm transition-colors"
              onClick={handleShareRecipe}
            >
              Share yours →
            </button>
          </div>
        </div>

        {/* Right: Hero image + trending pill */}
        <div className="relative h-80 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80"
            alt="Featured dish"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white rounded-xl px-3 py-2.5 flex items-center gap-2.5 border border-stone-100">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-lg">🔥</div>
            <div>
              <p className="text-[13px] font-medium text-stone-800">Trending today</p>
              <span className="text-[11px] text-stone-400">Spicy Lamb Rogan Josh</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
