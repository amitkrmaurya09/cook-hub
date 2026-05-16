import { useState, useRef } from "react";
import { API } from "../../api/axios";
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES } from "./constants";

const INITIAL_FORM = {
  title: "", description: "", cuisine: "",
  time: "", difficulty: "Easy", servings: 2, veg: false,
};

/**
 * Owns every piece of Create-page state and exposes clean handlers.
 * The component layer only calls these — no raw setters leak out.
 */
export function useRecipeForm(editData = null) {
  // ── core fields ──
  const [form, setForm] = useState({
    title: editData?.title ?? "",
    description: editData?.description ?? "",
    cuisine: editData?.cuisine ?? "",
    time: editData?.time ?? "",
    difficulty: editData?.difficulty ?? "Easy",
    servings: editData?.servings ?? 2,
    veg: editData?.veg ?? false,
  });
  const [ings, setIngs] = useState(editData?.ingredients ?? []);
  const [ingInput, setIngInput] = useState("");
  const [steps, setSteps] = useState(editData?.steps.length ? editData.steps : [""]);
  const [media, setMedia] = useState({
    image: null,
    video: null,
    imagePreview: editData?.image ?? null,
    videoPreview: editData?.video ?? null,
  });

  // ── UI state ──
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  // ── hidden file inputs ──
  const imgRef = useRef();
  const vidRef = useRef();

  // ── form field helpers ─────────────────────────────────────────────────────
  const setField = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const incrementServings = () => setField("servings", form.servings + 1);
  const decrementServings = () => setField("servings", Math.max(1, form.servings - 1));
  const toggleVeg = () => setField("veg", !form.veg);

  // ── media helpers ──────────────────────────────────────────────────────────
  const pickMedia = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image" && file.size > MAX_IMAGE_BYTES) {
      alert("Image must be < 5 MB"); return;
    }
    if (type === "video" && file.size > MAX_VIDEO_BYTES) {
      alert("Video must be < 100 MB"); return;
    }

    setMedia(m => ({
      ...m,
      [type]: file,
      [`${type}Preview`]: URL.createObjectURL(file),
    }));
  };

  const clearMedia = (type) => {
    if (media[`${type}Preview`]) URL.revokeObjectURL(media[`${type}Preview`]);
    setMedia(m => ({ ...m, [type]: null, [`${type}Preview`]: null }));
  };

  // ── ingredient helpers ─────────────────────────────────────────────────────
  const addIngredient = () => {
    if (!ingInput.trim()) return;
    setIngs(prev => [...prev, ingInput.trim()]);
    setIngInput("");
  };

  const removeIngredient = (index) =>
    setIngs(prev => prev.filter((_, i) => i !== index));

  // ── step helpers ───────────────────────────────────────────────────────────
  const addStep = () => setSteps(s => [...s, ""]);

  const updateStep = (index, value) =>
    setSteps(s => s.map((x, i) => (i === index ? value : x)));

  const removeStep = (index) =>
    setSteps(s => s.filter((_, i) => i !== index));

  // ── submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) { setMsg("Please enter a recipe title."); return; }
    if (ings.length === 0) { setMsg("Add at least one ingredient."); return; }
    if (!steps.some(s => s.trim())) { setMsg("Add at least one step."); return; }

    setLoading(true);
    setMsg("");

    try {
      let imageUrl = null, videoUrl = null;

      if (media.image) {
        const fd = new FormData();
        fd.append("image", media.image);
        imageUrl = (await API.post("/recipe/upload", fd)).data.url;
      }
      if (media.video) {
        const fd = new FormData();
        fd.append("video", media.video);
        videoUrl = (await API.post("/recipe/upload-video", fd)).data.url;
      }

      if (editData) {
        await API.put(`/recipe/${editData._id}`, { ...form, image: imageUrl, video: videoUrl, ingredients: ings, steps });
      } else {
        await API.post("/recipe", { ...form, image: imageUrl, video: videoUrl, ingredients: ings, steps });
      }
      
      setSuccess(true);
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // state
    form, ings, ingInput, steps, media, loading, success, msg,
    // refs
    imgRef, vidRef,
    // handlers
    setField, incrementServings, decrementServings, toggleVeg,
    pickMedia, clearMedia,
    setIngInput, addIngredient, removeIngredient,
    addStep, updateStep, removeStep,
    handleSubmit,
  };
}
