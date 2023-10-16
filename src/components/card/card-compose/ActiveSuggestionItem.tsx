import { ActivityStatus, ActivityStatusDetail } from "@/types/post.type";
import React from "react";

const ActiveSuggestionItem = ({
  name,
  desc,
  pic,
}: ActivityStatus | ActivityStatusDetail) => {
  return (
    <div className="eac-item">
      <div className="template-wrapper">
        <div className="avatar-wrapper">
          <img className="autocpl-avatar" src={pic} />
        </div>
        <div className="entry-text">
          {name}
          <br />
          <span>{desc}</span>
        </div>
        <div className="next-icon">
          <i className="mdi" mdi-chevron-right=""></i>
        </div>
      </div>
    </div>
  );
};

export default ActiveSuggestionItem;
