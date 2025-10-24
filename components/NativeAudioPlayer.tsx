"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Youtube } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}


export default function YouTubePlayer({
  currentUrl,
  currentTrackInfo,
  goToNextTrack,
  goToPreviousTrack,
}: {
  currentUrl?: string;
  currentTrackInfo: any;
  goToNextTrack?: () => void;
  goToPreviousTrack?: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const playerRef = useRef<any>(null);

 

  // Extract YouTube ID from URL
const getYouTubeId = (url?: string | null) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
};

console.log(currentTrackInfo)

  // Load YouTube IFrame API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load new video when currentUrl changes
  useEffect(() => {
    if (
      currentUrl &&
      typeof window !== "undefined" &&
      window.YT &&
      playerRef.current &&
      typeof playerRef.current.loadVideoById === "function"
    ) {
      const id = getYouTubeId(currentUrl);
      if (id) playerRef.current.loadVideoById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl]);

  const initializePlayer = () => {
    if (
      typeof window === "undefined" ||
      !window.YT ||
      !document.getElementById("youtube-player")
    )
      return;

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId:
        currentUrl && getYouTubeId(currentUrl)
          ? getYouTubeId(currentUrl)
          : "08DjMT-qR9g",
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
      } as any,
      events: {
        onReady: (event: any) => {
          setIsReady(true);
          setDuration(event.target.getDuration());
          event.target.setVolume(volume);
        },
        onStateChange: (event: any) => {
          if (!window.YT) return;
          switch (event.data) {
            case window.YT.PlayerState.PLAYING:
              setIsPlaying(true);
              startProgressTimer();
              break;
            case window.YT.PlayerState.PAUSED:
            case window.YT.PlayerState.ENDED:
              setIsPlaying(false);
              break;
          }
        },
      },
    });
  };

  const startProgressTimer = () => {
    const timer = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(timer);
  };

  const handlePlayPause = () => {
    if (!isReady || !playerRef.current) return;
    if (isPlaying) {
      if (typeof playerRef.current.pauseVideo === "function") {
        playerRef.current.pauseVideo();
      }
    } else {
      if (typeof playerRef.current.playVideo === "function") {
        playerRef.current.playVideo();
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isReady || duration === 0 || !playerRef.current) return;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressBarWidth = progressBar.clientWidth;
    const seekTo = (clickPosition / progressBarWidth) * duration;
    if (typeof playerRef.current.seekTo === "function") {
      playerRef.current.seekTo(seekTo, true);
    }
    setCurrentTime(seekTo);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (playerRef.current && typeof playerRef.current.setVolume === "function") {
      playerRef.current.setVolume(newVolume);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-linear-to-r from-pink-700 to-pink-600 text-white border-t border-pink-500 shadow-lg">
      {/* Hidden YouTube Player */}
      {/* <div id="youtube-player"></div> */}
      
      {/* Progress Bar */}
      {/* <div 
        className="w-full h-1.5 bg-pink-800 cursor-pointer group"
        onClick={handleSeek}
      >
          <div id="youtube-player"></div>
      </div> */}

      <div id="youtube-player"></div>

      {/* Player Controls */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Track Info */}
        <div className="hidden md:flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            {currentTrackInfo?.thumbnail || currentTrackInfo?.thumb ? (
              <img
                src={currentTrackInfo.thumbnail || currentTrackInfo.thumb}
                alt={currentTrackInfo.title || "Track Thumbnail"}
                className="w-14 h-14 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="w-14 h-14 bg-pink-500 rounded-lg flex items-center justify-center shadow-md">
                <Youtube size={24} />
              </div>
            )}
            <div>
              <p className="font-semibold text-sm">
                {currentTrackInfo?.title || "Select a track to play"}
              </p>
              <span className="text-xs text-pink-200">
                {currentTrackInfo?.artist || "No artist information"}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Youtube size={12} className="text-pink-300" />
                <span className="text-xs text-pink-300">YouTube</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex flex-col items-center flex-1 max-w-md">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => goToPreviousTrack && goToPreviousTrack()}
              className="text-pink-200 hover:text-white transition-colors"
            >
              <SkipBack size={22} />
            </button>

            <button
              onClick={handlePlayPause}
              className="bg-white text-pink-600 rounded-full p-3 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={() => goToNextTrack && goToNextTrack()}
              className="text-pink-200 hover:text-white transition-colors"
            >
              <SkipForward size={22} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full mt-3 text-xs text-pink-200">
            <span>{formatTime(currentTime)}</span>
            <div onClick={handleSeek} className="flex-1 h-1 bg-pink-800 rounded-full">
              <div
                className="h-full bg-pink-200 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          <Volume2 size={18} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            className="w-20 accent-white cursor-pointer"
          />
        </div>
      </div>

      {!isReady && (
        <div className="absolute inset-0 bg-pink-600/80 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading YouTube Player...
          </div>
        </div>
      )}
    </div>
  );
}