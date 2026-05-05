import { useState, useRef } from "react";
import { API } from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Clock, Leaf, Image, Video, Plus, Trash2, CheckCircle2, UploadCloud, X, GripVertical, Utensils } from "lucide-react";

const inp = "w-full bg-white border border-orange-200 focus:border-orange-500 text-gray-800 placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-orange-500/20 text-sm";
const CUISINES = ["Indian", "Italian", "Chinese", "Mexican", "Japanese", "Thai", "Mediterranean", "American", "French", "Other"];
const DIFF = { Easy: "border-green-400 bg-green-50 text-green-700", Medium: "border-yellow-400 bg-yellow-50 text-yellow-700", Hard: "border-red-400 bg-red-50 text-red-700" };

// ── Tiny reusable bits (not worth separate components) ──
const Lbl = ({ t }) => <p className="text-[10px] font-extrabold tracking-widest uppercase text-orange-500 mb-1.5">{t}</p>;

const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
      <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white text-sm">{icon}</div>
      <h3 className="text-[15px] font-bold text-orange-700" style={{ fontFamily: "'Playfair Display',serif" }}>{title}</h3>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

const UploadZone = ({ accept, icon, label, hint, onPick, preview, onClear, isVideo }) => (
  <div>
    {!preview ? (
      <button type="button" onClick={onPick}
        className="w-full border-2 border-dashed border-orange-200 hover:border-orange-500 rounded-xl p-6 flex flex-col items-center gap-2 transition-all group bg-orange-50/40">
        <div className="text-orange-300 group-hover:text-orange-500 transition-colors">{icon}</div>
        <p className="text-gray-400 text-xs">{hint}</p>
        <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">{label}</span>
      </button>
    ) : isVideo ? (
      <div className="relative rounded-xl overflow-hidden border border-orange-200 bg-black">
        <video src={preview} controls className="w-full h-40 object-contain" />
        <button type="button" onClick={onClear} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-red-50">
          <X size={12} className="text-gray-600" />
        </button>
      </div>
    ) : (
      <div className="relative rounded-xl overflow-hidden border border-orange-200">
        <img src={preview} className="w-full h-40 object-cover" alt="preview" />
        <button type="button" onClick={onClear} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-red-50">
          <X size={12} className="text-gray-600" />
        </button>
      </div>
    )}
  </div>
);

/* ═══════════════ MAIN ═══════════════ */
export default function Create() {
  const [form, setForm] = useState({ title: "", description: "", cuisine: "", time: "", difficulty: "Easy", servings: 2, veg: false });
  const [ings, setIngs] = useState([]);
  const [ingInput, setIngInput] = useState("");
  const [steps, setSteps] = useState([""]);
  const [media, setMedia] = useState({ image: null, video: null, imagePreview: null, videoPreview: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const imgRef = useRef(), vidRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pickMedia = (type, e) => {
    const file = e.target.files[0]; if (!file) return;
    if (type === "image" && file.size > 5e6) { alert("Image must be < 5MB"); return; }
    if (type === "video" && file.size > 100e6) { alert("Video must be < 100MB"); return; }
    setMedia(m => ({ ...m, [type]: file, [`${type}Preview`]: URL.createObjectURL(file) }));
  };
  const clearMedia = (type) => {
    if (media[`${type}Preview`]) URL.revokeObjectURL(media[`${type}Preview`]);
    setMedia(m => ({ ...m, [type]: null, [`${type}Preview`]: null }));
  };

  const addIng = () => {
    if (!ingInput.trim()) return;

    setIngs(prev => [...prev, ingInput.trim()]);
    setIngInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setMsg("Please enter a recipe title."); return; }
    if (ings.length === 0) { setMsg("Add at least one ingredient."); return; }
    if (!steps.some(s => s.trim())) { setMsg("Add at least one step."); return; }
    setLoading(true); setMsg("");
    try {
      let imageUrl = null, videoUrl = null;
      if (media.image) {
        const fd = new FormData(); 
        fd.append("image", media.image); 
        imageUrl = (await API.post("/recipe/upload", fd))
        .data.url; 
      }
      if (media.video) { 
        const fd = new FormData(); 
        fd.append("video", media.video); 
        console.log("video....")
        videoUrl = (await API.post("/recipe/upload-video", fd))
        .data.url; }
      console.log(videoUrl)
      await API.post("/recipe", { ...form, image: imageUrl, video: videoUrl, ingredients: ings, steps });
      setSuccess(true);
    } catch { setMsg("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  if (success) return (
    <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} className="text-orange-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>Recipe Published!</h2>
        <p className="text-gray-400 text-sm">Your dish is now live on CookHub.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm transition-colors">
          Create Another
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-10 px-4" style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-600 to-red-500 z-50" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center"><ChefHat size={16} className="text-white" /></div>
            <span className="text-[10px] tracking-widest uppercase text-orange-400 font-bold">CookHub</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>Create a Recipe</h1>
          <p className="text-gray-400 text-sm mt-1">Share your culinary story with the world.</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-5">

            {/* ── LEFT ── */}
            <div className="space-y-5">

              <Section icon={<Utensils size={14} />} title="Recipe Info">
                <div><Lbl t="Title *" />
                  <input className={inp} placeholder="e.g. Spicy Butter Chicken" value={form.title} onChange={e => set("title", e.target.value)} required />
                </div>
                <div><Lbl t="Description" />
                  <textarea className={`${inp} resize-none`} rows={3} placeholder="A short story about this dish…" value={form.description} onChange={e => set("description", e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div><Lbl t="Cuisine" />
                    <select className={`${inp} cursor-pointer`} value={form.cuisine} onChange={e => set("cuisine", e.target.value)}>
                      <option value="">Select</option>
                      {CUISINES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><Lbl t="Cooking Time" />
                    <div className="relative">
                      <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                      <input className={`${inp} pl-9`} placeholder="e.g. 30 mins" value={form.time} onChange={e => set("time", e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Servings */}
                  <div><Lbl t="Servings" />
                    <div className="flex items-center gap-2 border border-orange-200 rounded-xl px-3 py-2.5">
                      <button type="button" onClick={() => set("servings", Math.max(1, form.servings - 1))} className="w-6 h-6 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-orange-600 font-bold transition-colors">−</button>
                      <span className="flex-1 text-center text-gray-800 font-semibold text-sm">{form.servings}</span>
                      <button type="button" onClick={() => set("servings", form.servings + 1)} className="w-6 h-6 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-orange-600 font-bold transition-colors">+</button>
                    </div>
                  </div>
                  {/* Veg toggle */}
                  <div><Lbl t="Diet" />
                    <button type="button" onClick={() => set("veg", !form.veg)}
                      className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border transition-all h-[46px] ${form.veg ? "border-green-400 bg-green-50 text-green-700" : "border-orange-200 bg-white text-gray-500 hover:border-orange-400"}`}>
                      <Leaf size={14} className={form.veg ? "text-green-500" : "text-gray-400"} />
                      <span className="flex-1 text-left font-medium text-sm">Vegetarian</span>
                      <div className={`w-8 h-4 rounded-full relative transition-all ${form.veg ? "bg-green-500" : "bg-gray-200"}`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.veg ? "left-4" : "left-0.5"}`} />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Difficulty */}
                <div><Lbl t="Difficulty" />
                  <div className="flex gap-2">
                    {["Easy", "Medium", "Hard"].map(d => (
                      <button key={d} type="button" onClick={() => set("difficulty", d)}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${form.difficulty === d ? DIFF[d] : "border-gray-200 bg-white text-gray-400 hover:border-orange-300"}`}>
                        {d === "Easy" ? "🌱" : d === "Medium" ? "🔥" : "💀"} {d}
                      </button>
                    ))}
                  </div>
                </div>
              </Section>

              <Section icon={<Image size={14} />} title="Photos & Video">
                <div><Lbl t="Cover Image" />
                  <UploadZone icon={<UploadCloud size={24} />} label="Browse" hint="PNG, JPG, WEBP · max 5 MB"
                    preview={media.imagePreview} onPick={() => imgRef.current.click()} onClear={() => clearMedia("image")} isVideo={false} />
                  <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={e => pickMedia("image", e)} />
                </div>
                <div>
                  <Lbl t="Recipe Video" /><span className="text-[10px] text-gray-400 ml-1">(optional)</span>
                  <UploadZone icon={<Video size={24} />} label="Browse Video" hint="MP4, MOV, WEBM · max 100 MB"
                    preview={media.videoPreview} onPick={() => vidRef.current.click()} onClear={() => clearMedia("video")} isVideo={true} />
                  <input ref={vidRef} type="file" accept="video/*" className="hidden" onChange={e => pickMedia("video", e)} />
                </div>
              </Section>
            </div>

            {/* ── RIGHT ── */}
            <div className="space-y-5">

              <Section icon="🥕" title="Ingredients">
                <div className="flex gap-2">
                  <input
                    className={`${inp} w-24`}
                    placeholder="ingredient name"
                    value={ingInput}
                    onChange={e => setIngInput(e.target.value)}
                    onKeyDown={e =>
                      e.key === "Enter" && (e.preventDefault(), addIng())
                    }
                  />

                  <button
                    type="button"
                    onClick={addIng}
                    className="w-11 h-11 flex-shrink-0 rounded-xl bg-orange-600 hover:bg-orange-700 flex items-center justify-center transition-colors self-end"
                  >
                    <Plus size={17} className="text-white" />
                  </button>
                </div>

                {ings.length === 0 ? (
                  <div className="border-2 border-dashed border-orange-100 rounded-xl p-6 text-center text-gray-300 text-xs">
                    No ingredients added yet
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    <AnimatePresence>
                      {ings.map((ing, i) => (
                        <motion.div
                          key={i} // ✅ string array → use index
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5 group"
                        >
                          <GripVertical size={13} className="text-orange-300" />

                          <span className="text-orange-600 text-xs font-bold w-4">
                            {i + 1}.
                          </span>

                          <span className="text-gray-700 text-sm flex-1">
                            {ing}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setIngs(prev =>
                                prev.filter((_, index) => index !== i)
                              )
                            }
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={13} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {ings.length > 0 && (
                  <p className="text-xs text-orange-400 text-right">
                    {ings.length} ingredient{ings.length !== 1 ? "s" : ""}
                  </p>
                )}
              </Section>
              <Section icon="📝" title="Cooking Steps">
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  <AnimatePresence>
                    {steps.map((step, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex gap-2.5 items-start group">
                        <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1.5">{i + 1}</div>
                        <textarea value={step} rows={2} placeholder={`Describe step ${i + 1}…`}
                          onChange={e => setSteps(s => s.map((x, idx) => idx === i ? e.target.value : x))}
                          className={`${inp} flex-1 resize-none`} />
                        {steps.length > 1 && (
                          <button type="button" onClick={() => setSteps(s => s.filter((_, idx) => idx !== i))}
                            className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 flex-shrink-0">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <button type="button" onClick={() => setSteps(s => [...s, ""])} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                  <Plus size={14} /> Add Step
                </button>
              </Section>
            </div>
          </div>

          <AnimatePresence>
            {msg && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center">
                {msg}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.98 }}
            className="mt-6 w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-base rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
            style={{ fontFamily: "'Playfair Display',serif", letterSpacing: "0.02em" }}>
            {loading
              ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Publishing…</>
              : <><ChefHat size={18} /> Publish Recipe</>}
          </motion.button>
        </form>
      </div>
    </div>
  );
}