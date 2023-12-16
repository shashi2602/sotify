import { useSotifyContext } from "@/context/SotifyContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { FaSpotify, FaPlay, FaPause, FaYoutube } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import Link from "next/link";

function ResultsDialog({ result }) {
  const {
    instance,
    status,
    spotifyPlaylists,
    openResultDialog,
    closeResultsDialog,
    addSongToPlaylist,
    spotifySongs,
    setSpotifySongs,
  } = useSotifyContext();

  const onClickSpotify = async (title) => {
    if(status =="unauthenticated"){
      toast.error("Login with Spotify")
    }else{
      const { data } = await instance.get("search", {
        params: {
          q: title.replace(/ *\([^)]*\) */g, ""),
          type: "track",
          limit: 10,
        },
      });
      setSpotifySongs(data.tracks.items);
    }
  };

  return (
    <>
      <Transition appear show={openResultDialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={closeResultsDialog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6  align-middle shadow-xl transition-all ">
                  <div className="grid grid-flow-row grid-rows-2 justify-items-center">
                    <div
                      className="shadow-lg"
                      style={{
                        backgroundImage: `url(${result?.cover_art})`,
                        backgroundSize: "cover",
                        width: "6rem",
                        height: "6rem",
                        borderRadius: "0.375rem",
                      }}
                    ></div>
                    <div className="font-sans text-center grid">
                      <p className="font-bold">{result?.title}</p>
                      <i>{result.meta_data?.album}</i>
                      <i>{result?.subtitle}</i>
                      <i>{result?.genere}</i>
                    </div>
                  </div>
                  <div className="flex justify-center content-center gap-2 mt-2">
                    <Link
                      href={`https://www.youtube.com/watch?v=${result?.meta_data?.youtube?.id}`}
                      className="text-sm"
                    >
                      <div className="flex gap-1 p-2 rounded-md bg-red-100 text-red-600">
                        <FaYoutube className="w-5 h-5 fill-red-600" />
                        <p className="text-sm">Youtube</p>
                      </div>
                    </Link>
                    <button
                      className={`flex gap-1 rounded-md p-2 bg-green-100 text-green-500`}
                      onClick={() => onClickSpotify(result?.title)}
                    >
                      <FaSpotify className="w-5 h-5 fill-green-600" />
                      <p className="text-sm">Spotify</p>
                    </button>
                  </div>
                  {/* <div>
                    {status == "unauthenticated" && (
                      <p className="text-green-400 text-center p-2 mt-2 ">
                        Login to get spotify songs
                      </p>
                    )}
                  </div> */}
                  <div className="mt-6">
                    {spotifySongs.map((item, i) => {
                      if (item) {
                        return (
                          <SpotifySongCard
                            key={i}
                            item={item}
                            playlists={spotifyPlaylists}
                            onSelect={addSongToPlaylist}
                          />
                        );
                      }
                    })}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function SpotifySongCard({ item, playlists, onSelect }) {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  return (
    <div>
      <div className="flex gap-2 m-2">
        <div
          className="w-12 h-12 rounded bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url(${item.album.images[2].url})`,
          }}
        > {
          item.preview_url&&<>
          <audio src={item.preview_url} ref={audioRef}></audio>
          {isPlaying ? (
            <FaPause onClick={handlePlayPause} className="text-white"/>
          ) : (
            <FaPlay onClick={handlePlayPause} className="text-white"/>
          )}
          </>
        }
          
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <p>{item.name}</p>
            <IoMdAdd
              onClick={() => setShowPlaylists(!showPlaylists)}
              className="bg-gray-100 dark:text-black rounded"
            />
          </div>
          <div className="flex gap-2 justify-start flex-wrap gap-y-0">
            {item.artists.map((artist, i) => {
              return (
                <i className="text-sm text-clip" key={i}>
                  {artist.name}
                </i>
              );
            })}
          </div>
        </div>
      </div>
      {showPlaylists ? (
        <div className="flex gap-2 m-2 transition ease-in-out duration-300 ">
          {playlists?.map((playlist, i) => {
            return (
              <div key={i} className="bg-gray-100 p-2 rounded-lg">
                <div
                  className="h-14 w-14 rounded-md flex "
                  onClick={() => {
                    if (
                      playlist?.tracks_items?.some(
                        (track) => track.track.name == item.name
                      )
                    ) {
                      toast.error("Song already exists in playlist");
                    } else {
                      onSelect(playlist.id, item);
                    }
                  }}
                  style={{
                    backgroundImage: `url(${playlist.images[0].url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {playlist?.tracks_items?.some(
                    (track) => track.track.name == item.name
                  ) ? (
                    <AiFillCheckCircle className="text-white" />
                  ) : (
                    ""
                  )}
                </div>
                {/* <div>
          <p>{card.name}</p>
      </div> */}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ResultsDialog;
