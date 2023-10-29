"use client";
import AudioRecorder from "@/components/AudioRecorder";
import FileUploader from "@/components/FileUploader";
import InstagramSearchComponent from "@/components/InstagramSearchComponent";
import SpotifyLogin from "@/components/SpotifyLogin";
import PlaylistCards from "@/components/PlaylistCards";
import ResultsDialog from "@/components/ResultsDialog";
import { useSotifyContext } from "@/context/SotifyContext";

export default function Home() {
  const { errorMsg, statusOfFetch, recognizedSong, localHistoryData } =
    useSotifyContext();
  return (
    <main className="grid place-items-center w-full h-screen">
      <div className="flex flex-col gap-3 ">
        <h1 className="text-9xl font-semibold text-slate-900 text-center">
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
        <p className="text-center">
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
        {localHistoryData.length != 0 ? (
          <>
            <p className="font-bold ">History</p>
            <div className="grid gap-2">
              {localHistoryData?.map((song, i) => {
                return (
                  <div key={i} className="flex gap-1">
                    <div
                      className="w-14 h-14 rounded-md"
                      style={{
                        backgroundImage: `url(${song?.cover_art})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <div className="font-sans">
                      <p className="font-semibold text-clip">{song?.title}</p>
                      <i>{song?.meta_data?.album}</i>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
        <ResultsDialog result={recognizedSong} />
      </div>
    </main>
  );
}
