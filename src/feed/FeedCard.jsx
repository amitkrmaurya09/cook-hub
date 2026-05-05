import { useState, useRef } from "react";
import { Heart, MessageCircle, UserPlus, UserCheck, Send, Trash2, X } from "lucide-react";
import { useFeedStorage } from "./useFeedStorage";

export default function FeedCard({ recipe }) {
  const isVideo = recipe.image?.includes(".mp4") || recipe.video;

  /* ── all state + API calls live in the hook ── */
  const {
    liked, likesCount, loadingLike,
    followed, loadingFollow,
    comments, submitting,
    handleLike, handleFollow,
    handleAddComment, handleDeleteComment,
  } = useFeedStorage(recipe);

  /* ── local UI state only ── */
  const [showComments, setShowComments] = useState(false);
  const [newComment,   setNewComment]   = useState("");
  const inputRef = useRef(null);

  const openComments = () => {
    setShowComments(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const onSend = async () => {
    const success = await handleAddComment(newComment);
    if (success) setNewComment("");
    // on failure, text stays in input — user doesn't lose it
  };

  return (
    <div className="h-screen w-full relative snap-start flex items-center justify-center overflow-hidden">

      {/* ── MEDIA ── */}
      {isVideo ? (
        <video
          src={recipe.video || recipe.image}
          autoPlay loop muted playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover"
          onError={(e) => { e.target.src = "https://placehold.co/400x700/111/333?text=🍽️"; }}
        />
      )}

      {/* ── GRADIENT ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* ── LEFT: RECIPE INFO ── */}
      <div className="absolute bottom-20 left-4 text-white max-w-[70%] z-10">
        {recipe.author && (
          <p className="text-sm font-semibold text-amber-400 mb-1">@{recipe.author}</p>
        )}
        <h2 className="text-xl font-bold leading-tight drop-shadow">{recipe.title}</h2>
        <p className="text-sm text-gray-300 mt-0.5">
          {recipe.cuisine} · {recipe.time}
        </p>
        <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
          {recipe.steps?.[0]}
        </p>
      </div>

      {/* ── RIGHT: ACTIONS ── */}
      <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6 z-10">

        {/* ❤️ Like */}
        <button
          onClick={handleLike}
          disabled={loadingLike}
          className="flex flex-col items-center gap-1 group"
          aria-label="Like recipe"
        >
          <div className={`
            p-2 rounded-full transition-all duration-200
            ${liked ? "bg-red-500/20" : "bg-white/10 group-hover:bg-white/20"}
            ${loadingLike ? "opacity-50" : ""}
          `}>
            <Heart
              size={26}
              className={`transition-all duration-200 ${liked ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </div>
          <span className="text-xs text-white font-medium">{likesCount}</span>
        </button>

        {/* 💬 Comment */}
        <button
          onClick={openComments}
          className="flex flex-col items-center gap-1 group"
          aria-label="View comments"
        >
          <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-200">
            <MessageCircle size={26} className="text-white" />
          </div>
          <span className="text-xs text-white font-medium">{comments.length}</span>
        </button>

        {/* 👤 Follow */}
        <button
          onClick={handleFollow}
          disabled={loadingFollow}
          className="flex flex-col items-center gap-1 group"
          aria-label="Follow chef"
        >
          <div className={`
            p-2 rounded-full transition-all duration-200
            ${followed ? "bg-amber-500/20" : "bg-white/10 group-hover:bg-white/20"}
            ${loadingFollow ? "opacity-50" : ""}
          `}>
            {followed
              ? <UserCheck size={26} className="text-amber-400" />
              : <UserPlus  size={26} className="text-white" />
            }
          </div>
          <span className={`text-xs font-medium ${followed ? "text-amber-400" : "text-white"}`}>
            {followed ? "Following" : "Follow"}
          </span>
        </button>

      </div>

      {/* ── COMMENT PANEL (slide up from bottom) ── */}
      <div
        className={`
          absolute inset-x-0 bottom-0 z-20
          bg-zinc-950/95 backdrop-blur-md
          rounded-t-3xl border-t border-white/10
          transition-transform duration-300 ease-out
          ${showComments ? "translate-y-0" : "translate-y-full"}
        `}
        style={{ maxHeight: "70vh", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <h3 className="text-white font-semibold text-base">
            Comments{" "}
            <span className="text-gray-500 text-sm font-normal">({comments.length})</span>
          </h3>
          <button
            onClick={() => setShowComments(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {comments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className={`flex items-start gap-3 group ${comment.isTemp ? "opacity-50" : ""}`}
              >
                {/* Avatar initial */}
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-xs font-bold uppercase">
                    {(comment.author || "U")[0]}
                  </span>
                </div>

                {/* Text block */}
                <div className="flex-1 min-w-0">
                  <p className="text-amber-400 text-xs font-semibold mb-0.5">
                    {comment.author || "User"}
                    {comment.isTemp && (
                      <span className="text-gray-600 font-normal ml-1">· sending…</span>
                    )}
                  </p>
                  <p className="text-gray-200 text-sm leading-snug break-words">{comment.text}</p>
                </div>

                {/* Delete — appears on hover, hidden while temp */}
                {!comment.isTemp && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-400 p-1 flex-shrink-0 mt-0.5"
                    aria-label="Delete comment"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Input row */}
        <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
            <input
              ref={inputRef}
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
              placeholder="Add a comment…"
              className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
            />
            <button
              onClick={onSend}
              disabled={!newComment.trim() || submitting}
              className={`
                p-1.5 rounded-full transition-all duration-200
                ${newComment.trim() && !submitting
                  ? "text-amber-400 hover:bg-amber-400/20"
                  : "text-gray-600 cursor-not-allowed"}
              `}
            >
              <Send size={18} className={submitting ? "animate-pulse" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop — tap anywhere outside panel to close */}
      {showComments && (
        <div className="absolute inset-0 z-10" onClick={() => setShowComments(false)} />
      )}

    </div>
  );
}