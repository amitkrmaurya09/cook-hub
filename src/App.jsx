// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import Login from "./pages/Login";
import Create from "./pages/Create";
import VideoSearch from "./video/VideoPage";
import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Feed from "./feed/FeedPage";

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<VideoSearch />} />
            <Route path='/feed' element={<Feed />} />
            <Route path="/create" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}