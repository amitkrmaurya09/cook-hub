export default function AuthButtons({ isLoggedIn, authRef }) {
  return isLoggedIn ? (
    <button
      onClick={() => authRef.current.openProfile()}
      className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center"
    >
      👤
    </button>
  ) : (
    <button
      onClick={() => authRef.current.open()}
      className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white"
    >
      Login
    </button>
  );
}