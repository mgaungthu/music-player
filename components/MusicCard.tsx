import { Play } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  color: string;
}

export default function MusicCard({ title, subtitle, color }: Props) {
  return (
    <div
      className="relative flex flex-col justify-start rounded-2xl p-8 h-80 w-full text-white overflow-hidden"
      style={{ background: color }}
    >
      <h1 className="text-7xl font-bold">{title}</h1>
      <p className="opacity-75">{subtitle}</p>

      {/* Play Button */}
      <button
        className="absolute bottom-6 left-6 w-14 h-14 rounded-full bg-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <Play size={28} className="text-pinkGrad" />
      </button>
    </div>
  );
}