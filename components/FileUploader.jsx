/* eslint-disable react/prop-types */
import { useSotifyContext } from "@/context/SotifyContext";
import { finderPost } from "@/utils/finderapi";

const FileUploader = () => {
  const { setErrorMsg, setStatusOfFetch, setRecognizeSong, addSongToHisory } =
    useSotifyContext();
  const handleFileChange = async (event) => {
    setRecognizeSong([]);
    const file = event.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      setStatusOfFetch("Finding Song...");
      const response = await finderPost(data);
      console.log(
        "🚀 ~ file: FileUploader.jsx:12 ~ handleFileChange ~ response:",
        response
      );

      if (response?.data?.length == 0) {
        setErrorMsg(response.message);
      } else {
        setRecognizeSong(response);
        addSongToHisory(response?.data);
      }
      setStatusOfFetch("");
    } else {
      setErrorMsg("No file selected");
    }
  };

  return (
    <div className="flex ">
      <input
        type="file"
        id="upload"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="upload"
        onClick={() => {
          setRecognizeSong("");
        }}
        style={{
          cursor: "pointer",
        }}
        className="cursor-pointer  hover:-translate-y-2 duration-500 bg-green-200 font-lexend p-2 px-4 flex text-green-600 rounded-full items-center"
      >
        💿 Upload
      </label>
    </div>
  );
};

export default FileUploader;
