import { UserPopover } from "@/components/popover";
import { ImageDefault, PostAccessModifier } from "@/types/contants.type";
import User, { UserShort } from "@/types/user.type";
import { calculateTime } from "@/utils/calculate-time.util";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface UserMetaProps {
  userInfo: UserShort;
  createdAt: string;
  accessModifier: PostAccessModifier;
}

const UserMeta = ({ userInfo, createdAt, accessModifier }: UserMetaProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="user-block">
      <div
        className="image is-relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <Image
          className="img"
          src={userInfo.avatar || ImageDefault.AVATAR}
          alt="avatar"
          width={420}
          height={420}
        />
        {hover && <UserPopover userInfo={userInfo}></UserPopover>}
      </div>
      <div className="user-info">
        <Link className="link" href="#">
          {userInfo.display}
        </Link>

        <span className="time">
          {accessModifier === PostAccessModifier.PUBLIC && (
            <i className="mdi mdi-earth"></i>
          )}
          {accessModifier === PostAccessModifier.FRIENDS && (
            <i className="mdi mdi-account"></i>
          )}
          {accessModifier === PostAccessModifier.PRIVATE && (
            <i className="mdi mdi-eye"></i>
          )}
          {createdAt}
        </span>
      </div>
    </div>
  );
};

export default UserMeta;
