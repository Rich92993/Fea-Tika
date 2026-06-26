type GuitarVideoCardProps = {
  title: string;
  videoId: string;
  level: string;
  description: string;
};

export default function GuitarVideoCard({ title, videoId, level, description }: GuitarVideoCardProps) {
  return (
    <div className="group flex flex-col gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all hover:-translate-y-1">
      {/* Responsive YouTube Embed */}
      <div className="relative w-full aspect-video bg-black/50">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Info */}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            {level}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white drop-shadow-md">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
