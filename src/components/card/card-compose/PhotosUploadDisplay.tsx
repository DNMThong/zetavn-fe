import { removePhoto } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hooks";
import { PhotoUpload } from "@/types/post.type";
import React from "react";
import { FiX } from "react-icons/fi";

const PhotosUploadDisplay = ({ photos }: { photos: PhotoUpload[] }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="upload-wrap">
      {photos.map((photo, index) => (
        <div className="upload-wrap-item" key={photo.urlBase64}>
          <img src={photo.urlBase64} alt="" />
          <span
            className="remove-file"
            onClick={() => dispatch(removePhoto(index))}>
            <FiX />
          </span>
        </div>
      ))}
    </div>
  );
};

export default PhotosUploadDisplay;
