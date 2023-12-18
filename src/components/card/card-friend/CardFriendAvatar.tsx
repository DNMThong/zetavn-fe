import {
  setOpenChat,
  setUserContactSelected,
} from "@/redux/features/chat/chat.slice";
import { useAppDispatch } from "@/redux/hooks";
import { ImageDefault } from "@/types/contants.type";
import { UserProfile } from "@/types/user.type";
import React from "react";
import { FiMessageCircle } from "react-icons/fi";

interface CardFriendAvatarProps {
  userInfo: UserProfile;
  popOver?: number;
}

const CardFriendAvatar = ({ userInfo, popOver }: CardFriendAvatarProps) => {
  const dispatch = useAppDispatch();
  const handleChatUser = (e: any) => {
    e.stopPropagation();

    dispatch(setOpenChat(true));
    dispatch(
      setUserContactSelected({
        ...userInfo,
        isOnline: false,
      })
    );
  };

  return (
    <div className="avatar-wrap">
      <div className="circle"></div>
      <div className="chat-button">
        <i data-feather="message-circle"></i>
        <FiMessageCircle onClick={handleChatUser} />
      </div>
      <img
        src={userInfo.avatar || ImageDefault.AVATAR}
        data-user-popover={popOver}
        alt=""
      />
    </div>
  );
};

export default CardFriendAvatar;
