import { useEffect, useState, useRef } from "react";
import { API } from "../../api/axios.js";
import ProfileCard from "./ProfileCard.jsx";
import RecipeGrid from "./RecipeGrid.jsx";
import ModalContainer from "../Modal/ModalContainer.jsx";

export default function Profile() {
  const authRef = useRef();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    city: "",
    image: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/me");
        // console.log(res)
        setForm(res.data);
      } catch {
        localStorage.clear();
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
      <ModalContainer ref={authRef} />
    </>

  );
}