import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Section } from "./FormPrimitives";
import { inp } from "./constants";

export function Ingredients({ ings, ingInput, setIngInput, addIngredient, removeIngredient }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <Section icon="🥕" title="Ingredients">

      {/* Input row */}
      <div className="flex gap-2">
        <input
          className={`${inp} flex-1`}
          placeholder="e.g. 2 cups basmati rice"
          value={ingInput}
          onChange={e => setIngInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addIngredient}
          className="w-11 h-11 flex-shrink-0 rounded-xl bg-orange-600 hover:bg-orange-700
                     flex items-center justify-center transition-colors self-end"
        >
          <Plus size={17} className="text-white" />
        </button>
      </div>

      {/* Empty state */}
      {ings.length === 0 ? (
        <div className="border-2 border-dashed border-orange-100 rounded-xl p-6 text-center text-gray-300 text-xs">
          No ingredients added yet
        </div>
      ) : (
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          <AnimatePresence>
            {ings.map((ing, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="flex items-center gap-2 bg-orange-50 border border-orange-100
                           rounded-xl px-3 py-2.5 group"
              >
                <GripVertical size={13} className="text-orange-300" />
                <span className="text-orange-600 text-xs font-bold w-4">{i + 1}.</span>
                <span className="text-gray-700 text-sm flex-1">{ing}</span>
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Counter */}
      {ings.length > 0 && (
        <p className="text-xs text-orange-400 text-right">
          {ings.length} ingredient{ings.length !== 1 ? "s" : ""}
        </p>
      )}

    </Section>
  );
}
