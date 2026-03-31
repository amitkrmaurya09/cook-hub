// components/RecipeCard.jsx
export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4 cursor-pointer">
      <img
        src={recipe.image}
        className="rounded-xl h-40 w-full object-cover mb-3"
      />

      <h2 className="text-lg font-semibold">{recipe.title}</h2>

      <p className="text-gray-500 text-sm line-clamp-2">
        {recipe.ingredients}
      </p>
    </div>
  );
}