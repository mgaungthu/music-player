"use client";

import { useEffect } from "react";
import { usePlayer } from "@/context/PlayerContext";

interface RecommendedTracksProps {
  tracks: any[];
}

export default function RecommendedTracks({ tracks }: RecommendedTracksProps) {
  const { setCurrentUrl, setCurrentTrackInfo, setPlaylist } = usePlayer();

  useEffect(() => {
    if (tracks.length > 0) {
      const playlistData = tracks.map((t) => ({
        title: t.strTrack,
        artist: t.strArtist,
        url: t.strMusicVid,
        thumb: t.strTrackThumb,
      }));
      setPlaylist(playlistData);
    }
  }, [tracks, setPlaylist]);

  return (
    <div className="flex gap-4">
      {tracks.slice(0, 3).map((rec: any, i: number) => (
        <a
          key={i}
          onClick={() => {
            setCurrentUrl(rec.strMusicVid);
            setCurrentTrackInfo({
              title: rec.strTrack,
              artist: rec.strArtist,
              thumb:rec.strTrackThumb
            });
          }}
          href="#"
        >
          <div className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition">
            <img
              src={rec.strTrackThumb || "/placeholder.jpg"}
              alt={rec.strTrack}
              className="w-40 h-40 object-cover rounded-xl mb-2"
            />
            <p className="text-sm font-medium text-gray-800">{rec.strTrack}</p>
            <p className="text-xs text-gray-500">{rec.strArtist}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
