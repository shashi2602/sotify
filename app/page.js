"use client";
import AudioRecorder from "@/components/AudioRecorder";
import FileUploader from "@/components/FileUploader";
import InstagramBtn from "@/components/InstagramBtn";
import SpotifyLogin from "@/components/SpotifyLogin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/utils/spotify";
import { login, logout } from "@/utils/features/authSlice";
import { useSession } from "next-auth/react";
import { ImSearch } from "react-icons/im";
import MusicCard from "@/components/MusicCard";
import { BiLoaderCircle } from "react-icons/bi";

export default function Home() {
  const [link, setLink] = useState("");
  const [recording, setRecording] = useState(false);
  const [song, setSong] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [seconds, setSeconds] = useState(0);
  const { data } = useSession();
  console.log(data);
  // const { isLoggedIn, user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  return (
    <main className="grid place-items-center h-screen p-2">
      <div className="flex flex-col gap-3">
        <h1 className="text-9xl font-semibold text-slate-900 text-center">
          Sotify
        </h1>
        <div className="text-center">
          <SpotifyLogin />
        </div>

        <InstagramBtn setSong={setSong} setStatus={setStatus} />
        <p className="text-center">
          {status ? <p className="center animate-pulse">Finding</p> : "Or"}
        </p>
        <div className="flex place-content-center gap-2">
          <FileUploader
            setStatus={setStatus}
            setError={setError}
            setSong={setSong}
          />
          <AudioRecorder
            setStatus={setStatus}
            setError={setError}
            setRecording={setRecording}
            setSong={setSong}
            setSeconds={setSeconds}
          />
        </div>
        {song && <MusicCard song={song?.data} />}
      </div>
    </main>
  );
}
