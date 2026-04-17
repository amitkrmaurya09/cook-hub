export default function VideoCard({ video, onSelect }) {
  return (
    <div
      onClick={() => onSelect(video)}
      className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
    >
      <img
        src={video.snippet.thumbnails.high.url}
        className="w-full h-40 object-cover"
      />

      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">
          {video.snippet.title}
        </h3>
        <p className="text-xs text-gray-500">
          {video.snippet.channelTitle}
        </p>
      </div>
    </div>
  );
}