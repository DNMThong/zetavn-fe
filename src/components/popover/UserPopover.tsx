"use client";
import {
  setOpenChat,
  setUserContactSelected,
} from "@/redux/features/chat/chat.slice";
import { useAppDispatch } from "@/redux/hooks";
import { ImageDefault } from "@/types/contants.type";
import User, { UserShort } from "@/types/user.type";
import Link from "next/link";
import React from "react";
import { createPortal } from "react-dom";
import {
  FiBookmark,
  FiMapPin,
  FiMessageCircle,
  FiMoreHorizontal,
  FiUser,
} from "react-icons/fi";

interface UserPopoverProps {
  stylesArrow?: {};
  userInfo: UserShort;
}

const UserPopover = ({ stylesArrow, userInfo }: UserPopoverProps) => {
  const dispatch = useAppDispatch();
  const handleChatUser = () => {
    dispatch(setOpenChat(true));
    dispatch(
      setUserContactSelected({
        ...userInfo,
        isOnline: false,
      })
    );
  };

  return (
    <div className="webui-popover pop webui-no-padding bottom in">
      <div className="webui-arrow" style={stylesArrow}></div>
      <div className="webui-popover-inner">
        <div className="webui-popover-content">
          <div className="profile-popover-block">
            <div className="loader-overlay">
              {/* is-active */}
              <div className="loader is-loading"></div>
            </div>

            <div className="profile-popover-wrapper">
              <div className="popover-cover">
                <img src={userInfo?.poster || ImageDefault.POSTER} />
                <div className="popover-avatar">
                  <img
                    className="avatar"
                    src={userInfo?.avatar || ImageDefault.AVATAR}
                  />
                </div>
              </div>

              <div className="popover-meta">
                <div className="user-meta">
                  <Link href={`/${userInfo.username}`}>
                    <span className="username">{userInfo?.display}</span>
                  </Link>
                </div>
                {/* <span className="job-title">{123}</span> */}
                {/* <div className="common-friends">
                  <FiUser />
                  <div className="text">{1} mutual friend(s)</div>
                </div> */}
                {/* <div className="user-location">
                  <FiMapPin />
                  <div className="text">
                    From <a href="#">{123}</a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="popover-actions">
              <a className="popover-icon">
                <FiMoreHorizontal />
              </a>
              <a className="popover-icon">
                <FiBookmark />
              </a>
              <a className="popover-icon" onClick={handleChatUser}>
                <FiMessageCircle />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPopover;
