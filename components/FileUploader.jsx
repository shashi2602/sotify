/* eslint-disable react/prop-types */
import { finderPost } from "@/utils/finderapi";

const FileUploader = ({ setStatus, setSong, setError }) => {
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      setStatus(true)
      const response =await finderPost(data);
      console.log("🚀 ~ file: FileUploader.jsx:12 ~ handleFileChange ~ response:", response)
      if (response?.data?.length == 0) {
        setError(response.message);
      }
      setStatus(false)
      setSong(response);
    } else {
      setError("No file selected");
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
          setSong("");
        }}
        style={{
          cursor: "pointer",
        }}
        className= "cursor-pointer hover:bg-slate-900 hover:translate-x-2 duration-500 shadow-xl hover:shadow-2xl hover:shadow-slate-200 shadow-slate-100 bg-slate-800 font-lexend p-2 px-4 flex text-white rounded-full items-center"
      >
      💿 Upload
      </label>
    </div>
  );
};

export default FileUploader;
