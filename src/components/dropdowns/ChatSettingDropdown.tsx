import React from "react";
import {
  FiBell,
  FiBellOff,
  FiBox,
  FiMessageSquare,
  FiSettings,
  FiTrash2,
} from "react-icons/fi";

const ChatSettingDropdown = () => {
  return (
    <div className="dropdown is-spaced is-neutral is-right dropdown-trigger">
      <div>
        <a className="chat-nav-item is-icon">
          <FiSettings />
        </a>
      </div>
      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            <div className="media">
              <FiMessageSquare />
              <div className="media-content">
                <h3>Details</h3>
                <small>View this conversation is details.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiSettings />
              <div className="media-content">
                <h3>Preferences</h3>
                <small>Define your preferences.</small>
              </div>
            </div>
          </a>
          <hr className="dropdown-divider" />
          <a className="dropdown-item">
            <div className="media">
              <FiBell />
              <div className="media-content">
                <h3>Notifications</h3>
                <small>Set notifications settings.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiBellOff />
              <div className="media-content">
                <h3>Silence</h3>
                <small>Disable notifications.</small>
              </div>
            </div>
          </a>
          <hr className="dropdown-divider" />
          <a className="dropdown-item">
            <div className="media">
              <FiBox />
              <div className="media-content">
                <h3>Archive</h3>
                <small>Archive this conversation.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiTrash2 />
              <div className="media-content">
                <h3>Delete</h3>
                <small>Delete this conversation.</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatSettingDropdown;
