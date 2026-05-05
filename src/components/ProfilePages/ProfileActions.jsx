export default function ProfileActions({
  edit,
  setEdit,
  handleSave,
  handleLogout,
  handleDeleteAccount
}) {
  return (
    <div className="flex  flex-row gap-3 pt-2">

      {edit ? (
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-0.5 px-1 py-2.5 rounded-xl 
          bg-gradient-to-r from-green-500 to-green-600 
          text-white font-medium shadow-md 
          hover:shadow-lg hover:scale-[1.02] 
          active:scale-95 transition-all duration-200"
        >
          💾 <span>Save</span>
        </button>
      ) : (
        <button
          onClick={() => setEdit(true)}
          className="flex items-center justify-center gap-0.5 px-1 py-2.5 rounded-xl 
          bg-gradient-to-r from-orange-500 to-orange-600 
          text-white font-medium shadow-md 
          hover:shadow-lg hover:scale-[1.02] 
          active:scale-95 transition-all duration-200"
        >
          ✏️ <span>Edit</span>
        </button>
      )}

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-0.5 px-1 py-2.5 rounded-xl 
        bg-gradient-to-r from-orange-400 to-red-600 
        text-white font-medium shadow-md 
        hover:shadow-lg hover:scale-[1.02] 
        active:scale-95 transition-all duration-200"
      >
        🚪<span>Logout</span>
      </button>
       <button
        onClick={handleDeleteAccount}
        className="flex items-center justify-center gap-0.5 px-2 py-2.5 rounded-xl 
        bg-gradient-to-r from-red-500 to-red-600 
        text-white font-medium shadow-md 
        hover:shadow-lg hover:scale-[1.02] 
        active:scale-95 transition-all duration-200"
      >
         🗑️<span>Delete</span>
      </button>
    </div>
  );
}