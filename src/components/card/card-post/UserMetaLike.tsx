import { UserPopover } from "@/components/popover";
import Image from "next/image";
import React, { useState } from "react";

const UserMetaLike = () => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="user-meta-like"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <img className="img" src="https://via.placeholder.com/300x300" alt="" />
      {hover && (
        <UserPopover
          stylesArrow={{
            borderWidth: "16px",
            top: "-26px",
          }}
        />
      )}
    </div>
  );
};

export default UserMetaLike;
