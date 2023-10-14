import User from "@/types/user.type";
import React from "react";

interface IUserSuggestionItem {
  suggestion: User;
  search: string;
  highlightedDisplay: React.ReactNode;
  index: number;
  focused: boolean;
}

const UserSuggestionItem = ({
  suggestion,
  focused,
  highlightedDisplay,
}: IUserSuggestionItem) => {
  return (
    <div className="template-wrapper">
      <div className="avatar-wrapper">
        <img className="autocpl-avatar" src={suggestion?.avartar} />
      </div>
      <div className="entry-text">
        {highlightedDisplay}
        {/* <br />
          <span></span> */}
      </div>
    </div>
  );
};

export default UserSuggestionItem;
