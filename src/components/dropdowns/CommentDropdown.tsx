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
                <h3>Ẩn</h3>
                <small>Ẩn bình luận này</small>
              </div>
            </div>
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item">
            <div className="media">
              <FiFlag />
              <div className="media-content">
                <h3>Báo cáo</h3>
                <small>Báo cáo bình luận này</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommentDropdown;
