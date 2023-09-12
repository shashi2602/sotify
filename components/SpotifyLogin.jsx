import React, { useEffect, useState } from 'react'
import {signIn,signOut,useSession} from "next-auth/react"

export default function SpotifyLogin() {
  const {data:session} = useSession()

  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button className='p-2 bg-red-600 text-white rounded-md'  onClick={() => signOut({redirect:false})}>Spotify</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className='p-2 bg-green-600 text-white rounded-md' onClick={() => signIn('spotify')}>Sign in</button>
    </>
  )
}
