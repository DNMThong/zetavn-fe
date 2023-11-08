import Image from "next/image";
import Link from "next/link";
import React from "react";

const FakeNavbar = () => {
  return (
    <div className="fake-nav">
      <Link href="/login" className="logo">
        <Image
          className="light-image"
          src="/img/vector/logo/friendkit-bold.svg"
          width="112"
          height="28"
          alt=""
        />
        <Image
          className="dark-image"
          src="/img/vector/logo/friendkit-white.svg"
          width="112"
          height="28"
          alt=""
        />
      </Link>
    </div>
  );
};

export default FakeNavbar;
