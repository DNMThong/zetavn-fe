import {
  useAcceptFriendMutation,
  useAddFriendMutation,
  useRejectFriendMutation,
} from "@/redux/features/user/user.service";
import { useAppSelector } from "@/redux/hooks";
import { ImageDefault, StatusFriend } from "@/types/contants.type";
import { FriendRequestResponse } from "@/types/response.type";
import { SearchUserData, UserShort } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { FaUser, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { FiCheck, FiUser, FiUserMinus, FiUserPlus, FiX } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

interface CardFriendReqCol4Props {
  isFriend?: boolean;
  data: FriendRequestResponse;
  status?: string | undefined;
}

const CardFriendReqCol4 = ({
  isFriend = false,
  data,
}: CardFriendReqCol4Props) => {
  const [statusFriend, setStatusFriend] = useState<StatusFriend>(
    StatusFriend.RECEIVER
  );

  const [addFriend] = useAddFriendMutation();
  const user = useAppSelector((selector) => selector.auth.user);
  const [acceptFriend] = useAcceptFriendMutation();
  const [rejectFriend] = useRejectFriendMutation();

  const handleAddFriend = async () => {
    const response = await addFriend({
      userId: data.user.id,
    }).unwrap();
    if (response.code == 200) {
      setStatusFriend(StatusFriend.SENDER);
    }
  };

  const handleCancelAddFriend = async () => {
    const response = await rejectFriend({
      userId: data.user.id,
    }).unwrap();
    if (response.code) {
      setStatusFriend(StatusFriend.NONE);
    }
  };

  const handleAcceptFriend = async () => {
    const response = await acceptFriend({
      userId: user?.id || "",
    }).unwrap();
    if (response.code == 200) {
      setStatusFriend(StatusFriend.FRIEND);
    }
  };

  const handleRejectFriend = async () => {
    const response = await rejectFriend({
      userId: user?.id || "",
    }).unwrap();
    if (response.code == 200) {
      setStatusFriend(StatusFriend.NONE);
    }
  };

  return (
    <div className="card-flex friend-card">
      <Tooltip id="action-friend-tooltip" place="bottom"></Tooltip>
      <div className={`action-friend`}>
        {statusFriend === StatusFriend.FRIEND && (
          <span
            className="action-friend-icon"
            data-tooltip-id="action-friend-tooltip"
            data-tooltip-content="Bạn bè">
            <FiUser className="icon-active" />
          </span>
        )}
        {statusFriend === StatusFriend.NONE && (
          <span
            className="action-friend-icon"
            data-tooltip-id="action-friend-tooltip"
            data-tooltip-content="Gửi lời mời kết bạn"
            onClick={handleAddFriend}>
            <FiUserPlus className="icon-active" />
          </span>
        )}
        {statusFriend === StatusFriend.SENDER && (
          <span
            className="action-friend-icon"
            data-tooltip-id="action-friend-tooltip"
            data-tooltip-content="Hủy lời mời kết bạn"
            onClick={handleCancelAddFriend}>
            <FiUserMinus />
          </span>
        )}
        {statusFriend === StatusFriend.RECEIVER && (
          <>
            <span
              className="action-friend-icon"
              data-tooltip-id="action-friend-tooltip"
              data-tooltip-content="Chấp nhận kết bạn"
              onClick={handleAcceptFriend}>
              <FiCheck className="icon-success" />
            </span>
            <span
              className="action-friend-icon"
              data-tooltip-id="action-friend-tooltip"
              data-tooltip-content="Hủy kết bạn"
              onClick={handleRejectFriend}>
              <FiX className="icon-error" />
            </span>
          </>
        )}
      </div>
      <div className="img-container">
        <Image
          className="avatar"
          src={data.user.avatar || ImageDefault.AVATAR}
          alt=""
          width={420}
          height={420}
        />
      </div>
      <div className="friend-info">
        <Link href={`/${data.user.username}`}>
          <h3>{data.user.display}</h3>
        </Link>
        <p></p>
      </div>
      {/* <div className="friend-stats">
            <div className="stat-block">
               <label>Bạn bè</label>
               <div className="stat-number">{data.totalFriends}</div>
            </div>
            <div className="stat-block">
               <label>Bài viết</label>
               <div className="stat-number">{data.totalPosts}</div>
            </div>
            <div className="stat-block">
               <label>Lượt thích</label>
               <div className="stat-number">{data.countLikesOfPosts}</div>
            </div>
         </div> */}
    </div>
  );
};

export default CardFriendReqCol4;
