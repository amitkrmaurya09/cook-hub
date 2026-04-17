import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";

export default function MainLayout() {
  return (
    <div>
      {/* <Navbar /> */}
      <Home />
    </div>
  );
}