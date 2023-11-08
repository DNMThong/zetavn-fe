import { PhotosUploadPlaceload } from "@/components/placeloads";
import { removePhoto } from "@/redux/features/post/post.slice";
import { useDeleteFileMutation } from "@/redux/features/upload/upload.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PhotoUpload } from "@/types/post.type";
import Image from "next/image";
import React from "react";
import { FiX } from "react-icons/fi";

const PhotosUploadDisplay = ({ photos }: { photos: string[] }) => {
  const dispatch = useAppDispatch();
  const photosLoading = useAppSelector(
    (selector) => selector.post.photosLoading
  );
  const handleDeleteImage = (index: number) => {
    dispatch(removePhoto(index));
  };
  return (
    <div className="upload-wrap">
      {photos.map((photo, index) => (
        <div className="upload-wrap-item" key={index}>
          <img src={photo} alt="" />
          <span
            className="remove-file"
            onClick={() => handleDeleteImage(index)}>
            <FiX />
          </span>
        </div>
      ))}
      {photosLoading > 0 && <PhotosUploadPlaceload amount={photosLoading} />}
    </div>
  );
};

export default PhotosUploadDisplay;
