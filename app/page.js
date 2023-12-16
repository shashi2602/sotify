"use client";
import AudioRecorder from "@/components/AudioRecorder";
import FileUploader from "@/components/FileUploader";
import InstagramSearchComponent from "@/components/InstagramSearchComponent";
import SpotifyLogin from "@/components/SpotifyLogin";
import PlaylistCards from "@/components/PlaylistCards";
import ResultsDialog from "@/components/ResultsDialog";
import { useSotifyContext } from "@/context/SotifyContext";
import HistoryComponent from "@/components/HistoryComponent";
import bg from "@/public/backdrop.jpg";

export default function Home() {
  const { errorMsg, statusOfFetch, recognizedSong } = useSotifyContext();
  return (
    <main
    // style={{
    //   backgroundImage: `url(/backdrop.jpg)`,
    // }}
    >
      <div className="w-full backdrop-blur-lg flex items-center justify-center h-screen p-4 sm:p-0">
        <div className="w-full lg:max-w-2xl mx-auto">
          <h1 className="text-8xl sm:text-9xl font-semibold text-slate-900  text-center font-sans">
            Sotify
          </h1>
          <p className="text-center pr-3 sm:pr-0 font-semibold font-sans text-sm sm:text-base">
            Find the song that you like
          </p>
          <div className="text-center">
            <SpotifyLogin />
          </div>

          <InstagramSearchComponent />
          {errorMsg ? (
            <p className="text-center text-red-400  ease-in-out"> {errorMsg}</p>
          ) : (
            ""
          )}
          <p className="text-center py-2 font-semibold">
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

          {/* <PlaylistCards /> */}
          <HistoryComponent />
          <ResultsDialog result={recognizedSong} />
        </div>
      </div>
      <div className="fixed bottom-0 min-w-full text-center font-semibold p-2">Made with ❤️ in india</div>
    </main>
  );
}
