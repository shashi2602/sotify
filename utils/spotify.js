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
