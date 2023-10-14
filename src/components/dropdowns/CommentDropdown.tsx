"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React from "react";
import { FiFlag, FiMoreVertical, FiX } from "react-icons/fi";

const CommentDropdown = () => {
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
          <a className="dropdown-item">
            <div className="media">
              <FiX />
              <div className="media-content">
                <h3>Hide</h3>
                <small>Hide this comment.</small>
              </div>
            </div>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <div className="media">
              <FiFlag />
              <div className="media-content">
                <h3>Report</h3>
                <small>Report this comment.</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommentDropdown;
