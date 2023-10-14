import React from "react";
import {
  FiDownloadCloud,
  FiFileText,
  FiGift,
  FiLifeBuoy,
  FiMoreVertical,
  FiUsers,
} from "react-icons/fi";

const ChatMenuDropdown = () => {
  return (
    <div className="dropdown is-spaced is-neutral is-right dropdown-trigger">
      <div>
        <a className="chat-nav-item is-icon no-margin">
          <FiMoreVertical />
        </a>
      </div>
      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            <div className="media">
              <FiFileText />
              <div className="media-content">
                <h3>Files</h3>
                <small>View all your files.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiUsers />
              <div className="media-content">
                <h3>Users</h3>
                <small>View all users you are talking to.</small>
              </div>
            </div>
          </a>
          <hr className="dropdown-divider" />
          <a className="dropdown-item">
            <div className="media">
              <FiGift />
              <div className="media-content">
                <h3>Daily bonus</h3>
                <small>Get your daily bonus.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiDownloadCloud />
              <div className="media-content">
                <h3>Downloads</h3>
                <small>See all your downloads.</small>
              </div>
            </div>
          </a>
          <hr className="dropdown-divider" />
          <a className="dropdown-item">
            <div className="media">
              <FiLifeBuoy />
              <div className="media-content">
                <h3>Support</h3>
                <small>Reach our support team.</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatMenuDropdown;
