import VideoCard from "./VideoCard";

export default function VideoGrid({ videos, onSelect }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((v) => (
        <VideoCard key={v.id.videoId} video={v} onSelect={onSelect} />
      ))}
    </div>
  );
}