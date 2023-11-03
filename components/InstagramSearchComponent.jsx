/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { finderGet } from "@/utils/finderapi";
import { ImSearch } from "react-icons/im";
import { useSotifyContext } from "@/context/SotifyContext";
export default function InstagramSearchComponent() {
  const {
    setErrorMsg,
    setStatusOfFetch,
    setRecognizeSong,
    setOpenResultDialog,
    addSongToHisory,
  } = useSotifyContext();
  const [link, setLink] = useState("");
  const isValidFormInput = (postUrl) => {
    if (!postUrl) {
      return "";
    }

    if (!postUrl.includes("instagram.com/")) {
      return "Invalid URL does not contain Instagram domain";
    }

    if (!postUrl.startsWith("https://")) {
      return 'Invalid URL it should start with "https://www.instagram.com..."';
    }

    const postRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

    const reelRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

    if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
      return "URL does not match Instagram post or reel";
    }

    return "";
  };
  useEffect(() => {
    setErrorMsg(isValidFormInput(link));
  }, [link]);

  const submitLink = async () => {
    setRecognizeSong([]);
    setStatusOfFetch("Finding Song...");
    const response = await finderGet(link);
    setOpenResultDialog(true);

    if (response?.data?.length == 0) {
      setErrorMsg("Song Not Found");
    } else {
      addSongToHisory(response?.data);
      setRecognizeSong(response?.data);
    }
    setStatusOfFetch("");

    setLink("");
  };
  return (
    <div>
      <div className="relative block">
        <input
          className="w-full text-black dark:text-white dark:bg-black/5  rounded-lg p-4 focus:outline-none border-2 border-green-200"
          placeholder="https://www.instagram.com/reel/.."
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          className="absolute inset-y-0 right-0 flex items-center m-2 p-4 bg-green-100  rounded-full disabled:cursor-not-allowed"
          onClick={submitLink}
          disabled={!link}
        >
          <ImSearch className="text-green-400" />
        </button>
      </div>
    </div>
  );
}
