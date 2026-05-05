import { Pencil, Trash2, ExternalLink } from "lucide-react";
import AuthContainer from "../Modal/ModalContainer";
import { useRef } from "react";

export default function RecipeGrid({ recipes, authRef, onDelete }) {
      const dialog = useRef();

    const onEdit = (id)=>{
    console.log(id)
    alert(id.id);
    dialog.current.close();
   authRef.current.openCreate();
   alert(res);
  }

  return (
    <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
      <AuthContainer authRef={authRef} />
      <h3 className="text-lg font-semibold mb-4">
        🍲 My Recipes
      </h3>

      {recipes?.length === 0 ? (
        <p className="text-gray-400 text-center">
          No recipes yet ✨
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((r) => (
            <div
              key={r._id}
              className="bg-gray-100 rounded-xl p-3 hover:shadow-lg transition transform hover:-translate-y-1"
            >

              {/* 📸 IMAGE */}
              <div className="relative group">
                <img
                  src={r.image}
                  alt={r.title}
                  className="h-28 w-full object-cover rounded mb-2"
                />

                {/* 🔗 open image */}
                <a
                  href={r.image}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-2 left-2 bg-black/60 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <ExternalLink size={14} />
                </a>

                {/* ✏️ DELETE + EDIT */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">

                  <button
                    onClick={() => onEdit(r)}
                    className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => onDelete(r.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>
              </div>

              {/* 📝 TITLE */}
              <p className="font-medium text-sm truncate">
                {r.title}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}