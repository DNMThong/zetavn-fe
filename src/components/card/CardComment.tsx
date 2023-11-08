"use client";
import React, { useState } from "react";
import { CardSubComment } from "@/components/card";
import { CommentDropdown } from "@/components/dropdowns";
import { UserPopover } from "../popover";
import { Comment } from "@/types/post.type";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { calculateTime } from "@/utils/calculate-time.util";
import { Fancybox } from "@/components/fancybox";

interface CardCommentProps {
  data: Comment;
}

const CardComment = ({ data }: CardCommentProps) => {
  const [hover, setHover] = useState(false);
  const user = useAppSelector((selector) => selector.auth.user);

  return (
    <div className="media is-comment">
      {/* <!-- User image --> */}
      <div className="media-left">
        <div
          className="image is-relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          <Image
            className="img"
            style={{ objectFit: "cover" }}
            src={data.user.avatar || "https://via.placeholder.com/300x300"}
            alt="avatar"
            width={420}
            height={420}
          />
          {hover && (
            <UserPopover
              userInfo={data.user}
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
        <Link href={`/profile/${data.user.id}`}>{data.user.display}</Link>
        <span className="time">{calculateTime(data.createdAt)}</span>
        <p>{data.content}</p>

        {data.mediaPath && (
          <Fancybox
            options={{
              Carousel: {
                infinite: false,
              },
            }}>
            <a
              data-fancybox="comment"
              data-lightbox-type="image"
              href={data.mediaPath}>
              <Image
                src={data.mediaPath}
                alt="image"
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "100%" }}
              />
            </a>
          </Fancybox>
        )}

        {/* <!-- Actions --> */}
        <div className="controls">
          {/* <div className="like-count">
            <FiThumbsUp />
            <span>4</span>
          </div> */}
          <div className="reply">
            <a>Reply</a>
          </div>
          {user?.id === data.user.id && (
            <div className="edit">
              <a>Edit</a>
            </div>
          )}
        </div>

        {/* <CardSubComment />
        <CardSubComment />
        <CardSubComment /> */}
      </div>
      <div className="media-right">
        <CommentDropdown />
      </div>
    </div>
  );
};

export default CardComment;
