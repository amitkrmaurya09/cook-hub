import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const AuthModal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => dialog.current.showModal(),
      close: () => dialog.current.close()
    };
  });

  return createPortal(
    <dialog className="bg-gray-200 p-6 rounded-xl " ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default AuthModal;