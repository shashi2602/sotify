import NextAuth from "next-auth";

import { nextOptions } from "./options";

async function refreshToken(token) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
  });
  console.log("refreshed token");
  const tokens = await response.json();
  console.log(tokens);
  const date = new Date(tokens.expires_in * 1000);
  return {
    ...token, // Keep the previous token properties
    access_token: tokens.access_token,
    expires_at: date,
    access_token: tokens.refresh_token ?? token.refresh_token,
    msg: "refresh_token success",
  };
}

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
