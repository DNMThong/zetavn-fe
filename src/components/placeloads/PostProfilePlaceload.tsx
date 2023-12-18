import React from "react";
import PostPlaceload from "./PostPlaceload";

const PostProfilePlaceload = () => {
  return (
    <div className="profile-post">
      <div className="time is-hidden-mobile">
        <div className="img-container">
          <div
            className="img loads"
            style={{ height: "44px", width: "44px", borderRadius: "50%" }}></div>
        </div>
      </div>
      <PostPlaceload />
    </div>
  );
};

export default PostProfilePlaceload;
