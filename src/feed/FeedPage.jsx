import { useEffect, useState } from "react";
import { API } from "../api/axios";
import FeedCard from "./FeedCard";
import { dummyRecipes } from "../data/feedData";

export default function Feed() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Uncomment to use real API:
        // const res = await API.get("/recipe/feed");
        // setRecipes(res.data.recipes);
        setRecipes(dummyRecipes);
      } catch (err) {
        console.error("Failed to load feed:", err);
        setError("Could not load feed. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading feed…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-4xl">⚠️</p>
        <p className="text-white text-lg font-semibold">Something went wrong</p>
        <p className="text-gray-400 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-5 py-2 rounded-full bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide">
      {recipes.map((r) => (
        <FeedCard key={r._id} recipe={r} />
      ))}
    </div>
  );
}