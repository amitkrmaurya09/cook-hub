export default function Hero() {
  return (
    <div className="bg-white border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-2 gap-12 items-center">

        <div>
          <span className="bg-orange-50 text-orange-700 text-[11px] px-3 py-1 rounded mb-4 inline-block">
            ✦ Community Recipes
          </span>

          <h1 className="text-[52px] font-bold leading-[1.15]">
            Cook.<br />Share.<br />
            <em className="text-orange-600">Enjoy.</em>
          </h1>

          <p className="text-stone-500 mb-7 max-w-md">
            Discover thousands of recipes made by real home cooks.
          </p>

          <div className="flex gap-3">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg">
              Browse Recipes
            </button>
            <button className="border px-6 py-3 rounded-lg">
              Share yours →
            </button>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80"
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}