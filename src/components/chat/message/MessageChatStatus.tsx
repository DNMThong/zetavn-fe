import { MessageStatus } from "@/types/contants.type";
import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

interface MessageStatusProps {
  messageStatus: MessageStatus;
}

const MessageChatStatus = ({ messageStatus }: MessageStatusProps) => {
  return (
    <>
      {messageStatus === MessageStatus.SENT && <span>Đã gửi</span>}
      {messageStatus === MessageStatus.READ && <span>Đã xem</span>}
    </>
  );
};

export default MessageChatStatus;
