import { useState } from "react";
import { API } from "../api/axios";
import { motion } from "framer-motion";
import { Utensils, Clock, Image, Leaf } from "lucide-react";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    cuisine: "",
    time: "",
    veg: false,
    imageUrl: "",
    ingredients: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await API.post("/recipes", form);
      setMsg("Recipe created successfully 🍲✨");
    } catch (err) {
      setMsg("Something went wrong 😅");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-[420px] max-h-[80vh] overflow-y-auto space-y-4"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Create Recipe 🍳</h2>
        <p className="text-gray-500 text-sm">
          Share your delicious creation
        </p>
      </div>

      {/* Title */}
      <div className="relative">
        <Utensils className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          name="title"
          placeholder="Recipe Name (e.g. Butter Chicken)"
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
          required
        />
      </div>

      {/* Cuisine */}
      <input
        name="cuisine"
        placeholder="Cuisine (Indian, Italian...)"
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
      />

      {/* Time */}
      <div className="relative">
        <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          name="time"
          placeholder="Cooking Time (e.g. 30 min)"
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      {/* Veg Toggle */}
      <label className="flex items-center justify-between px-3 py-2 border rounded-lg cursor-pointer">
        <span className="flex items-center gap-2 text-sm">
          <Leaf size={16} /> Vegetarian
        </span>
        <input
          type="checkbox"
          name="veg"
          onChange={handleChange}
        />
      </label>

      {/* Image */}
      <div className="relative">
        <Image className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      {/* Ingredients */}
      <textarea
        name="ingredients"
        placeholder="Ingredients (comma separated...)"
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
        rows={3}
      />

      {/* Message */}
      {msg && (
        <p className="text-center text-sm text-green-600">{msg}</p>
      )}

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        disabled={loading}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium shadow-md"
      >
        {loading ? "Creating..." : "Create Recipe 🚀"}
      </motion.button>
    </motion.form>
  );
}