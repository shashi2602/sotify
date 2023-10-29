import { useSotifyContext } from "@/context/SotifyContext";
import { facketrack, playlistFake } from "@/utils/constants";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";

function ResultsDialog({ result }) {
  const { instance, status } = useSotifyContext();
  const [isOpen, setIsOpen] = useState(false);
  const [spotifySongs, setSpotifySongs] = useState([]);
  function closeModal() {
    setIsOpen(false);
  }
  const onClickSpotify = async (title) => {
    const { data } = await instance.get("search", {
      params: {
        q: title,
        type: "track",
        limit: 10,
      },
    });
    setSpotifySongs(data.tracks.items);
  };
  useEffect(() => {
    if (result?.data) {
      setIsOpen(true);
    }
  }, [result]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="grid grid-flow-row grid-rows-2 justify-items-center">
                    <div
                      className="shadow-lg"
                      style={{
                        backgroundImage: `url(${result?.data?.cover_art})`,
                        backgroundSize: "cover",
                        width: "6rem",
                        height: "6rem",
                        borderRadius: "0.375rem",
                      }}
                    ></div>
                    <div className="font-sans text-center grid">
                      <p className="font-bold">{result?.data?.title}</p>
                      <i>{result?.data?.meta_data?.album}</i>
                      <i>{result?.data?.subtitle}</i>
                      <i>{result?.data?.genere}</i>
                    </div>
                  </div>
                  <div className="flex justify-center content-center gap-2 mt-2">
                    <div className="flex gap-1 p-2 rounded-md bg-red-100 text-red-600">
                      <svg
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 461.001 461.001"
                        xmlSpace="preserve"
                        fill="#FF5733"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path
                              style={{ fill: "#FF5733" }}
                              d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                            ></path>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      <Link
                        href={`https://www.youtube.com/watch?v=${result?.data?.meta_data?.youtube?.video_id}`}
                        className="text-sm border-0 "
                      >
                        Youtube
                      </Link>
                    </div>
                    <button
                      className={`flex gap-1 rounded-md p-2 bg-green-100 text-green-500`}
                      disabled={status == "unauthenticated"}
                      onClick={() => onClickSpotify(result?.data?.title)}
                    >
                      <FaSpotify className="w-5 h-5 fill-green-600" />
                      <p className="text-sm">Spotify</p>
                    </button>
                  </div>
                  <div>
                    {status == "unauthenticated" && (
                      <p className="text-green-400 text-center p-2 mt-2 ">
                        Login to get spotify songs
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    {spotifySongs.map((item, i) => {
                      if (item.album.album_type == "single") {
                        return <SpotifySongCard key={i} item={item} />;
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

function SpotifySongCard({ item }) {
  const [showPlaylists, setShowPlaylists] = useState(false);
  return (
    <div>
      <div className="flex gap-2 m-2">
        <div
          className="w-12 h-12 rounded"
          style={{
            backgroundImage: `url(${item.album.images[2].url})`,
          }}
        ></div>
        <div className="flex-auto grid">
          <div className="flex justify-between">
            <p>{item.name}</p>
            <IoMdAdd onClick={() => setShowPlaylists(!showPlaylists)} />
          </div>
          <div className="flex gap-2">
            {item.artists.map((artist, i) => {
              return (
                <i className="text-sm" key={i}>
                  {artist.name}
                </i>
              );
            })}
          </div>
        </div>
      </div>
      {showPlaylists ? (
        <div className="flex gap-2 m-2 transition ease-in-out duration-300 bg-gray-100 p-2 rounded-lg">
          {playlistFake.items.map((card, i) => {
            return (
              <div key={i}>
                <div
                  className="h-14 w-14 rounded-md"
                  style={{
                    backgroundImage: `url(${card.images[0].url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
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
