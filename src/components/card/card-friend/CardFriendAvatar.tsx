import React from "react";

interface CardFriendAvatarProps {
   avatar?: string;
   popOver?: number;
}

const CardFriendAvatar = ({ avatar, popOver }: CardFriendAvatarProps) => {
   return (
      <div className="avatar-wrap">
         <div className="circle"></div>
         <div className="chat-button">
            <i data-feather="message-circle"></i>
         </div>
         <img
            src={avatar || "https://via.placeholder.com/150x150"}
            data-user-popover={popOver}
            alt=""
         />
      </div>
   );
};

export default CardFriendAvatar;
