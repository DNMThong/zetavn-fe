"use client";

import React, { useMemo, useRef, useState } from "react";
import UserMeta from "./UserMeta";
import CardPostFooter from "./CardPostFooter";
import CardPostCmt from "./CardPostCmt";
import CardPostAction from "./CardPostAction";
import { FeedPostDropdown } from "@/components/dropdowns";
import { ShareModal } from "@/components/modals";
import CardPostImage from "./CardPostImage";
import CardPostText from "./CardPostText";
import Post from "@/types/post.type";
import { MediaType } from "@/types/contants.type";
import MoodDisplay from "../card-compose/MoodDisplay";

interface CardPostProps {
  data: Post;
}

const CardPost = ({ data }: CardPostProps) => {
  const [openComment, setOpenComment] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  const images = useMemo<string[]>(() => {
    let images: string[] = [];
    if (data.medias) {
      images = data.medias
        .filter((media) => media.mediaType === MediaType.IMAGE)
        .map((media) => media.mediaPath);
    }

    return images;
  }, [data]);

  return (
    <>
      <div id="feed-post-1" className="card is-post">
        {/* <!-- Main wrap --> */}
        <div className={`content-wrap ${openComment ? "is-hidden" : ""}`}>
          {/* <!-- Post header --> */}
          <div className="card-heading">
            {/* <!-- User meta --> */}
            <UserMeta createdAt={data.createdAt} userInfo={data.user} />
            {/* <!-- Right side dropdown --> */}
            <FeedPostDropdown />
          </div>
          {/* <!-- /Post header --> */}

          {/* <!-- Post body --> */}
          <div className="card-body">
            {/* <!-- Post body text --> */}
            {data.content && <CardPostText content={data.content} />}
            {data?.activity && <MoodDisplay activityMood={data.activity} />}
            {images.length === 0 && (
              <div className="post-actions">
                <CardPostAction
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
                    onClickComment={() => setOpenComment(true)}
                    onClickShare={() => setOpenShare(true)}
                  />
                }
              />
            )}
          </div>
          {/* <!-- /Post body --> */}

          {/* <!-- Post footer --> */}
          <CardPostFooter />
          {/* <!-- /Post footer --> */}
        </div>
        {/* <!-- /Main wrap --> */}

        {/* <!-- Post #1 Comments --> */}
        <CardPostCmt
          open={openComment}
          handleClose={() => setOpenComment(false)}
        />
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
