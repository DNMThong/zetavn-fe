import React from "react";
import { FiUser } from "react-icons/fi";

const ChatSidebar = () => {
  return (
    <div id="chat-sidebar" className="users-sidebar">
      {/* <!-- Header --> */}
      <div className="header-item">
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
      {/* <!-- User list --> */}
      <div className="conversations-list has-slimscroll-xs  ">
        {Array.from([1, 2, 3, 4, 5]).map((item) => (
          <div
            key={item}
            className={`user-item ${item === 1 ? "is-active" : ""}`}>
            <div className="avatar-container">
              <img
                className="user-avatar"
                src="https://via.placeholder.com/300x300"
                alt=""
              />
              <div className="user-status is-online"></div>
            </div>
          </div>
        ))}
      </div>
      {/* <!-- Add Conversation --> */}
      <div className="footer-item">
        <div
          className="add-button modal-trigger"
          data-modal="add-conversation-modal">
          <FiUser />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
