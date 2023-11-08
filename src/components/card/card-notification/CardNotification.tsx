import { ImageDefault, PostNotificationType } from "@/types/contants.type";
import { PostNotification } from "@/types/post.type";
import { calculateTimeAgo } from "@/utils/calculate-time.util";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiHeart, FiMessageSquare, FiShare, FiShare2 } from "react-icons/fi";

interface CardNotificationProps {
  data: PostNotification;
}

const CardNotification = ({ data }: CardNotificationProps) => {
  return (
    <div className="media">
      <figure className="media-left">
        <p className="image">
          <Image
            style={{ objectFit: "cover" }}
            src={data.interacting.avatar || ImageDefault.AVATAR}
            alt=""
            width={300}
            height={300}
          />
        </p>
      </figure>
      {data.type === PostNotificationType.COMMENT && (
        <>
          <div className="media-content">
            <span>
              <Link href="#">{data.interacting.display}</Link> đã bình luận{" "}
              <Link href="#">bài viết của bạn</Link>.
            </span>
            <span className="time">{calculateTimeAgo(data.createdAt)}</span>
          </div>
          <div className="media-right">
            <div className="added-icon">
              <FiMessageSquare />
            </div>
          </div>
        </>
      )}
      {data.type === PostNotificationType.LIKE && (
        <>
          <div className="media-content">
            <span>
              <Link href="#">{data.interacting.display}</Link> đã thích{" "}
              <Link href="#">bài viết của bạn</Link>.
            </span>
            <span className="time">{calculateTimeAgo(data.createdAt)}</span>
          </div>
          <div className="media-right">
            <div className="added-icon">
              <FiHeart />
            </div>
          </div>
        </>
      )}
      {data.type === PostNotificationType.SHARE && (
        <>
          <div className="media-content">
            <span>
              <Link href="#">{data.interacting.display}</Link> đã chia sẽ{" "}
              <Link href="#">bài viết của bạn</Link>.
            </span>
            <span className="time">{calculateTimeAgo(data.createdAt)}</span>
          </div>
          <div className="media-right">
            <div className="added-icon">
              <FiShare2 />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardNotification;
