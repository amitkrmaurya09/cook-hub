// pages/Home.jsx
// ─── Orchestrates all home-page sections ────────────────────────────────────

import { useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";

import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import CategoryChips from "../components/CategoryChips";
import RecipeGrid from "../components/RecipeGrid";
import FeaturedBanner from "../RecipeCards/FeaturedBanner";

import { DUMMY_RECIPES, CATEGORIES, STATS, FEATURED } from "../data/homeData";
import AuthContainer from "../components/Modal/ModalContainer";

export default function Home() {
  const [recipes, setRecipes] = useState(DUMMY_RECIPES);
  const [activeCategory, setActiveCategory] = useState("All");
  const authRef = useRef();

  // Swap dummy data for real API when ready:
  // useEffect(() => {
  //   API.get("/recipes").then(res => setRecipes(res.data));
  // }, []);

  return (
    <div>
      <Navbar />
      <AuthContainer ref={authRef} />

      <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

        <HeroSection authRef={authRef} />

        <StatsBar stats={STATS} />

        <CategoryChips
          categories={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <RecipeGrid recipes={recipes} />

        <FeaturedBanner featured={FEATURED} />
      </div>
    </div>
  );
}
