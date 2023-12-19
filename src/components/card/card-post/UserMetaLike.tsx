import { UserPopover } from "@/components/popover";
import { ImageDefault } from "@/types/contants.type";
import { UserShort } from "@/types/user.type";
import Image from "next/image";
import React, { useState } from "react";

const UserMetaLike = ({ data }: { data: UserShort }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="user-meta-like"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Image
        className="img"
        src={data.avatar || ImageDefault.AVATAR}
        alt=""
        width={320}
        height={320}
      />
      {hover && (
        <UserPopover
          userInfo={data}
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
