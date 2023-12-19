"use client";
import {
  useLazyCheckLikePostQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/redux/features/post/post.service";
import { useAppSelector } from "@/redux/hooks";
import { UserShort } from "@/types/user.type";
import { useEffect, useState } from "react";
import { FiLink2, FiMessageCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { DataPostFooter } from "./CardPost";

interface CardPostActionProps {
  onClickComment?: () => void;
  onClickShare?: () => void;
  postId: string;
  setDataPostFooter: React.Dispatch<React.SetStateAction<DataPostFooter>>;
}

const CardPostAction = ({
  onClickComment = () => {},
  onClickShare = () => {},
  postId,
  setDataPostFooter,
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
    try {
      if (liked) {
        const response = await unlike({
          postId,
        }).unwrap();
        if (response.code === 200) {
          setDataPostFooter((prev) => {
            const index = prev.userLike.findIndex(
              (item) => item.id === user?.id
            );
            const userLikeNew = [...prev.userLike];
            if (index >= 0) {
              userLikeNew.splice(index, 1);
            }
            return {
              ...prev,
              countLike: prev.countLike - 1,
              userLike: userLikeNew,
            };
          });
        }
      } else {
        const response = await like({
          postId,
        }).unwrap();
        if (response.code === 200) {
          const userShort: UserShort = {
            avatar: user?.avatar || "",
            display: user?.display || "",
            firstName: user?.firstName || "",
            id: user?.id || "",
            lastName: user?.lastName || "",
            poster: user?.poster || "",
            username: user?.username || "",
          };
          setDataPostFooter((prev) => {
            return {
              ...prev,
              countLike: prev.countLike + 1,
              userLike:
                prev.userLike?.length >= 5
                  ? [...prev.userLike]
                  : [...prev.userLike, userShort],
            };
          });
        }
      }
      setLiked((prev) => !prev);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra vui lòng thử lại");
    }
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
