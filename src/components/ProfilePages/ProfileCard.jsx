import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";
import ProfileExtra from "./ProfileExtra";

export default function ProfileCard({
    user,
    stats,
    edit,
    form,
    setForm,
    setEdit,
    handleSave,
    handleLogout,
    handleDeleteAccount
}) {
    console.log(form)
    console.log(stats)
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5 transition hover:shadow-xl">

            <img
                src={form?.image || `https://ui-avatars.com/api/?name=${form.name || "user"}`}
                className="w-24 h-24 mx-auto rounded-full border-4 border-orange-400 object-cover"
            />

            {edit ? (
                <>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input px-2 border-2"
                        placeholder="name..."
                    />
                    <input
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="input px-2 border-2"
                        placeholder="city..."
                    />
                </>
            ) : (
                <>
                    <h2 className="text-center text-xl font-semibold">
                        👨‍🍳 {form.name}
                    </h2>
                    <p className="text-center text-gray-500 text-sm">
                        📍 {form.location || "Unknown"}
                    </p>
                </>
            )}

            <p className="text-center text-yellow-500 font-medium">
                ⭐ {form.rating} Rating
            </p>

            <ProfileStats stats={stats} />
            <ProfileExtra
                form={form}
                edit={edit}
                setForm={setForm}
            />
            <ProfileActions
                edit={edit}
                setEdit={setEdit}
                handleSave={handleSave}
                handleLogout={handleLogout}
                handleDeleteAccount={handleDeleteAccount}
            />
        </div>
    );
}