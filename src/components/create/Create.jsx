import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, CheckCircle2 } from "lucide-react";

import { useRecipeForm }  from "./useRecipeForm";
import { RecipeInfo }     from "./RecipeInfo";
import { MediaUpload }    from "./MediaUpload";
import { Ingredients }    from "./Ingredients";
import { CookingSteps }   from "./CookingSteps";
import {useState, useEffect } from "react";

const FONTS =
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600" +
  "&family=Playfair+Display:wght@600;700&display=swap";

/* ── Success screen ─────────────────────────────────────────────────────────── */
function SuccessScreen() {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <link href={FONTS} rel="stylesheet" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 rounded-full bg-orange-100 border-2 border-orange-400
                     flex items-center justify-center mx-auto"
        >
          <CheckCircle2 size={36} className="text-orange-600" />
        </motion.div>
        <h2
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Recipe Published!
        </h2>
        <p className="text-gray-400 text-sm">Your dish is now live on CookHub.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Create Another
        </button>
      </motion.div>
    </div>
  );
}

/* ── Page header ────────────────────────────────────────────────────────────── */
function PageHeader(data) {
  // console.log("data form header", data)
  return (
    <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center">
          <ChefHat size={16} className="text-white" />
        </div>
        <span className="text-[10px] tracking-widest uppercase text-orange-400 font-bold">CookHub</span>
      </div>
      <h1
        className="text-4xl font-bold text-gray-900"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {data ? "Edit" : "Create"} a Recipe
      </h1>
      <p className="text-gray-400 text-sm mt-1">Share your culinary story with the world.</p>
    </motion.div>
  );
}

/* ── Submit button ──────────────────────────────────────────────────────────── */
function SubmitButton({ loading }) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      className="mt-6 w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50
                 text-white font-bold text-base rounded-2xl transition-colors
                 flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
      style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.02em" }}
    >
      {loading ? (
        <>
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Publishing…
        </>
      ) : (
        <>
          <ChefHat size={18} /> Publish Recipe
        </>
      )}
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CREATE PAGE  —  thin orchestrator, zero business logic here
══════════════════════════════════════════════════════════════════════════════ */
export default function Create(editRecipe) {
  
  const recipe = useRecipeForm();
  // const [isData, setData] = useState(null);
  // useEffect(()=>{
  //   setData(editRecipe.editData)
  // },[editRecipe])
  // console.log("edit-Recipe",isData)
  console.log("recipe made", editRecipe)
  if (recipe.success) return <SuccessScreen />;

  return (
    <div
      className="min-h-screen bg-white py-10 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <link href={FONTS} rel="stylesheet" />

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-600 to-red-500 z-50" />

      <div className="max-w-5xl mx-auto">
        <PageHeader data={editRecipe} />

        <form onSubmit={recipe.handleSubmit}>
          <div className="grid md:grid-cols-2 gap-5">

            {/* ── LEFT column ── */}
            <div className="space-y-5">
              <RecipeInfo
                form={recipe.form}
                setField={recipe.setField}
                incrementServings={recipe.incrementServings}
                decrementServings={recipe.decrementServings}
                toggleVeg={recipe.toggleVeg}
              />
              <MediaUpload
                media={recipe.media}
                imgRef={recipe.imgRef}
                vidRef={recipe.vidRef}
                pickMedia={recipe.pickMedia}
                clearMedia={recipe.clearMedia}
              />
            </div>

            {/* ── RIGHT column ── */}
            <div className="space-y-5">
              <Ingredients
                ings={recipe.ings}
                ingInput={recipe.ingInput}
                setIngInput={recipe.setIngInput}
                addIngredient={recipe.addIngredient}
                removeIngredient={recipe.removeIngredient}
              />
              <CookingSteps
                steps={recipe.steps}
                addStep={recipe.addStep}
                updateStep={recipe.updateStep}
                removeStep={recipe.removeStep}
              />
            </div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {recipe.msg && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 text-sm text-red-600 bg-red-50 border border-red-200
                           rounded-xl px-4 py-3 text-center"
              >
                {recipe.msg}
              </motion.p>
            )}
          </AnimatePresence>

          <SubmitButton loading={recipe.loading} />
        </form>
      </div>
    </div>
  );
}
