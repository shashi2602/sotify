/* eslint-disable react/prop-types */
import { useSotifyContext } from "@/context/SotifyContext";
import { finderPost } from "@/utils/finderapi";

const FileUploader = () => {
  const { setErrorMsg, setStatusOfFetch, setRecognizeSong, addSongToHisory,setOpenResultDialog } =
    useSotifyContext();
  const handleFileChange = async (event) => {
    setRecognizeSong([]);
    const file = event.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      setStatusOfFetch("Finding Song...");
      const response = await finderPost(data);
      if (response?.data?.length == 0) {
        setErrorMsg(response.message);
      } else {
        
        setRecognizeSong(response?.data);
        addSongToHisory(response?.data);
        setOpenResultDialog(true);
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
        className="cursor-pointer hover:opacity-95  duration-500 bg-gray-300  shadow-slate-100  font-lexend  p-2 px-4 flex text-black rounded-full items-center hover:bg-gray-200 "
      >
        💿 Upload
      </label>
    </div>
  );
};

export default FileUploader;
