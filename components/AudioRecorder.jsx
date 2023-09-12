'use client'
import { finderPost } from "@/utils/finderapi";
import dynamic from "next/dynamic";
const AudioRecorder = ({
  setStatus,
  setSong,
  setError,
  setRecording,
  setSeconds,
}) => {
  const MediaRecorder  = dynamic(()=>import('extendable-media-recorder').then((mob)=>mob.MediaRecorder),{
    ssr:false
  }) // dynamic import for error "ReferenceError: Worker is not defined" solved by seeing https://github.com/DeltaCircuit/react-media-recorder/issues/107#issuecomment-1510277225
  const startRecording = async () => {
    setStatus("Recording ");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
          const blob = new Blob(audioChunks, {
            type: "audio/mp3",
          });
          const data = new FormData();
          data.append("file", blob);
          const response = finderPost(data);
          console.log(
            "🚀 ~ file: AudioRecorder.jsx:28 ~ mediaRecorder.addEventListener ~ response:",
            response
          );
          if (response?.data?.length == 0) {
            setError(response.message);
          }
          setSong(response);
        });
        setSeconds(10);
        const countdownInterval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        mediaRecorder.start();
        setRecording(true);
        setTimeout(() => {
          mediaRecorder.stop();
          clearInterval(countdownInterval);
        }, 10000);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        setError(error);
      });
  };

  return (
    <div>
      <button className="p-3 font-semibold" onClick={startRecording}>
        {"Record"}
      </button>
    </div>
  );
};

export default AudioRecorder;
