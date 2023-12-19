import { UserPopover } from "@/components/popover";
import React from "react";
import { FiHeart, FiLink2, FiMessageCircle } from "react-icons/fi";
import UserMetaLike from "./UserMetaLike";
import { UserShort } from "@/types/user.type";
import { DataPostFooter } from "./CardPost";

interface CardPostFooterProps {
  dataPostFooter: DataPostFooter;
}

const CardPostFooter = ({
  dataPostFooter: { countComment, countLike, userLike },
}: CardPostFooterProps) => {
  return (
    <div className="card-footer">
      {/* <!-- Followers avatars --> */}
      <div className="likers-group">
        {userLike.length > 0 &&
          userLike.map((item) => <UserMetaLike key={item.id} data={item} />)}
      </div>
      {/* <!-- Followers text --> */}
      <div className="likers-text">
        {/* <p>
          <a href="#">Milly</a>,<a href="#">David</a>
        </p> */}
        {countLike - userLike.length <= 0 && <p>{countLike} người đã thích</p>}
        {countLike - userLike.length > 0 && (
          <p>và {countLike - userLike.length} người khác đã thích</p>
        )}
      </div>
      {/* <!-- Post statistics --> */}
      <div className="social-count">
        <div className="likes-count">
          <FiHeart />
          <span>{countLike}</span>
        </div>
        <div className="shares-count">
          <FiLink2 />
          <span>0</span>
        </div>
        <div className="comments-count">
          <FiMessageCircle />
          <span>{countComment}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPostFooter;
