import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }) {
  return (
    <div className="max-w-6xl mx-auto px-8 pb-10">
      <h2 className="text-2xl font-bold mb-5">Latest Recipes</h2>

      <div className="grid grid-cols-3 gap-4">
        {recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </div>
    </div>
  );
}