import React, { useState } from "react";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import { userInfo } from "os";
import { UserShort } from "@/types/user.type";
import { ImageDefault, StatusFriend } from "@/types/contants.type";
import {
  useAddFriendMutation,
  useRejectFriendMutation,
  useUnfriendMutation,
} from "@/redux/features/user/user.service";

interface CardFriendSuggestion {
  userInfo: UserShort;
}

const CardFriendSuggestion = ({ userInfo }: CardFriendSuggestion) => {
  const [statusFriend, setStatusFriend] = useState<StatusFriend>(
    StatusFriend.NONE
  );
  const [addFriend] = useAddFriendMutation();
  const [unfriend] = useUnfriendMutation();

  const handleAddFriend = async () => {
    const response = await addFriend({
      userId: userInfo.id,
    }).unwrap();
    if (response.code == 200) {
      setStatusFriend(StatusFriend.SENDER);
    }
  };

  const handleCancelAddFriend = async () => {
    const response = await unfriend({
      userId: userInfo.id,
    }).unwrap();
    if (response.code == 200) {
      setStatusFriend(StatusFriend.NONE);
    }
  };

  return (
    <div className="add-friend-block transition-block">
      <img src={userInfo.avatar || ImageDefault.AVATAR} alt="" />
      <div className="page-meta">
        <span>{userInfo.display}</span>
        {/* <span>Melbourne</span> */}
      </div>
      <div className="add-friend add-transition">
        {statusFriend === StatusFriend.NONE && (
          <span onClick={handleAddFriend}>
            <FiUserPlus />
          </span>
        )}
        {statusFriend === StatusFriend.SENDER && (
          <span onClick={handleCancelAddFriend}>
            <FiUserMinus />
          </span>
        )}
      </div>
    </div>
  );
};

export default CardFriendSuggestion;
