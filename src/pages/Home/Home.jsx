import { useState } from "react";
import { DUMMY_RECIPES } from "./data";

import Hero from "./Hero";
import Stats from "./Stats";
import CategoryBar from "./CategoryBar";
import RecipeGrid from "./RecipeGrid";
import FeaturedBanner from "./FeaturedBanner";

export default function Home() {
  const [recipes] = useState(DUMMY_RECIPES);
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-stone-50">
      <Hero />
      <Stats />
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <RecipeGrid recipes={recipes} />
      <FeaturedBanner />
    </div>
  );
}