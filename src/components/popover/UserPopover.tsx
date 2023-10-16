import User, { UserShort } from "@/types/user.type";
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
                <img
                  src={
                    userInfo?.poster || "https://via.placeholder.com/1600x900"
                  }
                />
                <div className="popover-avatar">
                  <img
                    className="avatar"
                    src={
                      userInfo?.avatar || "https://via.placeholder.com/300x300"
                    }
                  />
                </div>
              </div>

              <div className="popover-meta">
                <span className="user-meta">
                  <span className="username">{userInfo?.display}</span>
                </span>
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
              <a href="#" className="popover-icon">
                <FiMoreHorizontal />
              </a>
              <a href="#" className="popover-icon">
                <FiBookmark />
              </a>
              <a href="#" className="popover-icon">
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
