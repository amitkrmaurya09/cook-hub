/**
 * useFeedStorage.js
 *
 * All state (likes, follows, comments) is persisted in localStorage.
 * API calls are commented out — uncomment when backend is ready.
 *
 * localStorage keys:
 *   cookhub_likes      → { [recipeId]: boolean }
 *   cookhub_likeCounts → { [recipeId]: number  }
 *   cookhub_follows    → { [authorId]: boolean }
 *   cookhub_comments   → { [recipeId]: Comment[] }
 */

import { useState, useCallback } from "react";
// import { API } from "../api/axios"; // 🔌 Uncomment when backend is ready

/* ─── localStorage helpers ───────────────────────────────────── */
const lsGet = (key, fallback = {}) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const lsSet = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const KEYS = {
  likes:      "cookhub_likes",
  likeCounts: "cookhub_likeCounts",
  follows:    "cookhub_follows",
  comments:   "cookhub_comments",
};

/* ─── normalise legacy string comments → objects ─────────────── */
const normalise = (raw = []) =>
  raw.map((c, i) =>
    typeof c === "string"
      ? { _id: `legacy_${i}`, text: c, author: "Chef" }
      : c
  );

/* ═══════════════════════════════════════════════════════════════
   HOOK
═══════════════════════════════════════════════════════════════ */
export function useFeedStorage(recipe) {
  const id       = recipe._id;
  const authorId = recipe.authorId;

  /* ── init from localStorage, fallback to recipe prop ── */
  const [liked, setLikedState] = useState(() => {
    const stored = lsGet(KEYS.likes);
    return id in stored ? stored[id] : (recipe.likedByMe ?? false);
  });

  const [likesCount, setLikesCountState] = useState(() => {
    const stored = lsGet(KEYS.likeCounts);
    return id in stored ? stored[id] : (recipe.likes ?? 0);
  });

  const [followed, setFollowedState] = useState(() => {
    const stored = lsGet(KEYS.follows);
    return authorId in stored ? stored[authorId] : (recipe.followedByMe ?? false);
  });

  const [comments, setCommentsState] = useState(() => {
    const stored = lsGet(KEYS.comments);
    return id in stored ? stored[id] : normalise(recipe.comments);
  });

  /* ── sync helpers: update React state + localStorage together ── */
  const setLiked = useCallback((val) => {
    setLikedState(val);
    lsSet(KEYS.likes, { ...lsGet(KEYS.likes), [id]: val });
  }, [id]);

  const setLikesCount = useCallback((updater) => {
    setLikesCountState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      lsSet(KEYS.likeCounts, { ...lsGet(KEYS.likeCounts), [id]: next });
      return next;
    });
  }, [id]);

  const setFollowed = useCallback((val) => {
    setFollowedState(val);
    lsSet(KEYS.follows, { ...lsGet(KEYS.follows), [authorId]: val });
  }, [authorId]);

  const setComments = useCallback((updater) => {
    setCommentsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      lsSet(KEYS.comments, { ...lsGet(KEYS.comments), [id]: next });
      return next;
    });
  }, [id]);

  /* ══════════════════════════════════════════════════════════════
     LIKE / UNLIKE  — localStorage only
     🔌 TODO: uncomment API block when backend is ready
  ══════════════════════════════════════════════════════════════ */
  const handleLike = useCallback(() => {
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((c) => (wasLiked ? c - 1 : c + 1));

    // 🔌 API — uncomment when backend is ready:
    // (async () => {
    //   try {
    //     await API.post(`/recipe/${id}/like`);
    //   } catch (err) {
    //     console.error("[Like] API error — rolling back", err);
    //     setLiked(wasLiked);
    //     setLikesCount((c) => (wasLiked ? c + 1 : c - 1));
    //   }
    // })();
  }, [liked, setLiked, setLikesCount]);

  /* ══════════════════════════════════════════════════════════════
     FOLLOW / UNFOLLOW  — localStorage only
     🔌 TODO: uncomment API block when backend is ready
  ══════════════════════════════════════════════════════════════ */
  const handleFollow = useCallback(() => {
    const wasFollowed = followed;
    setFollowed(!wasFollowed);

    // 🔌 API — uncomment when backend is ready:
    // (async () => {
    //   try {
    //     await API.post(`/user/${authorId}/follow`);
    //   } catch (err) {
    //     console.error("[Follow] API error — rolling back", err);
    //     setFollowed(wasFollowed);
    //   }
    // })();
  }, [followed, setFollowed]);

  /* ══════════════════════════════════════════════════════════════
     ADD COMMENT  — localStorage only
     🔌 TODO: uncomment API block when backend is ready
  ══════════════════════════════════════════════════════════════ */
  const [submitting] = useState(false); // will be true during API call

  const handleAddComment = useCallback((text) => {
    const trimmed = text?.trim();
    if (!trimmed) return false;

    const newComment = {
      _id:    `local_${Date.now()}`,
      text:   trimmed,
      author: "You",
    };

    setComments((prev) => [...prev, newComment]);

    // 🔌 API — uncomment when backend is ready:
    // setSubmitting(true);
    // (async () => {
    //   try {
    //     const res  = await API.post(`/recipe/${id}/comment`, { text: trimmed });
    //     const saved = res.data?.comment ?? newComment;
    //     // swap local entry with real server comment (gets a real _id)
    //     setComments((prev) =>
    //       prev.map((c) => (c._id === newComment._id ? saved : c))
    //     );
    //   } catch (err) {
    //     console.error("[AddComment] API error — rolling back", err);
    //     setComments((prev) => prev.filter((c) => c._id !== newComment._id));
    //     return false;
    //   } finally {
    //     setSubmitting(false);
    //   }
    // })();

    return true;
  }, [setComments]);

  /* ══════════════════════════════════════════════════════════════
     DELETE COMMENT  — localStorage only
     🔌 TODO: uncomment API block when backend is ready
  ══════════════════════════════════════════════════════════════ */
  const handleDeleteComment = useCallback((commentId) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));

    // 🔌 API — uncomment when backend is ready:
    // const backup = comments.slice();
    // (async () => {
    //   try {
    //     await API.delete(`/recipe/${id}/comment/${commentId}`);
    //   } catch (err) {
    //     console.error("[DeleteComment] API error — rolling back", err);
    //     setComments(backup);
    //   }
    // })();
  }, [setComments]);

  return {
    liked,
    likesCount,
    followed,
    comments,
    submitting,
    handleLike,
    handleFollow,
    handleAddComment,
    handleDeleteComment,
  };
}