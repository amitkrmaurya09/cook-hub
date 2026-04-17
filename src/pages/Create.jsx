import { useState } from "react";
import { API } from "../api/axios";
import { motion } from "framer-motion";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    cuisine: "",
    time: "",
    difficulty: "Easy",
    servings: 1,
    veg: false,
    image: null,
    video: null,
  });

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([""]);
  const [inputIngredient, setInputIngredient] = useState("");
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // 🧩 Add ingredient
  const addIngredient = () => {
    if (!inputIngredient.trim()) return;
    setIngredients([...ingredients, inputIngredient]);
    setInputIngredient("");
  };

  // ❌ Remove ingredient
  const removeIngredient = (i) => {
    setIngredients(ingredients.filter((_, idx) => idx !== i));
  };

  // 📝 Handle steps
  const handleStepChange = (value, i) => {
    const updated = [...steps];
    updated[i] = value;
    setSteps(updated);
  };

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (i) =>
    setSteps(steps.filter((_, idx) => idx !== i));

  // 📸 Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🎥 Video Upload
  const handleVideo = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, video: file });
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      data.append("ingredients", JSON.stringify(ingredients));
      data.append("steps", JSON.stringify(steps));

      await API.post("/recipes", data);

      setMsg("Recipe published successfully 🍲✨");
    } catch (err) {
      setMsg("Something went wrong 😅");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        {/* 🔥 HEADER */}
        <div>
          <h2 className="text-2xl font-bold">🍳 Create Recipe</h2>
          <p className="text-gray-500 text-sm">
            Craft your dish like a pro chef
          </p>
        </div>

        {/* 🧱 2 COLUMN LAYOUT */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* 🧑‍🍳 LEFT SIDE */}
          <div className="space-y-6">

            <h3 className="text-lg font-semibold">📋 Recipe Info</h3>

            <input
              placeholder="Recipe Title"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
              required
            />

            <input
              placeholder="Cuisine (Indian, Italian...)"
              onChange={(e) =>
                setForm({ ...form, cuisine: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
            />

            <input
              placeholder="Cooking Time (e.g. 30 min)"
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
            />

            <select
              onChange={(e) =>
                setForm({ ...form, difficulty: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input
              type="number"
              placeholder="Servings"
              onChange={(e) =>
                setForm({ ...form, servings: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
            />

            <label className="flex items-center justify-between border p-3 rounded-lg">
              <span>🌱 Vegetarian</span>
              <input
                type="checkbox"
                onChange={(e) =>
                  setForm({ ...form, veg: e.target.checked })
                }
              />
            </label>

            {/* 📸 IMAGE */}
            <div>
              <p className="font-medium mb-1">📸 Upload Image</p>
              <input type="file" accept="image/*" onChange={handleImage} />
              {preview && (
                <img
                  src={preview}
                  className="h-40 mt-2 rounded object-cover w-full"
                />
              )}
            </div>

            {/* 🎥 VIDEO */}
            <div>
              <p className="font-medium mb-1">🎥 Upload Video</p>
              <input type="file" accept="video/*" onChange={handleVideo} />
            </div>

          </div>

          {/* 🍲 RIGHT SIDE */}
          <div className="space-y-6">

            <h3 className="text-lg font-semibold">🍲 Cooking Details</h3>

            {/* 🧩 INGREDIENTS */}
            <div>
              <p className="font-medium mb-2">🥕 Ingredients</p>

              <div className="flex gap-2">
                <input
                  value={inputIngredient}
                  onChange={(e) =>
                    setInputIngredient(e.target.value)
                  }
                  className="border p-2 rounded w-full"
                  placeholder="Add ingredient"
                />
                <button
                  type="button"
                  onClick={addIngredient}
                  className="bg-orange-500 text-white px-3 rounded"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-orange-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {ing}
                    <button
                      type="button"
                      onClick={() => removeIngredient(i)}
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 📝 STEPS */}
            <div>
              <p className="font-medium mb-2">📝 Steps</p>

              {steps.map((step, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={step}
                    onChange={(e) =>
                      handleStepChange(e.target.value, i)
                    }
                    placeholder={`Step ${i + 1}`}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(i)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addStep}
                className="text-blue-500 text-sm"
              >
                + Add Step
              </button>
            </div>

          </div>
        </div>

        {/* ✅ MESSAGE */}
        {msg && (
          <p className="text-center text-green-600">{msg}</p>
        )}

        {/* 🚀 SUBMIT */}
        <button
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg font-semibold"
        >
          {loading ? "Publishing..." : "Publish Recipe 🚀"}
        </button>
      </motion.form>
    </div>
  );
}