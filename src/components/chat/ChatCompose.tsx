"use client";
import { useState } from "react";
import { ComposeAddDropdown } from "../dropdowns";
import { IoMdSend } from "react-icons/io";
import { FiSmile } from "react-icons/fi";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import useClickOutside from "@/hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Message } from "@/types/chat.type";
import { MessageType } from "@/types/contants.type";
import { useCreateChatMessageMutation } from "@/redux/features/chat/chat.service";
import {
  addChatMessageSelectedHead,
  addUserContactNew,
} from "@/redux/features/chat/chat.slice";

const ChatCompose = () => {
  const [value, setValue] = useState("");
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const user = useAppSelector((selector) => selector.auth.user);
  const userContactSelected = useAppSelector(
    (selector) => selector.chat.userContactSelected
  );
  const [createChatMessage] = useCreateChatMessageMutation();
  const dispatch = useAppDispatch();

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setValue((prevValue) => prevValue + emoji.emoji);
  };

  const handleOpenEmoji = () => {
    setShow((prev) => !prev);
  };

  const handleSendMessage = async () => {
    console.log(value);
    const message = {
      recieverId: userContactSelected?.id || "",
      message: value,
      type: MessageType.TEXT,
    };

    const response = await createChatMessage(message).unwrap();

    if (response.code == 201) {
      dispatch(addChatMessageSelectedHead(response.data));
      dispatch(
        addUserContactNew({
          message: response.data,
          userId: user?.id || "",
        })
      );
      setValue("");
    }
  };

  return (
    <div className="chat-action">
      <div className="chat-action-inner">
        <div className="control">
          <div className="chat-action-icon">
            <div ref={nodeRefParent} className="chat-emoji-wapper">
              {show && (
                <div className="emoji-picker-chat" ref={nodeRefChild}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <button className="btn-action" onClick={handleOpenEmoji}>
                <FiSmile />
              </button>
            </div>

            <button className="btn-action" onClick={handleSendMessage}>
              <IoMdSend />
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="textarea comment-textarea"
            rows={1}></textarea>
          <ComposeAddDropdown />
        </div>
      </div>
    </div>
  );
};

export default ChatCompose;
