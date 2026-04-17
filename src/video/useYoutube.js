import { useState } from "react";
import { API } from "../api/axios";

export default function useYoutube() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (query = "trending recipes") => {
    setLoading(true);

    try {
      const res = await API.get("http://localhost:8000//youtube/videos", {
        params: { q: query },
      });

      setVideos(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, fetchVideos };
}