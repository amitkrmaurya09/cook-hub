export default function ProfileExtra({ form, edit, setForm }) {
  return (
    <div className="border-t pt-4 space-y-3 text-sm">

      {/* 📧 Email */}
      <p className="text-gray-600">
        📧 {form.email || "Not provided"}
      </p>

      {/* 📅 Joined */}
      <p className="text-gray-500">
        🗓 Joined: {form.joinedAt || "Recently"}
      </p>

      {/* ✍️ Bio */}
      {edit ? (
        <input
          value={form.bio}
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
          placeholder="Write something about you..."
          className="w-full border px-2 py-1 rounded"
        />
      ) : (
        <p className="italic text-gray-700">
          “{form.bio || "Cooking is my therapy 🍳"}”
        </p>
      )}

      {/* 🔗 Social */}
      <div className="flex justify-center gap-4 pt-2">
        {form.youtube && (
          <a
            href={form.youtube}
            target="_blank"
            className="text-red-500 hover:underline"
          >
            ▶ YouTube
          </a>
        )}

        {form.instagram && (
          <a
            href={form.instagram}
            target="_blank"
            className="text-pink-500 hover:underline"
          >
            📸 Instagram
          </a>
        )}
      </div>
    </div>
  );
}