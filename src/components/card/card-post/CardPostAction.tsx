"use client";
import {
  useLazyCheckLikePostQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/redux/features/post/post.service";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { FiLink2, FiMessageCircle } from "react-icons/fi";

interface CardPostActionProps {
  onClickComment?: () => void;
  onClickShare?: () => void;
  postId: string;
}

const CardPostAction = ({
  onClickComment = () => {},
  onClickShare = () => {},
  postId,
}: CardPostActionProps) => {
  const user = useAppSelector((selector) => selector.auth.user);
  const [checkLikePost] = useLazyCheckLikePostQuery();
  const [liked, setLiked] = useState(false);
  const [like] = useLikePostMutation();
  const [unlike] = useUnlikePostMutation();

  useEffect(() => {
    const fetchCheckLikePost = async () => {
      const response = await checkLikePost({
        postId: postId,
      }).unwrap();
      if (response.code === 200) {
        setLiked(response.data);
      }
    };
    fetchCheckLikePost();
  }, [checkLikePost, user, postId]);

  const handleLikePost = async () => {
    if (liked) {
      const response = await unlike({
        postId,
      }).unwrap();
      console.log("unlike", response);
    } else {
      const response = await like({
        postId,
      }).unwrap();
      console.log("like", response);
    }
    setLiked((prev) => !prev);
  };

  return (
    <>
      <div className="like-wrapper" onClick={handleLikePost}>
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
