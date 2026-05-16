import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Section } from "./FormPrimitives";
import { inp } from "./constants";

export function CookingSteps({ steps, addStep, updateStep, removeStep }) {
  return (
    <Section icon="📝" title="Cooking Steps">

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        <AnimatePresence>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2.5 items-start group"
            >
              {/* Step number bubble */}
              <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center
                              text-white text-xs font-bold flex-shrink-0 mt-1.5">
                {i + 1}
              </div>

              {/* Textarea */}
              <textarea
                value={step}
                rows={2}
                placeholder={`Describe step ${i + 1}…`}
                onChange={e => updateStep(i, e.target.value)}
                className={`${inp} flex-1 resize-none`}
              />

              {/* Remove (only when more than 1 step) */}
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity
                             text-gray-400 hover:text-red-500 flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={addStep}
        className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors"
      >
        <Plus size={14} /> Add Step
      </button>

    </Section>
  );
}
