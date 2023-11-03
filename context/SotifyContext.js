/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const sotify = React.createContext();

function SpotifyContext({ children }) {
  const { data, status } = useSession();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [recognizedSong, setRecognizeSong] = useState([]);
  const [errorMsg, setErrorMsg] = useState("error");
  const [statusOfFetch, setStatusOfFetch] = useState("");
  const [localHistoryData, setLocalHistoryData] = useState([]);
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [spotifySongs, setSpotifySongs] = useState([]);
  const instance = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + data?.user?.accessToken,
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        if (error.response.status == 401) {
          signOut();
          setRecognizeSong([]);
          setSpotifyPlaylists([]);
          toast.error("logged out");
        }
      }
      return Promise.reject(error);
    }
  );
  const openResultsDialog = () => {
    setOpenResultDialog(true);
  };
  const closeResultsDialog = () => {
    setOpenResultDialog(false);
    setRecognizeSong([]);
    setSpotifySongs([]);
  };
  const fetchSpotifyPlaylists = async () => {
    const after_tracks_data = [];
    const res = await instance.get("me/playlists");
    const filtered_res = res.data.items.filter(
      (playlist) => playlist.owner.id == data.user.spotify_id
    );
    for (const playlist of filtered_res) {
      const response = await instance.get(`playlists/${playlist.id}/tracks`, {
        params: {
          limit: playlist.tracks.total,
        },
      });
      const obj = { ...playlist, tracks_items: response.data.items };
      after_tracks_data.push(obj);
    }
    setSpotifyPlaylists(after_tracks_data);
  };

  const addSongToHisory = (song) => {
    if (song) {
      if (!localHistoryData.some((data) => data.title == song.title)) {
        let data = [song, ...localHistoryData];
        setLocalHistoryData(data);
        localStorage.setItem("history", JSON.stringify(data));
      }
    }
  };

  const addSongToPlaylist = async (playlistId, song) => {
    instance
      .post(`playlists/${playlistId}/tracks`, {
        uris: [song.uri],
        position: 0,
      })
      .then((res) => {
        const updated_playlists = spotifyPlaylists.map((playlist) => {
          const track = { track: song };
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              tracks_items: [...playlist.tracks_items, track],
            };
          }
        });
        setSpotifyPlaylists(updated_playlists);
        toast.success(`${song.name} added to Spotify`);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("history")) {
      setLocalHistoryData(JSON.parse(localStorage.getItem("history")));
    }
  }, []);

  useEffect(() => {
    if ((status != "loading") & (status == "authenticated")) {
      fetchSpotifyPlaylists();
    }
  }, [status]);

  return (
    <sotify.Provider
      value={{
        spotifyPlaylists,
        data,
        status,
        recognizedSong,
        setRecognizeSong,
        errorMsg,
        setErrorMsg,
        statusOfFetch,
        setStatusOfFetch,
        openResultDialog,
        setOpenResultDialog,
        localHistoryData,
        addSongToHisory,
        instance,
        setLocalHistoryData,
        openResultsDialog,
        closeResultsDialog,
        addSongToPlaylist,
        spotifySongs,
        setSpotifySongs,
      }}
    >
      {status != "loading" && children}
    </sotify.Provider>
  );
}

export default SpotifyContext;

export const useSotifyContext = () => {
  return useContext(sotify);
};
