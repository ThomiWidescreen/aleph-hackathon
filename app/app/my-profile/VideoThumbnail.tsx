import { useRef, useEffect, useState } from "react";

const VideoThumbnail = ({ urlVideo }: { urlVideo?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current && !posterUrl) {
      // Extraer el primer frame del video como imagen
      const captureThumbnail = () => {
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0.1; // Captura en el segundo 0.1 para evitar pantalla negra
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            setPosterUrl(canvas.toDataURL("image/jpeg"));
          }
        }
      };
      videoRef.current.addEventListener("loadeddata", captureThumbnail);
    }
  }, [posterUrl]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (urlVideo) {
    return (
      <div className="aspect-video bg-[#ADADAD] rounded-lg mb-2 overflow-hidden">
        <video
          ref={videoRef}
          src={urlVideo}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handlePlayPause}
          muted
          playsInline
          preload="metadata"
          poster={posterUrl || "https://via.placeholder.com/300"} // Usa el thumbnail capturado o un placeholder
        />
      </div>
    );
  }

  // Placeholder si no hay video
  return (
    <div className="aspect-video bg-[#ADADAD] rounded-lg flex items-center justify-center mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-12 h-12 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
};

export default VideoThumbnail;