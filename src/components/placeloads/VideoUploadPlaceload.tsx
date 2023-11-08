import React from "react";
import { FiX } from "react-icons/fi";

const VideoUploadPlaceload = () => {
  return (
    <div className="upload-wrap-item">
      <div
        className="content-shape loads"
        style={{ height: "250px", borderRadius: "5px" }}></div>
      <span className="remove-file">
        <FiX />
      </span>
    </div>
  );
};

export default VideoUploadPlaceload;
