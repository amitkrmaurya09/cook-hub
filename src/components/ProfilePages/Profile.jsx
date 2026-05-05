import { useEffect, useState, useRef } from "react";
import { API } from "../../api/axios.js";
import ProfileCard from "./ProfileCard.jsx";
import RecipeGrid from "./RecipeGrid.jsx";
import AuthContainer from "../Modal/ModalContainer.jsx";

export default function Profile() {
  const authRef = useRef();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    city: "",
    image: "",
  });

  const dummy = {
    _id: "U0001",

    name: "Amit Chef",
    email: "amitchef@email.com",

    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Cooking simple food with bold flavors 🍳🔥",

    location: "Dehradun",

    rating: 4.5,

    stats: {
      recipes: 12,
      likes: 340,
      followers: 120,
    },

    social: {
      youtube: "https://youtube.com/@amitchef",
      instagram: "https://instagram.com/amitchef",
    },

    createdAt: "2024-01-10T10:00:00.000Z",

    // 👇 Optional (if you show recipes grid)
    recipes: [
      {
        _id: "R001",
        title: "Paneer Butter Masala",
        image: "https://source.unsplash.com/400x300/?paneer",
        likes: 120,
      },
      {
        _id: "R002",
        title: "Veg Biryani",
        image: "https://source.unsplash.com/400x300/?biryani",
        likes: 95,
      },
    ],
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/me");
        console.log(res)
        setForm(res.data);
      } catch {
        setForm(dummy);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    await API.put("/user/updateProfile", form);
    setForm((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...form },
    }));

    alert("Profile updated successfully 🎉")
    setEdit(false);
  };



  const onDelete = async (id) => {
    const confirm = window.confirm("you are deleting recipe...\nClick OK for confirm")

    if (!confirm) return;

    try {
      const res = await API.delete(`/recipe/${id}+6798`)

      alert("deleted....")
    } catch (error) {
      console.log(error);
      alert("error while deleting...")
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "This will permanently delete your account.\n And also all your data related to recipe.. "
    );

    if (!confirmed) return;

    try {
      await API.delete("/user/delete-account");

      alert("Account deleted successfully");

      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      alert("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading 🍳...</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <ProfileCard
            stats={form.stats}
            edit={edit}
            form={form}
            setForm={setForm}
            setEdit={setEdit}
            handleSave={handleSave}
            handleLogout={handleLogout}
            handleDeleteAccount={handleDeleteAccount}
          />

          <RecipeGrid recipes={form.recipes} authRef={authRef} onDelete={onDelete} />

        </div>
      </div>
      <AuthContainer authRef={authRef} />
    </>

  );
}