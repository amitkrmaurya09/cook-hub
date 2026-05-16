import { Image, Video, UploadCloud } from "lucide-react";
import { Lbl, Section, UploadZone } from "./FormPrimitives";

export function MediaUpload({ media, imgRef, vidRef, pickMedia, clearMedia }) {
  return (
    <Section icon={<Image size={14} />} title="Photos & Video">

      {/* Cover image */}
      <div>
        <Lbl t="Cover Image" />
        <UploadZone
          icon={<UploadCloud size={24} />}
          label="Browse"
          hint="PNG, JPG, WEBP · max 5 MB"
          preview={media.imagePreview}
          onPick={() => imgRef.current.click()}
          onClear={() => clearMedia("image")}
          isVideo={false}
        />
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => pickMedia("image", e)}
        />
      </div>

      {/* Recipe video */}
      <div>
        <div className="flex items-center gap-1 mb-1.5">
          <Lbl t="Recipe Video" />
          <span className="text-[10px] text-gray-400">(optional)</span>
        </div>
        <UploadZone
          icon={<Video size={24} />}
          label="Browse Video"
          hint="MP4, MOV, WEBM · max 100 MB"
          preview={media.videoPreview}
          onPick={() => vidRef.current.click()}
          onClear={() => clearMedia("video")}
          isVideo={true}
        />
        <input
          ref={vidRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={e => pickMedia("video", e)}
        />
      </div>

    </Section>
  );
}
