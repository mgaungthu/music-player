"use client";
import React, { createContext, useContext, useState } from "react";

interface PlayerContextProps {
  currentUrl: string | null;
  setCurrentUrl: (url: string | null) => void;
  currentTrackInfo: { title: string; artist: string } | null;
  setCurrentTrackInfo: (info: { title: string; artist: string, thumb:string } | null) => void;
  playlist: any[];
  setPlaylist: (list: any[]) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  goToNextTrack: () => any;
  goToPreviousTrack: () => any;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [currentTrackInfo, setCurrentTrackInfo] = useState<{ title: string; artist: string , thumb : string} | null>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextTrack = () => {
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    const next = playlist[nextIndex];
    setCurrentUrl(next.url);
    console.log(next, 'ere')
    setCurrentTrackInfo({ title: next.title, artist: next.artist, thumb: next.thumb });
  };

  const previousTrack = () => {
    if (playlist.length === 0) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    const prev = playlist[prevIndex];
    setCurrentUrl(prev.url);
    setCurrentTrackInfo({ title: prev.title, artist: prev.artist, thumb: prev.thumb });
  };

  const goToNextTrack = () => {
    if (playlist.length === 0) return null;
    const nextIndex = (currentIndex + 1) % playlist.length;
    return playlist[nextIndex];
  };

  const goToPreviousTrack = () => {
    if (playlist.length === 0) return null;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    return playlist[prevIndex];
  };

  return (
    <PlayerContext.Provider
      value={{
        currentUrl,
        setCurrentUrl,
        currentTrackInfo,
        setCurrentTrackInfo,
        playlist,
        setPlaylist,
        nextTrack,
        previousTrack,
        goToNextTrack,
        goToPreviousTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};