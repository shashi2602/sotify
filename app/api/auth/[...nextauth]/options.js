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
      // if (account) {
      //   // Save the access token and refresh token in the JWT on the initial login

      //   return {
      //     ...token,
      //     access_token: account.access_token,
      //     expires_at: date,
      //     refresh_token: account.refresh_token,
      //     spotify_id: account.providerAccountId,
      //   };
      // }
      // if (Date() < token.expires_at) {
      //   // If the access token has not expired yet, return it
      //   return token;
      // }
      // return await refreshToken(token);
      if (account) {
        const date = new Date(account.expires_at * 1000);
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.spotify_id = account.providerAccountId;
        //to milliseconds
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
      return session;
    },
  },
};