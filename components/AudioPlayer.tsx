"use client";

import React from "react";
import ReactPlayer from "react-player";

interface AudioPlayerProps {
  url: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ url, autoPlay = false }: AudioPlayerProps) {
  if (!url) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <ReactPlayer
        url={url}
        playing={autoPlay}
        controls
        width="100%"
        height="80px"
        config={{
          youtube: {
            embedOptions: {
              modestbranding: 1,
              rel: 0,
            },
          },
        }}
      />
    </div>
  );
}