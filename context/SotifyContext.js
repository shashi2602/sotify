/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const sotify = React.createContext();

function SpotifyContext({ children }) {
  const { data, status } = useSession();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [recognizedSong, setRecognizeSong] = useState([]);
  const [errorMsg, setErrorMsg] = useState("error");
  const [statusOfFetch, setStatusOfFetch] = useState("");
  const [localHistoryData, setLocalHistoryData] = useState([]);
  const [openResultDialog, setOpenResultDialog] = useState(false);
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
          console.log("logged out");
        }
      }
      return Promise.reject(error);
    }
  );

  const fetchSpotifyPlaylists = () => {
    instance.get("me/playlists").then((res) => {
      console.log(res.data.items);
      setSpotifyPlaylists(res.data.items);
    });
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
