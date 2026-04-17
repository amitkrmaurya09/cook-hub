import { useEffect, useState } from "react";
import useYoutube from "./useYoutube";
import VideoGrid from "./VideoGrid";
import VideoSearch from "./VideoSearch";
import CategoryBar from "./CategoryBar";
import VideoModal from "./VideoModal";

export default function VideoPage() {
  const { videos, loading, fetchVideos } = useYoutube();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchVideos(); // 🔥 trending by default
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      <VideoSearch onSearch={fetchVideos} />
      <CategoryBar onSelect={fetchVideos} />

      <VideoGrid videos={videos} onSelect={setSelected} />

      {selected && (
        <VideoModal video={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}