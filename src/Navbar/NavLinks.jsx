import { Link, useLocation } from "react-router-dom";

export default function NavLinks({ onCreate }) {
  const { pathname } = useLocation();

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
      {navLink("/", "Home")}
      {navLink("/videos", "Videos")}
      <button
        onClick={onCreate}
        className="px-3 py-1 text-gray-500 hover:text-black"
      >
        Create
      </button>
    </>
  );
}