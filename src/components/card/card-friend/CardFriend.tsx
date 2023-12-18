import React from "react";
import CardFriendAvatar from "./CardFriendAvatar";
import { useRouter } from "next/navigation";

interface CardFriendProps {
  user: any;
  popOver: number;
}

const CardFriend = ({ user, popOver }: CardFriendProps) => {
  const router = useRouter();
  const handleClickUser = (e: any) => {
    router.push(`/${user.username}`);
  };
  return (
    <a onClick={handleClickUser} className="friend-item has-text-centered">
      <CardFriendAvatar userInfo={user} popOver={popOver}></CardFriendAvatar>
      <h3>{user?.display}</h3>
      {/* <p>From {user?.from}</p> */}
    </a>
  );
};

export default CardFriend;
