"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import UserMeta from "./UserMeta";
import CardPostFooter from "./CardPostFooter";
import CardPostCmt from "./CardPostCmt";
import CardPostAction from "./CardPostAction";
import { FeedPostDropdown } from "@/components/dropdowns";
import { ShareModal } from "@/components/modals";
import CardPostImage from "./CardPostImage";
import CardPostText from "./CardPostText";
import Post, { PostNewsfeed } from "@/types/post.type";
import { MediaType } from "@/types/contants.type";
import MoodDisplay from "../card-compose/MoodDisplay";
import ReactPlayer from "react-player";
import { UserShort } from "@/types/user.type";

interface CardPostProps {
  data: PostNewsfeed;
}

export interface DataPostFooter {
  userLike: UserShort[];
  countComment: number;
  countLike: number;
}

const CardPost = ({ data }: CardPostProps) => {
  const [openComment, setOpenComment] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [dataPostFooter, setDataPostFooter] = useState<DataPostFooter>({
    userLike: data.usersLike,
    countComment: data.countComment,
    countLike: data.countLike,
  });

  const images = useMemo<string[]>(() => {
    let images: string[] = [];
    if (data.medias.length > 0) {
      images = data.medias
        .filter((media) => media.mediaType === MediaType.IMAGE)
        .map((media) => media.mediaPath);
    }
    return images;
  }, [data]);

  const video = useMemo<string>(() => {
    let video: string = "";
    if (data.medias.length > 0) {
      video =
        data.medias[0].mediaType === MediaType.VIDEO
          ? data.medias[0].mediaPath
          : "";
    }
    return video;
  }, [data]);

  return (
    <>
      <div id="feed-post-1" className="card is-post">
        {/* <!-- Main wrap --> */}
        <div className={`content-wrap ${openComment ? "is-hidden" : ""}`}>
          {/* <!-- Post header --> */}
          <div className="card-heading">
            {/* <!-- User meta --> */}
            <UserMeta
              accessModifier={data.accessModifier}
              createdAt={data.createdAt}
              userInfo={data.user}
            />
            {/* <!-- Right side dropdown --> */}
            <FeedPostDropdown postId={data.id} userId={data.user.id} />
          </div>
          {/* <!-- /Post header --> */}

          {/* <!-- Post body --> */}
          <div className="card-body">
            {/* <!-- Post body text --> */}
            {data.content && <CardPostText content={data.content} />}
            {data?.activity && <MoodDisplay activityMood={data.activity} />}
            {video && (
              <ReactPlayer
                width="100%"
                height="auto"
                controls={true}
                url={video}
              />
            )}
            {images.length === 0 && (
              <div className="post-actions">
                <CardPostAction
                  setDataPostFooter={setDataPostFooter}
                  postId={data.id}
                  onClickComment={() => setOpenComment(true)}
                  onClickShare={() => setOpenShare(true)}
                />
              </div>
            )}
            {/* <!-- Featured image --> */}
            {images.length > 0 && (
              <CardPostImage
                images={images}
                postAction={
                  <CardPostAction
                    setDataPostFooter={setDataPostFooter}
                    postId={data.id}
                    onClickComment={() => setOpenComment(true)}
                    onClickShare={() => setOpenShare(true)}
                  />
                }
              />
            )}
          </div>
          {/* <!-- /Post body --> */}

          {/* <!-- Post footer --> */}
          <CardPostFooter dataPostFooter={dataPostFooter} />
          {/* <!-- /Post footer --> */}
        </div>
        {/* <!-- /Main wrap --> */}

        {/* <!-- Post #1 Comments --> */}
        {openComment && (
          <CardPostCmt
            postId={data.id}
            open={openComment}
            handleClose={() => setOpenComment(false)}
          />
        )}
        {/* <!-- /Post #1 Comments --> */}
      </div>

      {openShare && (
        <ShareModal
          data={data}
          open={openShare}
          handleClose={() => setOpenShare(false)}
        />
      )}
    </>
  );
};

export default CardPost;
