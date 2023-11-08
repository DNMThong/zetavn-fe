"use client";
import {
  addPhotos,
  setPhotos,
  setPhotosLoading,
  setVideoLoading,
  setVideoUploadPost,
} from "@/redux/features/post/post.slice";
import { useUploadFileMutation } from "@/redux/features/upload/upload.service";
import { useAppDispatch } from "@/redux/hooks";
import { PhotoUpload } from "@/types/post.type";
import { fileImageToUrl, fileVideoToUrl } from "@/utils/file.util";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { FiCamera, FiVideo } from "react-icons/fi";
import { toast } from "react-toastify";

interface CardComposeUploadVideoProps {
  className?: string;
  onClick?: () => void;
  title: string;
}

const CardComposeUploadVideo = ({
  className = "",
  title,
  onClick,
}: CardComposeUploadVideoProps) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  // const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleChangeVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    try {
      if (files && files.length > 0) {
        dispatch(setVideoLoading(true));
        if (files[0].type.startsWith("video/")) {
          const url = await fileVideoToUrl(files[0]);
          dispatch(setPhotos([]));
          dispatch(setVideoUploadPost(url));
        } else {
          toast.warning("Vui lòng chỉ tải lên video");
        }
        dispatch(setVideoLoading(false));
      }
    } catch (err) {
      dispatch(setVideoLoading(false));
      console.log(err);
    }
  };
  const handleClickInput = () => {
    if (inputRef.current) {
      inputRef.current.value = null as unknown as string;
      inputRef.current.click();
    }
  };
  return (
    <div
      className={`compose-option is-centered ${className}`}
      onClick={handleClickInput}>
      <FiVideo />
      <span>{title}</span>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="video/*"
        onChange={handleChangeVideo}
      />
    </div>
  );
};

export default CardComposeUploadVideo;

// const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
//   const files: FileList | null = e.target.files;
//   try {
//     if (files) {
//       const formData = new FormData();
//       for (let i = 0; i < files.length; i++) {
//         if (files[0].size < 10 * 1024 * 1024) {
//           formData.append("files", files[i]);
//         } else {
//           toast.warning("Ảnh tải lên phải nhỏ hơn 10MB");
//           return;
//         }
//       }
//       dispatch(setPhotosLoading(files.length));
//       const response = await uploadFile(formData).unwrap();
//       console.log(response);
//       if (response.code === 201) {
//         dispatch(setPhotosLoading(0));
//         dispatch(addPhotos(response.data as PhotoUpload[]));
//       }
//     }
//   } catch (err) {
//     dispatch(setPhotosLoading(0));
//     console.log(err);
//   }
// };
