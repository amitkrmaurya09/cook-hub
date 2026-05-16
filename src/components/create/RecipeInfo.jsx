import { Clock, Leaf, Utensils } from "lucide-react";
import { Lbl, Section } from "./FormPrimitives";
import { inp, CUISINES, DIFFICULTY_STYLES, DIFFICULTY_ICONS } from "./constants";

export function RecipeInfo({ form, setField, incrementServings, decrementServings, toggleVeg }) {
  return (
    <Section icon={<Utensils size={14} />} title="Recipe Info">

      {/* Title */}
      <div>
        <Lbl t="Title *" />
        <input
          className={inp}
          placeholder="e.g. Spicy Butter Chicken"
          value={form.title}
          onChange={e => setField("title", e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Lbl t="Description" />
        <textarea
          className={`${inp} resize-none`}
          rows={3}
          placeholder="A short story about this dish…"
          value={form.description}
          onChange={e => setField("description", e.target.value)}
        />
      </div>

      {/* Cuisine + Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Lbl t="Cuisine" />
          <select
            className={`${inp} cursor-pointer`}
            value={form.cuisine}
            onChange={e => setField("cuisine", e.target.value)}
          >
            <option value="">Select</option>
            {CUISINES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <Lbl t="Cooking Time" />
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
            <input
              className={`${inp} pl-9`}
              placeholder="e.g. 30 mins"
              value={form.time}
              onChange={e => setField("time", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Servings + Veg */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Lbl t="Servings" />
          <div className="flex items-center gap-2 border border-orange-200 rounded-xl px-3 py-2.5">
            <button
              type="button"
              onClick={decrementServings}
              className="w-6 h-6 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center
                         justify-center text-orange-600 font-bold transition-colors"
            >
              −
            </button>
            <span className="flex-1 text-center text-gray-800 font-semibold text-sm">
              {form.servings}
            </span>
            <button
              type="button"
              onClick={incrementServings}
              className="w-6 h-6 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center
                         justify-center text-orange-600 font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <Lbl t="Diet" />
          <button
            type="button"
            onClick={toggleVeg}
            className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border transition-all h-[46px]
              ${form.veg
                ? "border-green-400 bg-green-50 text-green-700"
                : "border-orange-200 bg-white text-gray-500 hover:border-orange-400"
              }`}
          >
            <Leaf size={14} className={form.veg ? "text-green-500" : "text-gray-400"} />
            <span className="flex-1 text-left font-medium text-sm">Vegetarian</span>
            <div className={`w-8 h-4 rounded-full relative transition-all ${form.veg ? "bg-green-500" : "bg-gray-200"}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.veg ? "left-4" : "left-0.5"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <Lbl t="Difficulty" />
        <div className="flex gap-2">
          {Object.keys(DIFFICULTY_STYLES).map(d => (
            <button
              key={d}
              type="button"
              onClick={() => setField("difficulty", d)}
              className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all
                ${form.difficulty === d
                  ? DIFFICULTY_STYLES[d]
                  : "border-gray-200 bg-white text-gray-400 hover:border-orange-300"
                }`}
            >
              {DIFFICULTY_ICONS[d]} {d}
            </button>
          ))}
        </div>
      </div>

    </Section>
  );
}
