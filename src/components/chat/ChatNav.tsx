"use client";
import React from "react";
import { FiAtSign, FiSearch, FiStar, FiX } from "react-icons/fi";
import { ChatSettingDropdown } from "../dropdowns";
import { useDispatch } from "react-redux";
import { setOpenChat } from "@/redux/features/global.slice";

const ChatNav = () => {
  const dispatch = useDispatch();
  const handleCloseChat = () => {
    dispatch(setOpenChat(false));
  };
  return (
    <div className="chat-nav">
      <div className="nav-start">
        <div className="recipient-block">
          <div className="avatar-container">
            <img
              className="user-avatar"
              src="https://via.placeholder.com/300x300"
              data-demo-src="assets/img/avatars/dan.jpg"
              alt=""
            />
          </div>
          <div className="username">
            <span>Dan Walker</span>
            <span>
              <FiStar />
              <span>| Online</span>
            </span>
          </div>
        </div>
      </div>
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
        <a className="chat-nav-item is-icon is-hidden-mobile">
          <FiAtSign />
        </a>
        <a className="chat-nav-item is-icon is-hidden-mobile">
          <FiStar />
        </a>

        {/* <!-- More dropdown --> */}
        {/* {{> chat-menu-dropdown}} */}
        <ChatSettingDropdown />

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
