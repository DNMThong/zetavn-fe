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
      <div className="card-body no-padding">
        {/* <!-- Suggested friend --> */}
        <div className="add-friend-block transition-block">
          <img
            src="https://via.placeholder.com/300x300"
            data-demo-src="/img/avatars/nelly.png"
            data-user-popover="9"
            alt=""
          />
          <div className="page-meta">
            <span>Nelly Schwartz</span>
            <span>Melbourne</span>
          </div>
          <div className="add-friend add-transition">
            <FiUserPlus />
          </div>
        </div>
        {/* <!-- Suggested friend --> */}
        <div className="add-friend-block transition-block">
          <img
            src="https://via.placeholder.com/300x300"
            data-demo-src="/img/avatars/lana.jpeg"
            data-user-popover="10"
            alt=""
          />
          <div className="page-meta">
            <span>Lana Henrikssen</span>
            <span>Helsinki</span>
          </div>
          <div className="add-friend add-transition">
            <FiUserPlus />
          </div>
        </div>
        {/* <!-- Suggested friend --> */}
        <div className="add-friend-block transition-block">
          <img
            src="https://via.placeholder.com/300x300"
            data-demo-src="/img/avatars/gaelle.jpeg"
            data-user-popover="11"
            alt=""
          />
          <div className="page-meta">
            <span>Gaelle Morris</span>
            <span>Lyon</span>
          </div>
          <div className="add-friend add-transition">
            <FiUserPlus />
          </div>
        </div>
        {/* <!-- Suggested friend --> */}
        <div className="add-friend-block transition-block">
          <img
            src="https://via.placeholder.com/300x300"
            data-demo-src="/img/avatars/mike.jpg"
            data-user-popover="12"
            alt=""
          />
          <div className="page-meta">
            <span>Mike Lasalle</span>
            <span>Toronto</span>
          </div>
          <div className="add-friend add-transition">
            <FiUserPlus />
          </div>
        </div>
        {/* <!-- Suggested friend --> */}
        <div className="add-friend-block transition-block">
          <img
            src="https://via.placeholder.com/300x300"
            data-demo-src="/img/avatars/rolf.jpg"
            data-user-popover="13"
            alt=""
          />
          <div className="page-meta">
            <span>Rolf Krupp</span>
            <span>Berlin</span>
          </div>
          <div className="add-friend add-transition">
            <FiUserPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedFriendsWidget;
