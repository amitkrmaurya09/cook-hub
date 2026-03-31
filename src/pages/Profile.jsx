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

  // 🧁 Dummy fallback
  const dummy = {
    user_id: "U000",
    profile: {
      name: "Guest Chef",
      city: "Unknown",
      image: "",
      rating: 4.0,
    },
    recipes: 1,
    likes: 10,
    user_recipes: [],
  };

  // 🔥 Fetch profile
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
        console.log("Using dummy 😅");

        setData(dummy);
        setForm({
          name: dummy.profile.name,
          city: dummy.profile.city,
          image: dummy.profile.image,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 💾 Save profile
  const handleSave = async () => {
    try {
      await API.put("/auth/update-profile", form);

      setData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...form,
        },
      }));

      setEdit(false);
    } catch (err) {
      alert("Failed to update 😅");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loading) {
    return <p className="text-center">Loading profile... ⏳</p>;
  }

  const user = data.profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[400px] max-h-[80vh] overflow-y-auto space-y-5"
    >
      {/* 👤 PROFILE HEADER */}
      <div className="text-center space-y-2">

      
        {/* Avatar */}
        <img
          src={
            form.image ||
            "https://ui-avatars.com/api/?name=" + form.name
          }
          className="w-20 h-20 mx-auto rounded-full object-cover border"
        />

        {/* Name */}
        {edit ? (
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border px-2 py-1 rounded text-center w-full"
          />
        ) : (
          <h2 className="text-xl font-semibold">{user.name}</h2>
        )}

        {/* City */}
        {edit ? (
          <input
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            placeholder="City"
            className="border px-2 py-1 rounded text-center w-full"
          />
        ) : (
          <p className="text-gray-500 text-sm">
            📍 {user.city || "Unknown"}
          </p>
        )}

        {/* Rating */}
        <p className="text-yellow-500 text-sm">
          ⭐ {user.rating}
        </p>

        {/* User ID */}
        <p className="text-xs text-gray-400">
          ID: {data.user_id}
        </p>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-100 p-3 rounded-lg text-center">
          <p className="font-bold">{data.recipes}</p>
          <p className="text-xs text-gray-500">Recipes</p>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg text-center">
          <p className="font-bold">{data.likes}</p>
          <p className="text-xs text-gray-500">Likes</p>
        </div>
      </div>

      {/* 🍲 USER RECIPES */}
      <div>
        <h3 className="font-semibold mb-2">My Recipes 🍲</h3>

        {data.user_recipes?.length === 0 ? (
          <p className="text-sm text-gray-400">
            No recipes yet
          </p>
        ) : (
          <div className="space-y-2">
            {data.user_recipes.map((r) => (
              <div
                key={r.id}
                className="bg-gray-50 p-2 rounded-lg text-sm"
              >
                {r.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✏️ EDIT / SAVE */}
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

      {/* 🚪 LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full py-2 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </motion.div>
  );
} 