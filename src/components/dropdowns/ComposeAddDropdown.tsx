"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React, { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useUploadFileMutation } from "@/redux/features/upload/upload.service";
import {
  FiCode,
  FiFileText,
  FiImage,
  FiMonitor,
  FiPlus,
  FiServer,
  FiVideo,
} from "react-icons/fi";
import { useUploadFileChatMessageMutation } from "@/redux/features/chat/chat.service";
import { UploadFileChatMessageRequest } from "@/types/request.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MessageType } from "@/types/contants.type";
import {
  addChatMessageSelectedHead,
  addUserContactNew,
} from "@/redux/features/chat/chat.slice";

const ComposeAddDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const user = useAppSelector((selector) => selector.auth.user);
  const userContactSelected = useAppSelector(
    (selector) => selector.chat.userContactSelected
  );
  const dispatch = useAppDispatch();
  const [uploadFileChatMessage] = useUploadFileChatMessageMutation();

  const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    try {
      if (files && files.length > 0) {
        const file = files[0];

        if (file.size > 10 * 1024 * 1024) {
          toast.warning("Ảnh tải lên phải nhỏ hơn 10MB");
        } else {
          const request: UploadFileChatMessageRequest = {
            file,
            senderId: user?.id || "",
            recieverId: userContactSelected?.id || "",
            message: "",
            type: MessageType.IMAGE,
          };
          const response = await uploadFileChatMessage(request).unwrap();
          if (response.code == 201) {
            dispatch(addChatMessageSelectedHead(response.data));
            dispatch(
              addUserContactNew({
                message: response.data,
                userId: user?.id || "",
              })
            );
          }
          setShow(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    try {
      if (files && files.length > 0) {
        const file = files[0];

        if (file.size > 10 * 1024 * 1024) {
          toast.warning("Video tải lên phải nhỏ hơn 10MB");
        } else {
          const request: UploadFileChatMessageRequest = {
            file,
            senderId: user?.id || "",
            recieverId: userContactSelected?.id || "",
            message: "",
            type: MessageType.VIDEO,
          };
          const response = await uploadFileChatMessage(request).unwrap();
          if (response.code == 201) {
            dispatch(addChatMessageSelectedHead(response.data));
            dispatch(
              addUserContactNew({
                message: response.data,
                userId: user?.id || "",
              })
            );
          }
          setShow(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`dropdown compose-dropdown is-spaced is-accent is-up dropdown-trigger ${
        show ? "is-active" : ""
      }`}>
      <div>
        <div
          className="add-button"
          ref={nodeRefParent}
          onClick={() => setShow((prev) => !prev)}>
          <div className="button-inner">
            <FiPlus />
          </div>
        </div>
      </div>
      <div className="dropdown-menu" role="menu" ref={nodeRefChild}>
        <div className="dropdown-content">
          <label>
            <a className="dropdown-item">
              <div className="media">
                <FiImage />
                <div className="media-content">
                  <h3>Hình ảnh</h3>
                  <small>Chọn ảnh bạn muốn gửi</small>
                </div>
              </div>
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleChangePhoto}
              />
            </a>
          </label>
          <label>
            <a className="dropdown-item">
                <div className="media">
                  <FiVideo />
                  <div className="media-content">
                    <h3>Video</h3>
                    <small>Chọn video bạn muốn gửi</small>
                  </div>
                </div>
                <input
                  hidden
                  type="file"
                  accept="video/*"
                  onChange={handleChangeVideo}
                />
            </a>
          </label>
          {/* <hr className="dropdown-divider" /> */}
        </div>
      </div>
    </div>
  );
};

export default ComposeAddDropdown;
