"use client";
import AudioRecorder from "@/components/AudioRecorder";
import FileUploader from "@/components/FileUploader";
import InstagramSearchComponent from "@/components/InstagramSearchComponent";
import SpotifyLogin from "@/components/SpotifyLogin";
import PlaylistCards from "@/components/PlaylistCards";
import ResultsDialog from "@/components/ResultsDialog";
import { useSotifyContext } from "@/context/SotifyContext";
import HistoryComponent from "@/components/HistoryComponent";
import { ThemeProvider } from "next-themes";

export default function Home() {
  const { errorMsg, statusOfFetch, recognizedSong } = useSotifyContext();
  return (
    <ThemeProvider attribute="true">
      <main className="flex items-center justify-center">
        <div className="w-full lg:max-w-2xl mx-auto ">
          <h1 className="text-9xl font-semibold text-slate-900 dark:text-green-100 text-center">
            Sotify
          </h1>
          <div className="text-center">
            <SpotifyLogin />
          </div>

          <InstagramSearchComponent />
          {errorMsg ? (
            <p className="text-center text-red-400  ease-in-out"> {errorMsg}</p>
          ) : (
            ""
          )}
          <p className="text-center py-2">
            {statusOfFetch ? (
              <p className="center animate-pulse">{statusOfFetch}</p>
            ) : (
              "Or"
            )}
          </p>
          <div className="flex place-content-center gap-2">
            <FileUploader />
            <AudioRecorder />
          </div>

          <PlaylistCards />
          <HistoryComponent />
          <ResultsDialog result={recognizedSong} />
        </div>
      </main>
    </ThemeProvider>
  );
}
