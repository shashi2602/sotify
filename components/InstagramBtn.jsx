import React, { useState,useEffect } from "react";
import axios from "axios";
import { finderGet } from "@/utils/finderapi";
import { ImSearch } from "react-icons/im";
export default function InstagramBtn({setSong,setStatus }) {
  const [link,setLink] = useState()
  const [error,setError ] = useState()
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
    setError(isValidFormInput(link));
  }, [link])

  const submitLink = async() => {
    setStatus(true)
    const response =await finderGet(link);
    console.log("🚀 ~ file: LinkButton.jsx:8 ~ submitLink ~ response:", response)
    if (response?.data?.length == 0) {
      setError(response.message);
    }
    setStatus(false)
    setSong(response);
    setLink("")
  };
  return (
    <div>
      <div className="relative block">
          <input
            className="w-full text-black  rounded-lg p-3 focus:outline-none border-2 border-slate-900"
            placeholder="https://www.instagram.com/reel/.."
            type="text"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
          />

          <button className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:cursor-not-allowed" onClick={submitLink} disabled={!link}>
            <ImSearch />
          </button>
        </div>
        <p className="text-center text-red-400 p-2 ease-in-out"> {error}</p>
    </div>
  );
}
