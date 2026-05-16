import { X, UploadCloud } from "lucide-react";

/** Tiny uppercase label above form fields */
export const Lbl = ({ t }) => (
  <p className="text-[10px] font-extrabold tracking-widest uppercase text-orange-500 mb-1.5">
    {t}
  </p>
);

/** Titled card wrapper used by every feature section */
export const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
      <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white text-sm">
        {icon}
      </div>
      <h3
        className="text-[15px] font-bold text-orange-700"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

/** Drag-and-drop style file picker with inline preview */
export const UploadZone = ({ icon, label, hint, onPick, preview, onClear, isVideo }) => {
  if (!preview) {
    return (
      <button
        type="button"
        onClick={onPick}
        className="w-full border-2 border-dashed border-orange-200 hover:border-orange-500
                   rounded-xl p-6 flex flex-col items-center gap-2 transition-all group bg-orange-50/40"
      >
        <div className="text-orange-300 group-hover:text-orange-500 transition-colors">{icon}</div>
        <p className="text-gray-400 text-xs">{hint}</p>
        <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
          {label}
        </span>
      </button>
    );
  }

  const ClearBtn = () => (
    <button
      type="button"
      onClick={onClear}
      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 border border-gray-200
                 flex items-center justify-center hover:bg-red-50"
    >
      <X size={12} className="text-gray-600" />
    </button>
  );

  if (isVideo) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-orange-200 bg-black">
        <video src={preview} controls className="w-full h-40 object-contain" />
        <ClearBtn />
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-orange-200">
      <img src={preview} className="w-full h-40 object-cover" alt="preview" />
      <ClearBtn />
    </div>
  );
};
