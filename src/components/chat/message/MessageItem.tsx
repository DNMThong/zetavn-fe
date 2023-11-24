"use client";
import { useAppSelector } from "@/redux/hooks";
import { Message } from "@/types/chat.type";
import React from "react";
import MessageChatStatus from "./MessageChatStatus";
import { calculateTime } from "@/utils/calculate-time.util";
import { ImageDefault, MessageType } from "@/types/contants.type";
import { Fancybox } from "@/components/fancybox";
import VideoUploadDisplay from "@/components/card/card-compose/VideoUploadDisplay";
import ReactPlayer from "react-player";

interface MessageItemProps {
  message: Message;
}
const MessageItem = ({ message }: MessageItemProps) => {
  const user = useAppSelector((selector) => selector.auth.user);
  return (
    <div
      className={`chat-message ${
        message.reciever.id === user?.id ? "is-received" : "is-sent"
      }`}>
      <img src={message.sender.avatar || ImageDefault.AVATAR} alt="" />
      <div className="message-block">
        <div className="message-info">
          <span>{calculateTime(message.createdAt)}</span>
          <MessageChatStatus messageStatus={message.status} />
        </div>
        {message.type === MessageType.TEXT && (
          <div className="message-content">{message.message}</div>
        )}
        {message.type === MessageType.IMAGE && (
          <div className="message-content message-image">
            <a
              data-fancybox={message.message}
              data-lightbox-type="image"
              href={message.message}>
              <img src={message.message} alt="" />
            </a>
          </div>
        )}
        {message.type === MessageType.VIDEO && (
          <div className="message-content">
            <ReactPlayer
              width="100%"
              height="auto"
              controls={true}
              url={message.message}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
