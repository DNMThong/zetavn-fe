"use client";

import useClickOutside from "@/hooks/useClickOutside";
import React from "react";
import { FiBell, FiBookmark, FiFlag, FiMoreVertical } from "react-icons/fi";

const FeedPostDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  return (
    <div
      className={`dropdown is-spaced is-right is-neutral dropdown-trigger ${
        show ? "is-active" : ""
      }`}>
      <div>
        <div
          className="button"
          onClick={() => setShow((prev) => !prev)}
          ref={nodeRefParent}>
          <FiMoreVertical />
        </div>
      </div>
      <div className="dropdown-menu" role="menu" ref={nodeRefChild}>
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            <div className="media">
              <FiBookmark />
              <div className="media-content">
                <h3>Bookmark</h3>
                <small>Add this post to your bookmarks.</small>
              </div>
            </div>
          </a>
          <a className="dropdown-item">
            <div className="media">
              <FiBell />
              <div className="media-content">
                <h3>Notify me</h3>
                <small>Send me the updates.</small>
              </div>
            </div>
          </a>
          <hr className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <div className="media">
              <FiFlag />
              <div className="media-content">
                <h3>Flag</h3>
                <small>In case of inappropriate content.</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeedPostDropdown;
