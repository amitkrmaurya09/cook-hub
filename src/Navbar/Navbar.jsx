import { useState, useEffect, useRef } from "react";
import AuthContainer from "../auth/AuthContainer";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleCreateClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      authRef.current.open();
    } else {
      authRef.current.openCreate();
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b">

        <div className="flex justify-between items-center px-8 py-4 max-w-6xl mx-auto">

          <Logo />

          <div className="flex items-center gap-6 text-sm font-medium">
            <NavLinks onCreate={handleCreateClick} />
            <AuthButtons isLoggedIn={isLoggedIn} authRef={authRef} />
          </div>

        </div>
      </div>

      <AuthContainer ref={authRef} />
    </>
  );
}