"use client";
import { useSotifyContext } from "@/context/SotifyContext";
import { finderPost } from "@/utils/finderapi";
import dynamic from "next/dynamic";
import { useState } from "react";
const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const { setErrorMsg, setStatusOfFetch, setRecognizeSong, addSongToHisory } =
    useSotifyContext();
  const startRecording = async () => {
    setRecognizeSong([]);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", async () => {
          const blob = new Blob(audioChunks, {
            type: "audio/mp3",
          });
          const data = new FormData();
          data.append("file", blob);
          setStatusOfFetch("Finding Song...");
          const response = await finderPost(data);
          console.log(
            "🚀 ~ file: AudioRecorder.jsx:28 ~ mediaRecorder.addEventListener ~ response:",
            response
          );
          if (response?.data?.length == 0) {
            setErrorMsg(response.message);
          } else {
            setRecognizeSong(response);
            addSongToHisory(response?.data);
          }
          setStatusOfFetch("");
        });
        setSeconds(10);
        setStatusOfFetch("recording");
        const countdownInterval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        mediaRecorder.start();
        setRecording(true);
        setTimeout(() => {
          mediaRecorder.stop();
          setRecording(false);
          clearInterval(countdownInterval);
        }, 10000);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        setErrorMsg(error);
      });
  };

  return (
    <div>
      {recording ? (
        <div className="font-lexend w-28 h-7 p-2 px-4 text-red-600 font-semibold">
          <p className="text-center">{seconds + "s"}</p>
        </div>
      ) : (
        <button
          className=" cursor-pointer hover:opacity-95 hover:-translate-y-2 duration-500  shadow-slate-100  font-lexend  p-2 px-4 flex text-black rounded-full items-center"
          onClick={startRecording}
        >
          {"🎤 Record"}
        </button>
      )}
    </div>
  );
};

export default AudioRecorder;
