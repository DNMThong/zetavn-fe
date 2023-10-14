"use client";

import React, { useState } from "react";
import UserMeta from "./UserMeta";
import CardPostFooter from "./CardPostFooter";
import CardPostCmt from "./CardPostCmt";
import CardPostAction from "./CardPostAction";
import { FeedPostDropdown } from "@/components/dropdowns";
import { ShareModal } from "@/components/modals";
import CardPostImage from "./CardPostImage";
import CardPostText from "./CardPostText";

const CardPost = () => {
  const [openComment, setOpenComment] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  return (
    <>
      <div id="feed-post-1" className="card is-post">
        {/* <!-- Main wrap --> */}
        <div className={`content-wrap ${openComment ? "is-hidden" : ""}`}>
          {/* <!-- Post header --> */}
          <div className="card-heading">
            {/* <!-- User meta --> */}
            <UserMeta />
            {/* <!-- Right side dropdown --> */}
            <FeedPostDropdown />
          </div>
          {/* <!-- /Post header --> */}

          {/* <!-- Post body --> */}
          <div className="card-body">
            {/* <!-- Post body text --> */}
            <CardPostText />
            {/* <!-- Featured image --> */}
            <CardPostImage
              postAction={
                <CardPostAction
                  onClickComment={() => setOpenComment(true)}
                  onClickShare={() => setOpenShare(true)}
                />
              }
            />
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
        <ShareModal open={openShare} handleClose={() => setOpenShare(false)} />
      )}
    </>
  );
};

export default CardPost;
