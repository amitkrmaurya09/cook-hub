import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AuthContainer from "./Modal/ModalContainer";

export default function Navbar() {
  const { pathname } = useLocation();
  const [dark, setDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleCreateClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      authRef.current.open(); // login modal
    } else {
      authRef.current.openCreate(); // 🔥 create modal
    }
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`relative px-3 py-1 transition 
        ${pathname === to ? "text-black dark:text-white" : "text-gray-500"}
        hover:text-black dark:hover:text-white group`}
    >
      {label}
      <span
        className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300
        ${pathname === to ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  );

  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">

        <div className="flex justify-between items-center px-8 py-4 max-w-6xl mx-auto">

          {/* Logo */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            🍳 CookHub
          </h1>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium">
            {navLink("/", "Home")}

            <button
              onClick={() => handleCreateClick()}
              className="relative px-3 py-1 text-gray-500 hover:text-black"
            >
              Create
            </button>

            {/* 🔥 Only trigger */}
            {isLoggedIn ? (
              <button
                onClick={() => authRef.current.openProfile()}
                className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center"
              >
                👤
              </button>
            ) : (
              <button
                onClick={() => authRef.current.open()}
                className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white"
              >
                Login
              </button>
            )}

          </div>
        </div>
      </div>

      {/* 🔥 Auth System Mounted Once */}
      {/* <AuthContainer ref={authRef} /> */}
    </>
  );
}