import axios from "axios";

const url = "https://58b0e37b-469e-4d15-84ea-67412b196ec1-00-3i88tyl6uf0dl.pike.replit.dev/findSong";

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
