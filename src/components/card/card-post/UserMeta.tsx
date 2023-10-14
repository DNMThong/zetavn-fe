import { UserPopover } from "@/components/popover";
import Image from "next/image";
import Link from "next/link";
import { relative } from "path";
import React, { useState } from "react";

const UserMeta = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="user-block">
      <div
        className="image is-relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <Image
          className="img"
          src="https://via.placeholder.com/300x300"
          alt="avatar"
          width={42}
          height={42}
        />
        {hover && <UserPopover></UserPopover>}
      </div>
      <div className="user-info">
        <Link className="link" href="#">
          Dan Walker
        </Link>
        <span className="time">July 26 2018, 01:03pm</span>
      </div>
    </div>
  );
};

export default UserMeta;
