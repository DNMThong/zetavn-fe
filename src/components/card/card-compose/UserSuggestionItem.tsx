import User, { UserShort } from "@/types/user.type";
import Image from "next/image";
import React from "react";

interface IUserSuggestionItem {
  suggestion: UserShort;
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
  console.log(suggestion);
  return (
    <div className="template-wrapper">
      <div className="avatar-wrapper">
        <Image
          className="autocpl-avatar"
          src={suggestion?.avatar || ""}
          alt=""
          width={300}
          height={300}
        />
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
