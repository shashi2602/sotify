import axios from "axios";

const token = "";

const instance = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
});

export const refreshToken = async (token) => {
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
};

export const getUserInfo = () => {
  var data = "";
  instance.get("me").then((res) => {
    data = res.data;
  });
  console.log(data);
  // localStorage.setItem("userInfo", JSON.stringify(data));
  return { ss: "ss" };
};

export const getSearchResult = async (query) => {
  const { data } = await instance.get("search", {
    params: {
      q: query,
      type: "track",
      limit: 10,
    },
  });
  console.log("🚀 ~ file: spotify.js:24 ~ getSearchResult ~ data:", data);
  return data;
};

//TODO:get token from refresh token
