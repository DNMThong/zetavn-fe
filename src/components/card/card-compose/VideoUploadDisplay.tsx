"use client";
import { setVideoUploadPost } from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { FiX } from "react-icons/fi";
import ReactPlayer from "react-player";

interface VideoUploadDisplayProps {
  video: string;
}

const VideoUploadDisplay = ({ video }: VideoUploadDisplayProps) => {
  const dispatch = useAppDispatch();
  const handleDeleteVideo = () => {
    dispatch(setVideoUploadPost(""));
  };
  return (
    <div className="upload-wrap-item is-full">
      <ReactPlayer width="100%" height="auto" controls={true} url={video} />
      <span className="remove-file" onClick={handleDeleteVideo}>
        <FiX />
      </span>
    </div>
  );
};

export default VideoUploadDisplay;
