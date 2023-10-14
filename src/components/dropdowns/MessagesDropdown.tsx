"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React from "react";
import { FiMail, FiMessageSquare } from "react-icons/fi";

const MessagesDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();

  return (
    <div className="navbar-item is-icon drop-trigger" ref={nodeRefParent}>
      <button
        onClick={() => setShow((prev) => !prev)}
        className="icon-link is-active">
        <FiMail />
        <span className="indicator"></span>
      </button>

      <div className={`nav-drop ${show && "is-active"}`} ref={nodeRefChild}>
        <div className="inner">
          <div className="nav-drop-header">
            <span>Messages</span>
            <a href="messages-inbox.html">Inbox</a>
          </div>
          <div className="nav-drop-body is-friend-requests">
            {/* <!-- Message --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/150x150"
                    data-demo-src="/img/avatars/nelly.png"
                    data-user-popover="9"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <a href="#">Nelly Schwartz</a>
                <span>
                  I think we should meet near the Starbucks so we can get...
                </span>
                <span className="time">Yesterday</span>
              </div>
              <div className="media-right is-centered">
                <div className="added-icon">
                  <FiMessageSquare />
                  
                </div>
              </div>
            </div>
            {/* <!-- Message --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/150x150"
                    data-demo-src="/img/avatars/edward.jpeg"
                    data-user-popover="5"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <a href="#">Edward Mayers</a>
                <span>
                  That was a real pleasure seeing you last time we really
                  should...
                </span>
                <span className="time">last week</span>
              </div>
              <div className="media-right is-centered">
                <div className="added-icon">
                  <FiMessageSquare />
                </div>
              </div>
            </div>
            {/* <!-- Message --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/150x150"
                    data-demo-src="/img/avatars/dan.jpg"
                    data-user-popover="1"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <a href="#">Dan Walker</a>
                <span>
                  Hey there, would it be possible to borrow your bicycle, i
                  really need...
                </span>
                <span className="time">Jun 03 2018</span>
              </div>
              <div className="media-right is-centered">
                <div className="added-icon">
                  <FiMessageSquare />
                </div>
              </div>
            </div>
          </div>
          <div className="nav-drop-footer">
            <a href="#">Clear All</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesDropdown;
