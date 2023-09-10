/* eslint-disable react/prop-types */
import { finderPost } from "@/utils/finderapi";

const FileUploader = ({ setStatus, setSong, setError }) => {
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    setStatus("file selected");
    if (file) {
      const data = new FormData();
      data.append("file", file);
      const response =await finderPost(data);
      console.log("🚀 ~ file: FileUploader.jsx:12 ~ handleFileChange ~ response:", response)
      if (response?.data?.length == 0) {
        setError(response.message);
      }
      setSong(response);
    } else {
      setError("No file selected");
    }
  };

  return (
    <div className="p-3 font-semibold">
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
      >
        Upload
      </label>
    </div>
  );
};

export default FileUploader;
