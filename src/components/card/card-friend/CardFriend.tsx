import React from "react";
import CardFriendAvatar from "./CardFriendAvatar";
import { UserProfile } from "@/types/user.type";

interface CardFriendProps {
   user: any;
   popOver: number;
}

const CardFriend = ({ user, popOver }: CardFriendProps) => {
   return (
      <a className="friend-item has-text-centered">
         <CardFriendAvatar
            avatar={user?.avatar || ""}
            popOver={popOver}
         ></CardFriendAvatar>
         <h3>{user?.display}</h3>
         <p>From {user?.from}</p>
      </a>
   );
};

export default CardFriend;
