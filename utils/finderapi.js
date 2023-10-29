import axios from "axios";

const url = "https://honestbeneficialbackend.shashippk.repl.co/findSong";

export const finderPost = async (body) => {
  console.log(process.env.SONG_FINDER_URL);
  const { data } = await axios.post(url, body);
  console.log("🚀 ~ file: finderapi.js:7 ~ finderPost ~ data:", data);
  return data;
};

export const finderGet = async (link) => {
  const { data } = await axios.get(url, {
    params: {
      url: link,
    },
  });
  // if (data.data.length != 0) {
  //   const spotify = await getSearchResult(data?.data?.title);
  //   console.log("🚀 ~ file: finderapi.js:10 ~ finderPost ~ spotify:", spotify);
  // }
  console.log("🚀 ~ file: finderapi.js:17 ~ finderGet ~ reponse:", data);
  return data;
};
