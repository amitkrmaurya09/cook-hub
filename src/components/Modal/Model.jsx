import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const AuthModal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => dialog.current.showModal(),
      close: () => dialog.current.close(),
    };
  });

  return createPortal(
    <dialog
      className="px-0 rounded-2xl"
      ref={dialog}
    >
      {/* ❌ CLOSE BUTTON */}
      <button
        onClick={() => dialog.current.close()}
        className="absolute top-2 right-1 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-110 transition z-20"
      >
        <X size={22} />
      </button>

      {/* CONTENT */}
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default AuthModal;