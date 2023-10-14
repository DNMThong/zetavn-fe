"use client";
import { addPhotos, setPhotos } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hooks";
import { fileImageToUrl } from "@/utils/file.util";
import React, { ChangeEvent } from "react";
import { FiCamera } from "react-icons/fi";

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

  const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    try {
      if (files) {
        const fileImagePromises: Promise<{ urlBase64: string }>[] = Array.from(
          files
        ).map(async (file: File) => {
          const urlBase64: string = await fileImageToUrl(file);
          return {
            urlBase64,
          };
        });

        const fileImages = await Promise.all(fileImagePromises);

        dispatch(setPhotos(fileImages));
      }
    } catch (err) {
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
