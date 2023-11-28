import React from "react";
import {
  FiMoreVertical,
  FiSettings,
  FiTrash2,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

const SuggestedFriendsWidget = () => {
  return (
    <div className="card">
      <div className="card-heading is-bordered">
        <h4>Gợi ý kết bạn</h4>
        <div className="dropdown is-spaced is-right dropdown-trigger">
          <div>
            <div className="button">
              <FiMoreVertical />
            </div>
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a href="#" className="dropdown-item">
                <div className="media">
                  <FiUsers />
                  <div className="media-content">
                    <h3>All Suggestions</h3>
                    <small>View all friend suggestions.</small>
                  </div>
                </div>
              </a>
              <a className="dropdown-item">
                <div className="media">
                  <FiSettings />
                  <div className="media-content">
                    <h3>Settings</h3>
                    <small>Access widget settings.</small>
                  </div>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <FiTrash2 />
                  <div className="media-content">
                    <h3>Remove</h3>
                    <small>Removes this widget from your feed.</small>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedFriendsWidget;
