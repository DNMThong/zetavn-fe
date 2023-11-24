/* eslint-disable @next/next/no-img-element */
import React from "react";

interface UserImageProps {
   id?: string;
   imageClass?: string;
   path: string;
   alt?: string;
}

const UserImage = ({ id, imageClass, path, alt }: UserImageProps) => {
   return (
      <img
         id={id}
         className={imageClass}
         src={path}
         alt={alt || "Image"}
        
      />
   );
};

export default UserImage;
