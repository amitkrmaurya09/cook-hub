export default function VideoModal({ video, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 bg-red-500 text-white w-10 h-10 rounded-full"
      >
        ✕
      </button>

      {/* PLAYER */}
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          allowFullScreen
        />
      </div>

    </div>
  );
}