import { useSotifyContext } from "@/context/SotifyContext";
import React from "react";

export default function PlaylistCards() {
  const { spotifyPlaylists, status } = useSotifyContext();

  if (status == "unauthenticated") {
    return "";
  }
  return (
    <div>
      <p className="font-bold ">Your Playlist</p>
      <div className="flex gap-2 my-2">
        {spotifyPlaylists?.map((card, i) => {
          return (
            <div key={i} className="flex p-2 bg-gray-100 rounded">
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
