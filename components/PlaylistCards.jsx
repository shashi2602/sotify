import { useSotifyContext } from "@/context/SotifyContext";
import React, { useState, useEffect } from "react";

export default function PlaylistCards() {
  const { spotifyPlaylists, status } = useSotifyContext();

  if (status == "unauthenticated") {
    return "";
  }
  return (
    <div>
      <p className="font-bold mb-2">Your Playlist</p>
      <div className="flex gap-2">
        {spotifyPlaylists?.map((card, i) => {
          return (
            <div key={i} className="flex">
              <div
                className="h-20 w-20 rounded-md"
                style={{
                  backgroundImage: `url(${card.images[0].url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
