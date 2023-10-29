import axios from "axios";
import SpotifyProvider from "next-auth/providers/spotify";
export const nextOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-private",
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const date = new Date(account.expires_at * 1000);
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.spotify_id = account.providerAccountId;
        token.expires_at = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.accessToken = token.access_token;
      session.user.refreshToken = token.refresh_token;
      session.user.spotify_id = token.spotify_id;
      session.user.expires_at = token.expires_at ?? "";
      // checking were the token is valid or not
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token.access_token,
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          // if response code is 401 then need to refresh the token
          if (error.response.status == 401) {
            axios
              .post(
                "https://accounts.spotify.com/api/token",
                {
                  grant_type: "refresh_token",
                  refresh_token: token.refresh_token,
                },
                {
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
                }
              )
              .then((res) => {
                session.user.accessToken = res.data.access_token;
                session.user.message = "refresh token has been refreshed";
              })
              .catch((err) => {
                session.user.message = "error while updating session";
              });
          }
        });
      return session;
    },
  },
};
