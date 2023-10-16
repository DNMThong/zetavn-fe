import { UserPopover } from "@/components/popover";
import User, { UserShort } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface UserMetaProps {
  userInfo: UserShort;
  createdAt: string;
}

const UserMeta = ({ userInfo, createdAt }: UserMetaProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="user-block">
      <div
        className="image is-relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <Image
          className="img"
          src={userInfo.avatar || "https://via.placeholder.com/300x300"}
          alt="avatar"
          width={42}
          height={42}
        />
        {hover && <UserPopover userInfo={userInfo}></UserPopover>}
      </div>
      <div className="user-info">
        <Link className="link" href="#">
          {userInfo.display}
        </Link>
        <span className="time">{createdAt}</span>
      </div>
    </div>
  );
};

export default UserMeta;
