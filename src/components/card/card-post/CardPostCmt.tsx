"use client";
import React from "react";
import { FiX } from "react-icons/fi";
import { CardComment } from "@/components/card";

interface CardPostCmtProps {
  open: boolean;
  handleClose: () => void;
}

const CardPostCmt = ({ open = false, handleClose }: CardPostCmtProps) => {
  return (
    <div className={`comments-wrap ${open ? "" : "is-hidden"}`}>
      {/* <!-- Header --> */}
      <div className="comments-heading">
        <h4>
          Comments <small>(8)</small>
        </h4>
        <div className="close-comments" onClick={handleClose}>
          <FiX />
        </div>
      </div>
      {/* <!-- /Header --> */}

      <div className="comments-body has-slimscroll">
        <CardComment />
        <CardComment />
        <CardComment />
        <CardComment />
      </div>

      {/* <!-- Comments footer --> */}
      <div className="card-footer">
        <div className="media post-comment has-emojis">
          {/* <!-- Comment Textarea --> */}
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea comment-textarea"
                  rows={5}
                  placeholder="Write a comment..."></textarea>
              </p>
            </div>
            {/* <!-- Additional actions --> */}
            <div className="actions">
              <div className="image is-32x32">
                <img
                  className="is-rounded"
                  src="https://via.placeholder.com/300x300"
                  data-demo-src="assets/img/avatars/jenna.png"
                  data-user-popover="0"
                  alt=""
                />
              </div>
              <div className="toolbar">
                <div className="action is-auto">
                  <i data-feather="at-sign"></i>
                </div>
                <div className="action is-emoji">
                  <i data-feather="smile"></i>
                </div>
                <div className="action is-upload">
                  <i data-feather="camera"></i>
                  <input type="file" />
                </div>
                <a className="button is-solid primary-button raised">
                  Post Comment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Comments footer --> */}
    </div>
  );
};

export default CardPostCmt;
