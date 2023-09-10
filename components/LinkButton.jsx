import React from "react";
import axios from "axios";
import { finderGet } from "@/utils/finderapi";

export default function LinkButton({ link, setSong, setError }) {
  const submitLink = async() => {
    const response =await finderGet(link);
    console.log("🚀 ~ file: LinkButton.jsx:8 ~ submitLink ~ response:", response)
    if (response?.data?.length == 0) {
      setError(response.message);
    }
    setSong(response);
  };
  return (
    <div>
      <button className="p-3 font-semibold" onClick={submitLink}>
        {"Find"}
      </button>
    </div>
  );
}
