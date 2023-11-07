import { useSotifyContext } from "@/context/SotifyContext";
import React, { useState, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
// import { FaPlay,FaPause } from "react-icons/fa";

export default function HistoryComponent() {
  const {
    localHistoryData,
    setLocalHistoryData,
    setRecognizeSong,
    openResultsDialog,
  } = useSotifyContext();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef();
  const onClickDelete = (title) => {
    let delList = JSON.parse(localStorage.getItem("history"));
    delList = delList.filter((data) => data?.title != title);
    localStorage.setItem("history", JSON.stringify(delList));
    setLocalHistoryData(delList);
  };

  // const handlePlayPause = () => {
  //   setIsPlaying(!isPlaying);
  //   if (!isPlaying) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // };
  if (localHistoryData.length == 0) return "";
  return (
    <>
      <p className="font-bold ">History</p>
      <div className="grid gap-1">
        {localHistoryData?.map((song, i) => {
          return (
            <div
              key={i}
              className="flex gap-2 hover:bg-green-50 transition hover:ease-in-out p-2 rounded hover:cursor-pointer dark:hover:text-black flex-wrap"
            >
              <div
                className="w-14 h-14 rounded-md flex items-center justify-center"
                style={{
                  backgroundImage: `url(${song?.cover_art})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* <audio src={song.preview_url} ref={audioRef}></audio>
              {isPlaying?<FaPause onClick={handlePlayPause}/>:<FaPlay onClick={handlePlayPause}/>} */}
              </div>
              <div
                className="font-sans flex-1"
              >
                <div className="flex justify-between">
                  <p className="font-semibold" onClick={() => {
                  setRecognizeSong(song);
                  openResultsDialog();
                }}>{song?.title}</p>
                  <MdDeleteOutline
                    onClick={() => onClickDelete(song?.title)}
                    className="dark:text-black bg-green-100 rounded"
                  />
                </div>
                <i>{song?.subtitle}</i>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
