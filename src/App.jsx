// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import Login from "./pages/Login";
import Create from "./pages/Create";
import VideoSearch from "./video/VideoPage";
import MainLayout from "./layout/MainLayout";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoSearch />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}