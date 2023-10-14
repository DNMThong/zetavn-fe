"use client";
import React, { useState } from "react";
import { CardSubComment } from "@/components/card";
import { CommentDropdown } from "@/components/dropdowns";
import { UserPopover } from "../popover";

const CardComment = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="media is-comment">
      {/* <!-- User image --> */}
      <div className="media-left">
        <div
          className="image is-relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          <img
            className="img"
            src="https://via.placeholder.com/300x300"
            alt=""
          />
          {hover && (
            <UserPopover
              stylesArrow={{
                borderWidth: "18px",
                top: "-28px",
              }}
            />
          )}
        </div>
      </div>
      {/* <!-- Content --> */}
      <div className="media-content">
        <a href="#">Dan Walker</a>
        <span className="time">28 minutes ago</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris consequat.
        </p>
        {/* <!-- Actions --> */}
        <div className="controls">
          <div className="like-count">
            <i data-feather="thumbs-up"></i>
            <span>4</span>
          </div>
          <div className="reply">
            <a href="#">Reply</a>
          </div>
          <div className="edit">
            <a href="#">Edit</a>
          </div>
        </div>

        <CardSubComment />
        <CardSubComment />
        <CardSubComment />
      </div>
      <div className="media-right">
        <CommentDropdown />
      </div>
    </div>
  );
};

export default CardComment;
