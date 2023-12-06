"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { FiUser, FiX } from "react-icons/fi";
import ChatNav from "./ChatNav";
import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatDetail from "./ChatDetail";

const ChatWrapper = () => {
  const openChat = useAppSelector((selector) => selector.chat.openChat);

  return (
    <>
      <div className={`chat-wrapper ${openChat ? "is-active" : ""}`}>
        <div className="chat-inner">
          {/* Chat top navigation */}
          <ChatNav />

          {/* Chat sidebar */}
          <ChatSidebar />

          {/* Chat body */}
          <ChatBody />

          <ChatDetail />
        </div>
      </div>
      {/* {{> add-conversation-modal}} */}
    </>
  );
};

export default ChatWrapper;
