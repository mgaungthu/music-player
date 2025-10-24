"use client";

import { usePlayer } from "@/context/PlayerContext";
import NativeAudioPlayer from "./NativeAudioPlayer";

export default function PlayerBar() {
  const { currentUrl, currentTrackInfo, nextTrack, previousTrack } =
    usePlayer();

  return (
    <NativeAudioPlayer
      currentUrl={currentUrl || undefined}
      currentTrackInfo={currentTrackInfo}
      goToNextTrack={nextTrack}
      goToPreviousTrack={previousTrack}
    />
  );
}
