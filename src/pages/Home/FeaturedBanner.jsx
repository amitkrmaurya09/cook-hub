export default function FeaturedBanner() {
  return (
    <div className="max-w-6xl mx-auto px-8 pb-14">
      <div className="rounded-2xl grid grid-cols-2" style={{ background: "#2C1810" }}>
        <div className="p-10 text-white">
          <h2 className="text-[34px] font-bold mb-3">
            Mastering the Perfect Biryani
          </h2>
          <button className="bg-orange-600 px-6 py-3 rounded-lg">
            View full recipe →
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}