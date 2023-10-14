"use client";
import { useState } from "react";
import { FiLink2, FiMessageCircle } from "react-icons/fi";

interface CardPostActionProps {
  onClickComment?: () => void;
  onClickShare?: () => void;
}

const CardPostAction = ({
  onClickComment = () => {},
  onClickShare = () => {},
}: CardPostActionProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="like-wrapper" onClick={() => setLiked((prev) => !prev)}>
        <a className={`like-button ${liked ? "is-active" : ""}`}>
          <i className="mdi mdi-heart not-liked bouncy"></i>
          <i className="mdi mdi-heart is-liked bouncy"></i>
          <span className="like-overlay"></span>
        </a>
      </div>

      <div className="fab-wrapper is-share" onClick={onClickShare}>
        <a
          className="small-fab share-fab modal-trigger"
          data-modal="share-modal">
          <FiLink2 />
        </a>
      </div>

      <div className="fab-wrapper is-comment" onClick={onClickComment}>
        <a className="small-fab">
          <FiMessageCircle />
        </a>
      </div>
    </>
  );
};

export default CardPostAction;
