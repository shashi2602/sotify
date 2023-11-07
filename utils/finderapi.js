import axios from "axios";

const url = "https://honestbeneficialbackend.shashippk.repl.co/findSong";

export const finderPost = async (body) => {
  const { data } = await axios.post(url, body);
  return data;
};

export const finderGet = async (link) => {
  const { data } = await axios.get(url, {
    params: {
      url: link,
    },
  });
  return data;
};
