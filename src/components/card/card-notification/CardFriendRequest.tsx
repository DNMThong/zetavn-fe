import {
   useAcceptFriendMutation,
   useRejectFriendMutation,
} from "@/redux/features/user/user.service";
import { useAppSelector } from "@/redux/hooks";
import { ImageDefault, NotificationFriendRequest } from "@/types/contants.type";
import { FriendRequestResponse } from "@/types/response.type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiUserMinus, FiUserPlus, FiTag, FiUserX } from "react-icons/fi";

interface CardFriendRequest {
   data: FriendRequestResponse;
}

const CardFriendRequest = ({ data }: CardFriendRequest) => {
   const [acceptFriend] = useAcceptFriendMutation();
   const [rejectFriend] = useRejectFriendMutation();
   const user = useAppSelector((selector) => selector.auth.user);
   const [statusNotification, setStatusNotification] =
      useState<NotificationFriendRequest>(data.status);

   const handleAcceptFriend = async () => {
      const response = await acceptFriend({
         senderId: data.user.id,
         receiverId: user?.id || "",
      }).unwrap();
      if (response.code == 200) {
         setStatusNotification(NotificationFriendRequest.SUCCESS);
      }
   };

   const handleRejectFriend = async () => {
      const response = await rejectFriend({
         senderId: data.user.id,
         receiverId: user?.id || "",
      }).unwrap();
      if (response.code == 200) {
         setStatusNotification(NotificationFriendRequest.REJECT);
      }
   };

   return (
      <div className="media">
         <figure className="media-left">
            <p className="image-container">
               <Image
                  style={{ objectFit: "cover" }}
                  src={data.user.avatar || ImageDefault.AVATAR}
                  alt=""
                  width={300}
                  height={300}
               />
            </p>
         </figure>

         {statusNotification === NotificationFriendRequest.SUCCESS && (
            <>
               <div className="media-content">
                  <span>
                     Bạn đã trở thành bạn bè với{" "}
                     <Link href={`/${data.user.id}`}>{data.user.display}</Link>.
                     Kiểm tra <Link href={`/${data.user.id}`}>hồ sơ</Link>.
                  </span>
               </div>
               <div className="media-right">
                  <div className="added-icon">
                     <FiTag />
                  </div>
               </div>
            </>
         )}
         {statusNotification === NotificationFriendRequest.REJECT && (
            <>
               <div className="media-content">
                  <span>
                     Bạn đã hủy kết bạn với{" "}
                     <Link href={`/${data.user.id}`}>{data.user.display}</Link>
                  </span>
               </div>
               <div className="media-right">
                  <div className="added-icon">
                     <FiUserX />
                  </div>
               </div>
            </>
         )}
         {statusNotification === NotificationFriendRequest.PENDING && (
            <>
               <div className="media-content">
                  <Link href={`/${data.user.id}`}>{data.user.display}</Link>

                  <span>Đã gửi lời mời đến bạn</span>
               </div>
               <div className="media-right">
                  <button
                     className="button icon-button is-solid grey-button raised"
                     onClick={handleAcceptFriend}
                  >
                     <FiUserPlus />
                  </button>
                  <button
                     className="button icon-button is-solid grey-button raised"
                     onClick={handleRejectFriend}
                  >
                     <FiUserMinus />
                  </button>
               </div>
            </>
         )}
      </div>
   );
};

export default CardFriendRequest;
