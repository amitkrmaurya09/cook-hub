import { useEffect, useState } from "react";
import { API } from "../api/axios";
import { motion } from "framer-motion";

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    city: "",
    image: "",
  });

  // 🍰 fallback data
  const dummy = {
    user_id: "U000",
    profile: {
      name: "Guest Chef",
      city: "Unknown",
      image: "",
      rating: 4.2,
    },
    recipes: 3,
    likes: 25,
    user_recipes: [
      { id: 1, title: "Paneer Butter Masala" },
      { id: 2, title: "Veg Biryani" },
    ],
  };

  // 🔥 Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/me");

        setData(res.data);
        setForm({
          name: res.data.profile.name,
          city: res.data.profile.city || "",
          image: res.data.profile.image || "",
        });
      } catch (err) {
        setData(dummy);
        setForm(dummy.profile);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 💾 Update Profile
  const handleSave = async () => {
    try {
      await API.put("/auth/update-profile", form);

      setData((prev) => ({
        ...prev,
        profile: { ...prev.profile, ...form },
      }));

      setEdit(false);
    } catch (err) {
      alert("Update failed 😅");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading your kitchen... 🍳
      </div>
    );
  }

  const user = data.profile;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* 👨‍🍳 LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow p-6 space-y-5"
        >
          {/* Avatar */}
          <img
            src={
              form.image ||
              `https://ui-avatars.com/api/?name=${form.name}`
            }
            className="w-24 h-24 mx-auto rounded-full border object-cover"
          />

          {/* Name */}
          {edit ? (
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded text-center"
            />
          ) : (
            <h2 className="text-center text-xl font-semibold">
              👨‍🍳 {user.name}
            </h2>
          )}

          {/* City */}
          {edit ? (
            <input
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              placeholder="City"
              className="w-full border px-3 py-2 rounded text-center"
            />
          ) : (
            <p className="text-center text-gray-500 text-sm">
              📍 {user.city || "Unknown"}
            </p>
          )}

          {/* Rating */}
          <p className="text-center text-yellow-500 font-medium">
            ⭐ {user.rating} Chef Rating
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center pt-4 border-t">
            <div>
              <p className="font-bold">{data.recipes}</p>
              <p className="text-xs text-gray-500">Recipes</p>
            </div>
            <div>
              <p className="font-bold">{data.likes}</p>
              <p className="text-xs text-gray-500">Likes</p>
            </div>
            <div>
              <p className="font-bold">
                {Math.floor(data.likes / 2)}
              </p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
          </div>

          {/* Buttons */}
          {edit ? (
            <button
              onClick={handleSave}
              className="w-full py-2 bg-green-500 text-white rounded-lg"
            >
              Save Changes 💾
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="w-full py-2 bg-orange-500 text-white rounded-lg"
            >
              Edit Profile ✏️
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </motion.div>

        {/* 🍲 RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-white rounded-2xl shadow p-6"
        >
          <h3 className="text-lg font-semibold mb-4">
            🍲 My Recipes
          </h3>

          {data.user_recipes?.length === 0 ? (
            <p className="text-gray-400 text-center">
              No recipes yet. Start cooking something amazing ✨
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.user_recipes.map((r) => (
                <div
                  key={r.id}
                  className="bg-gray-100 rounded-xl p-3 hover:shadow cursor-pointer transition"
                >
                  <div className="h-28 bg-gray-200 rounded mb-2" />
                  <p className="font-medium text-sm truncate">
                    {r.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}