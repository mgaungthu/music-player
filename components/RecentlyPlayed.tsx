"use client";

import { Heart } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

export default function RecentlyPlayed({ tracks }: { tracks: any[] }) {
  const { setCurrentUrl, setCurrentTrackInfo } = usePlayer();

  return (
    <div>
      <h3 className="text-black font-semibold mb-3">Recently Played</h3>
      <div className="space-y-3">
        {tracks.length > 0 ? (
          tracks.map((song: any, i: number) => (
            <div
              key={i}
              onClick={() => {
                setCurrentUrl(song.strMusicVid);
                setCurrentTrackInfo({
                  title: song.strTrack,
                  artist: song.strArtist,
                  thumb: song.strTrackThumb,
                });
              }}
              className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={song.strTrackThumb || "/placeholder.jpg"}
                  alt={song.strTrack}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{song.strTrack}</p>
                  <p className="text-xs text-gray-500">{song.strArtist}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  {song.intDuration
                    ? `${Math.floor(song.intDuration / 60000)}:${(
                        (song.intDuration % 60000) /
                        1000
                      )
                        .toFixed(0)
                        .padStart(2, "0")}`
                    : "–:–"}
                </span>
                <Heart
                  size={18}
                  className="text-gray-400 hover:text-pinkGrad cursor-pointer"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No songs found</p>
        )}
      </div>
    </div>
  );
}
