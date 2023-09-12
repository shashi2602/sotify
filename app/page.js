"use client";
import AudioRecorder from "@/components/AudioRecorder";
import FileUploader from "@/components/FileUploader";
import LinkButton from "@/components/LinkButton";
import SpotifyLogin from "@/components/SpotifyLogin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/utils/spotify";
import { login, logout } from "@/utils/features/authSlice";
import { useSession } from "next-auth/react";

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
    <main className="grid place-items-center h-screen">
      <div className="flex flex-col gap-3">
        <h1 className="text-9xl font-semibold">Sotify</h1>
        <input
          type="text"
          className="p-3 rounded-lg text-black"
          placeholder="link"
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="grid grid-cols-3">
          <FileUploader
            setStatus={setStatus}
            setError={setError}
            setSong={setSong}
          />
          <LinkButton link={link} setSong={setSong} setError={setError} />
          <AudioRecorder
            setStatus={setStatus}
            setError={setError}
            setRecording={setRecording}
            setSong={setSong}
            setSeconds={setSeconds}
          />
          <SpotifyLogin />
        </div>
      </div>
    </main>
  );
}
