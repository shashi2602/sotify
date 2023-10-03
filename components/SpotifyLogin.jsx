import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaSpotify } from "react-icons/fa";

export default function SpotifyLogin() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className="text-green-600 font-semibold flex place-content-center">
        <FaSpotify className="w-5 h-5 fill-current mt-2" />
        <button
          className="p-2 "
          onClick={() => signOut({ redirect: false })}
        >
          {session?.user.name} 
        </button>
      </div>
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
