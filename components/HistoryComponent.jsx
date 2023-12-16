import { useSotifyContext } from "@/context/SotifyContext";
import React, { useState, useRef } from "react";
import { MdClose  } from "react-icons/md";
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
      <p className="font-bold text-center mt-4">Recent</p>
      <div className="flex gap-2 justify-center flex-wrap">
        {localHistoryData?.map((song, i) => {
          return (
            <div
              key={i}
              className="flex gap-2 hover:bg-gray-50 transition hover:ease-in-out py-2 rounded hover:cursor-pointer flex-wrap"
            >
              <div
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-md flex place-content-end"
                style={{
                  backgroundImage: `url(${song?.cover_art})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => {
                  setRecognizeSong(song);
                  openResultsDialog();
                }}
                
              >
                <MdClose 
                    onClick={(e) => {
                      e.stopPropagation()
                      onClickDelete(song?.title)}}
                    className="bg-gray-100 m-2 rounded-full text-sm"
                  />
                {/* <audio src={song.preview_url} ref={audioRef}></audio>
              {isPlaying?<FaPause onClick={handlePlayPause}/>:<FaPlay onClick={handlePlayPause}/>} */}
              </div>
              {/* <div
                className="font-sans flex-1"
              >
                <div className="flex justify-between">
                  <p className="font-semibold" onClick={() => {
                  setRecognizeSong(song);
                  openResultsDialog();
                }}>{song?.title}</p>
                  <MdDeleteOutline
                    onClick={() => onClickDelete(song?.title)}
                    className="dark:text-black"
                  />
                </div>
                <i>{song?.subtitle}</i>
              </div> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
