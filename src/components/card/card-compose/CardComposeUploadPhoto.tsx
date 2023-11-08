"use client";
import {
  addPhotos,
  setPhotos,
  setPhotosLoading,
  setVideoUploadPost,
} from "@/redux/features/post/post.slice";
import { useUploadFileMutation } from "@/redux/features/upload/upload.service";
import { useAppDispatch } from "@/redux/hooks";
import { PhotoUpload } from "@/types/post.type";
import { fileImageToUrl } from "@/utils/file.util";
import React, { ChangeEvent, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";

interface CardComposeUploadPhoto {
  className?: string;
  onClick?: () => void;
  title: string;
}

const CardComposeUploadPhoto = ({
  className = "",
  title,
  onClick,
}: CardComposeUploadPhoto) => {
  const dispatch = useAppDispatch();
  // const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    try {
      if (files) {
        let invalid: boolean = false;
        dispatch(setPhotosLoading(files.length));

        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 10 * 1024 * 1024) {
            toast.warning("Ảnh tải lên phải nhỏ hơn 10MB");
            invalid = true;
            break;
          }
        }

        if (!invalid) {
          const fileImagePromises: Promise<string>[] = Array.from(files).map(
            async (file: File) => {
              const urlBase64: string = await fileImageToUrl(file);
              return urlBase64;
            }
          );
          const fileImages = await Promise.all(fileImagePromises);
          dispatch(setVideoUploadPost(""));
          dispatch(addPhotos(fileImages));
        }
        dispatch(setPhotosLoading(0));
      }
    } catch (err) {
      dispatch(setPhotosLoading(0));
      console.log(err);
    }
  };
  return (
    <label className={`compose-option ${className}`} onClick={onClick}>
      <FiCamera />
      <span>{title}</span>
      <input
        hidden
        type="file"
        accept="image/*"
        multiple
        onChange={handleChangePhoto}
      />
    </label>
  );
};

export default CardComposeUploadPhoto;

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
