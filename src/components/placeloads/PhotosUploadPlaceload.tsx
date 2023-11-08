import React from "react";
import { FiX } from "react-icons/fi";

const PhotosUploadPlaceload = ({ amount }: { amount: number }) => {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="upload-wrap-item" key={index}>
          <div
            className="content-shape loads"
            style={{ height: "90px", borderRadius: "5px" }}></div>
          <span className="remove-file">
            <FiX />
          </span>
        </div>
      ))}
    </>
  );
};

export default PhotosUploadPlaceload;
