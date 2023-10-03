import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaSpotify } from "react-icons/fa";

export default function SpotifyLogin() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <>
        <button
          className="p-2 bg-red-600 text-white rounded-md"
          onClick={() => signOut({ redirect: false })}
        >
          logout
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className=" p-2 text-green-600 "
        onClick={() => signIn("spotify")}
      >
        <div className="flex gap-2">
        <span className="font-semibold text-md pb-2">Login with</span>
 <FaSpotify className="w-5 h-5 fill-current" />  
        </div>

      </button>
    </>
  );
}
