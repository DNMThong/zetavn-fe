"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React from "react";
import {
  FiBell,
  FiHeart,
  FiImage,
  FiMessageSquare,
  FiYoutube,
} from "react-icons/fi";

const NotificationsDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();

  return (
    <div className="navbar-item is-icon drop-trigger" ref={nodeRefParent}>
      <button onClick={() => setShow((prev) => !prev)} className="icon-link">
        <FiBell />
        <span className="indicator"></span>
      </button>

      <div className={`nav-drop ${show ? "is-active" : ""}`} ref={nodeRefChild}>
        <div className="inner">
          <div className="nav-drop-header">
            <span>Notifications</span>
            <a href="#">
              <FiBell />
            </a>
          </div>
          <div className="nav-drop-body is-notifications">
            {/* <!-- Notification --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/david.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <span>
                  <a href="#">David Kim</a> commented on
                  <a href="#">your post</a>.
                </span>
                <span className="time">30 minutes ago</span>
              </div>
              <div className="media-right">
                <div className="added-icon">
                  <FiMessageSquare />
                </div>
              </div>
            </div>
            {/* <!-- Notification --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/daniel.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <span>
                  <a href="#">Daniel Wellington</a> liked your
                  <a href="#">profile.</a>
                </span>
                <span className="time">43 minutes ago</span>
              </div>
              <div className="media-right">
                <div className="added-icon">
                  <FiHeart />
                </div>
              </div>
            </div>
            {/* <!-- Notification --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/stella.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <span>
                  <a href="#">Stella Bergmann</a> shared a
                  <a href="#">New video</a> on your wall.
                </span>
                <span className="time">Yesterday</span>
              </div>
              <div className="media-right">
                <div className="added-icon">
                  <FiYoutube />
                </div>
              </div>
            </div>
            {/* <!-- Notification --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/elise.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <span>
                  <a href="#">Elise Walker</a> shared an <a href="#">Image</a>{" "}
                  with you an 2 other people.
                </span>
                <span className="time">2 days ago</span>
              </div>
              <div className="media-right">
                <div className="added-icon">
                  <FiImage />
                </div>
              </div>
            </div>
          </div>
          <div className="nav-drop-footer">
            <a href="#">View All</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
