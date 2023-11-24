"use client";
import React from "react";
import { FiAtSign, FiSearch, FiStar, FiX, FiMenu } from "react-icons/fi";
import { ChatSettingDropdown } from "../dropdowns";
import { useDispatch } from "react-redux";
import {
  setOpenChatDetails,
  setOpenChat,
  toggleOpenChatDetails,
} from "@/redux/features/chat/chat.slice";
import { useAppSelector } from "@/redux/hooks";

const ChatNav = () => {
  const dispatch = useDispatch();
  const userContactSelected = useAppSelector(
    (selector) => selector.chat.userContactSelected
  );

  const handleCloseChat = () => {
    dispatch(setOpenChat(false));
  };

  const handleOpenChatDetails = () => {
    dispatch(toggleOpenChatDetails());
  };

  return (
    <div className="chat-nav">
      <div className="nav-logo">
        <img
          className="light-image"
          src="img/vector/logo/friendkit-bold.svg"
          alt=""
        />
        <img
          className="dark-image"
          src="img/vector/logo/friendkit-white.svg"
          alt=""
        />
      </div>
      {userContactSelected && (
        <div className="nav-start">
          <div className="recipient-block">
            <div className="avatar-container">
              <img
                className="user-avatar"
                src={userContactSelected?.avatar || ""}
                alt="avatar"
              />
            </div>
            <div className="username">
              <span>{userContactSelected?.display}</span>
              {/* <span>
                <FiStar />
                <span>
                  | {userContactSelected?.isOnline ? "Online" : "Offline"}
                </span>
              </span> */}
            </div>
          </div>
        </div>
      )}
      <div className="nav-end">
        {/* <!-- Settings icon dropdown --> */}
        {/* {{> settings-dropdown}} */}
        <ChatSettingDropdown />

        <div className="chat-search">
          <div className="control has-icon">
            <input
              type="text"
              className="input"
              placeholder="Search messages"
            />
            <div className="form-icon">
              <FiSearch />
            </div>
          </div>
        </div>
        {/* <a className="chat-nav-item is-icon is-hidden-mobile">
          <FiAtSign />
        </a>
        <a className="chat-nav-item is-icon is-hidden-mobile">
          <FiStar />
        </a> */}

        <a className="chat-nav-item is-icon" onClick={handleOpenChatDetails}>
          <FiMenu />
        </a>
        <a
          className="chat-nav-item is-icon close-chat"
          onClick={handleCloseChat}>
          <FiX />
        </a>
      </div>
    </div>
  );
};

export default ChatNav;
