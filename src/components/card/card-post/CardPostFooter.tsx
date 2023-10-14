import { UserPopover } from "@/components/popover";
import React from "react";
import { FiHeart, FiLink2, FiMessageCircle } from "react-icons/fi";
import UserMetaLike from "./UserMetaLike";

const CardPostFooter = () => {
  return (
    <div className="card-footer">
      {/* <!-- Followers avatars --> */}
      <div className="likers-group">
        <UserMetaLike />
        <UserMetaLike />
        <UserMetaLike />
        <UserMetaLike />
      </div>
      {/* <!-- Followers text --> */}
      <div className="likers-text">
        <p>
          <a href="#">Milly</a>,<a href="#">David</a>
        </p>
        <p>and 23 more liked this</p>
      </div>
      {/* <!-- Post statistics --> */}
      <div className="social-count">
        <div className="likes-count">
          <FiHeart />
          <span>27</span>
        </div>
        <div className="shares-count">
          <FiLink2 />
          <span>9</span>
        </div>
        <div className="comments-count">
          <FiMessageCircle />
          <span>3</span>
        </div>
      </div>
    </div>
  );
};

export default CardPostFooter;
