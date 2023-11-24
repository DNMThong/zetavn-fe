import React, { useEffect, useState } from "react";
import { UserImage } from "../user-image";
import {
   FiBell,
   FiBellOff,
   FiCamera,
   FiMail,
   FiMessageCircle,
   FiMinus,
   FiPlus,
   FiUserCheck,
   FiUserMinus,
   FiUserPlus,
   FiUserX,
   FiUsers,
} from "react-icons/fi";
import { AvatarButton } from ".";
import { useAppSelector } from "@/redux/hooks";
import { Tooltip } from "@/components/tooltip";
import { ChangeCoverImageModal } from "@/components/modals";
import { useParams } from "next/navigation";
import {
   useAcceptFriendMutation,
   useAddFriendMutation,
   useFollowMutation,
   useLazyGetFollowStatusQuery,
   useLazyGetFriendshipStatusQuery,
   useRejectFriendMutation,
   useUnFollowMutation,
} from "@/redux/features/user/user.service";
import { FollowPriority, FriendshipStatus } from "@/types/contants.type";
import { toast } from "react-toastify";
import { UserProfile } from "@/types/user.type";

interface UserAvatarProps {
   avatarPath?: string;
   targetId?: string;
}

const UserAvatar = ({ avatarPath, targetId }: UserAvatarProps) => {
   const source: UserProfile | null = useAppSelector(
      (selector) => selector.auth.user
   );
   const { username } = useParams();
   const [sendFriendRequest] = useAddFriendMutation();
   const [acceptFriendRequest] = useAcceptFriendMutation();
   const [rejectFriendRequest] = useRejectFriendMutation();
   const [getFriendshipStatus] = useLazyGetFriendshipStatusQuery();
   const [getFollowStatus] = useLazyGetFollowStatusQuery();
   const [unFollow] = useUnFollowMutation();
   const [follow] = useFollowMutation();
   const isSelfProfile =
      source && (source.id === username || source.username === username);
   const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>();
   const [followStatus, setFollowStatus] = useState(FollowPriority.NONE);
   const [avatarButtonActive, setAvatarButtonActive] = useState(false);
   const [editCoverModal, setEditCoverModal] = useState(false);

   const handleAvatarButtonClick = () => {
      setAvatarButtonActive(!avatarButtonActive);
   };
   const handleCloseEditCoverModal = () => {
      setEditCoverModal(false);
   };

   const handleSendFriendRequest = async (e: any) => {
      const { code, data } = await sendFriendRequest({
         senderId: source?.id as string,
         receiverId: username as string,
      }).unwrap();
      if (code === 200) {
         setFriendshipStatus(data?.status);
      }
   };

   const handleAcceptFriendRequest = async () => {
      const { code, data } = await acceptFriendRequest({
         senderId: source?.id as string,
         receiverId: username as string,
      }).unwrap();
      if (code === 200) {
         toast.success("Chấp nhận lời mời kết bạn thành công!");
         setFriendshipStatus(FriendshipStatus.FRIEND);
      }
   };
   const handleRejectFriendRequest = async () => {
      const response = await rejectFriendRequest({
         senderId: source?.id as string,
         receiverId: username as string,
      }).unwrap();
      const { code, data } = response;
      if (code === 200) {
         setFriendshipStatus(FriendshipStatus.NONE);
      } else {
         toast.error("Có lỗi xảy ra!");
      }
   };

   const handleRetrieveFriendRequest = async () => {
      const response = await rejectFriendRequest({
         senderId: source?.id as string,
         receiverId: username as string,
      }).unwrap();
      const { code, data } = response;
      if (code === 200) {
         setFriendshipStatus(FriendshipStatus.NONE);
      } else {
         toast.error("Có lỗi xảy ra!");
      }
   };

   const handleFollow = async () => {
      if (followStatus === FollowPriority.NONE) {
         const response = await follow({
            followerId: source?.id as string,
            followingId: username as string,
            priority: FollowPriority.MEDIUM,
         }).unwrap();
         const { code, data }: any = response;
         if (code === 200) {
            setFollowStatus(data?.priority);
         }
      } else {
         const response = await unFollow({
            sourceId: source?.id as string,
            targetId: username as string,
         }).unwrap();
         const { code, data }: any = response;
         if (code === 204) {
            setFollowStatus(data?.priority);
         }
      }
   };

   useEffect(() => {
      async function fetchFriendshipStatus() {
         const { code, data } = await getFriendshipStatus({
            sourceId: source?.id as string,
            targetId: username as string,
         }).unwrap();
         if (code === 200) {
            setFriendshipStatus(data?.status);
         }
      }
      if (!isSelfProfile) {
         fetchFriendshipStatus();
      }
   }, [getFriendshipStatus, friendshipStatus, source, username, isSelfProfile]);

   useEffect(() => {
      async function fetchFollowStatus() {
         const { code, data }: any = await getFollowStatus({
            sourceId: source?.id as string,
            targetId: username as string,
         }).unwrap();
         if (code === 200) {
            setFollowStatus(data?.priority);
         }
      }
      if (!isSelfProfile) {
         fetchFollowStatus();
      }
   }, [getFollowStatus, followStatus, source, username, isSelfProfile]);

   return (
      <div className="avatar">
         <UserImage
            id="user-avatar"
            imageClass="avatar-image"
            path={avatarPath || ""}
         />
         <div
            className={`avatar-button ${avatarButtonActive ? "is-active" : ""}`}
            onClick={handleAvatarButtonClick}
         >
            <FiPlus />
         </div>

         {!isSelfProfile ? (
            <>
               <AvatarButton
                  id="follow-pop"
                  className="pop-shift is-far-left"
                  dataPlacement="bottom"
                  tooltipId="follow-tooltip"
                  tooltipContent={
                     followStatus === FollowPriority.NONE
                        ? "Theo dõi"
                        : "Hủy theo dõi"
                  }
                  show={avatarButtonActive}
                  onClick={handleFollow}
               >
                  <span
                     className="inner"
                     style={{
                        transform: "translateY(50%)",
                        top: "-41%",
                     }}
                  >
                     <span
                        className={`${
                           followStatus !== FollowPriority.NONE
                              ? "inactive-icon"
                              : "active-icon"
                        }`}
                     >
                        <FiBellOff />
                     </span>
                     <span
                        className={`${
                           followStatus === FollowPriority.NONE
                              ? "inactive-icon"
                              : "active-icon"
                        }`}
                     >
                        <FiBell />
                     </span>
                  </span>
               </AvatarButton>
               {/* Friend None */}
               {friendshipStatus === FriendshipStatus.NONE && (
                  <AvatarButton
                     id="invite-pop"
                     className="pop-shift is-center"
                     dataPlacement="top"
                     tooltipId="send-friend-req-tooltip"
                     tooltipContent={"Gửi lời mời kết bạn"}
                     show={avatarButtonActive}
                     onClick={handleSendFriendRequest}
                  >
                     <a href="#" className="inner">
                        <span className="inactive-icon">
                           <FiUserPlus />
                        </span>
                     </a>
                  </AvatarButton>
               )}
               {/* Friend Sender */}
               {friendshipStatus === FriendshipStatus.SENDER && (
                  <AvatarButton
                     id="invite-pop"
                     className="pop-shift is-center"
                     dataPlacement="top"
                     tooltipId="cancel-friend-req-tooltip"
                     tooltipContent={"Hủy lời mời kết bạn"}
                     show={avatarButtonActive}
                     onClick={handleRetrieveFriendRequest}
                  >
                     <a
                        className="inner"
                        style={{
                           transform: "translateY(50%)",
                           top: "-41%",
                        }}
                     >
                        <span className="inactive-icon">
                           <FiUserX />
                        </span>
                     </a>
                  </AvatarButton>
               )}
               {/* Friend Receiver */}
               {friendshipStatus === FriendshipStatus.RECEIVER && (
                  <>
                     <AvatarButton
                        id="invite-pop"
                        className="pop-shift is-center"
                        dataPlacement="top"
                        tooltipId="accept-friend-req-tooltip"
                        tooltipContent={"Chấp nhận lời mời kết bạn"}
                        show={avatarButtonActive}
                        onClick={handleAcceptFriendRequest}
                     >
                        <a
                           href="#"
                           className="inner"
                           style={{
                              transform: "translateY(50%)",
                              top: "-41%",
                           }}
                        >
                           <span className="inactive-icon">
                              <FiUserCheck />
                           </span>
                        </a>
                     </AvatarButton>
                     <AvatarButton
                        id="invite-pop"
                        className="pop-shift is-left"
                        dataPlacement="top"
                        tooltipId="reject-friend-req-tooltip"
                        tooltipContent={"Từ chối lời mời kết bạn"}
                        show={avatarButtonActive}
                        onClick={handleRejectFriendRequest}
                     >
                        <a
                           href="#"
                           className="inner"
                           style={{
                              transform: "translateY(50%)",
                              top: "-41%",
                           }}
                        >
                           <span className="inactive-icon">
                              <FiUserX />
                           </span>
                        </a>
                     </AvatarButton>
                  </>
               )}
               {/* Friend Friend */}
               {friendshipStatus === FriendshipStatus.FRIEND && (
                  <AvatarButton
                     id="invite-pop"
                     className="pop-shift is-center"
                     dataPlacement="top"
                     tooltipId="delete-friend-tooltip"
                     tooltipContent={"Hủy kết bạn"}
                     show={avatarButtonActive}
                  >
                     <a
                        href="#"
                        className="inner"
                        style={{
                           transform: "translateY(50%)",
                           top: "-41%",
                        }}
                     >
                        <span
                           className={`${
                              friendshipStatus === FriendshipStatus.FRIEND
                                 ? "inactive-icon"
                                 : "active-icon"
                           }`}
                        >
                           <FiUserMinus />
                        </span>
                     </a>
                  </AvatarButton>
               )}
               <AvatarButton
                  id="chat-pop"
                  className="is-right"
                  dataPlacement="top"
                  tooltipId="send-message-tooltip"
                  tooltipContent={"Nhắn tin"}
                  show={avatarButtonActive}
               >
                  <a className="inner">
                     <FiMessageCircle />
                  </a>
               </AvatarButton>
               <AvatarButton
                  className={`${
                     friendshipStatus === FriendshipStatus.RECEIVER
                        ? "is-far-right"
                        : "is-left"
                  }`}
                  dataPlacement="top"
                  tooltipId="send-mail-tooltip"
                  tooltipContent={"Gửi mail"}
                  show={avatarButtonActive}
               >
                  <a href="messages-inbox.html" className="inner">
                     <FiMail />
                  </a>
               </AvatarButton>
            </>
         ) : (
            <>
               <AvatarButton
                  id="change-profile-pic"
                  className={`modal-trigger ${
                     isSelfProfile ? "is-center" : "is-far-left"
                  }`}
                  tooltipId="change-profile-pic-tooltip"
                  tooltipContent="Thay đổi avatar"
                  dataModal="change-profile-pic-modal"
                  dataPlacement={isSelfProfile ? "top" : "right"}
                  show={avatarButtonActive}
                  onClick={() => setEditCoverModal(true)}
               >
                  <a className="inner">
                     <FiCamera />
                  </a>
               </AvatarButton>
            </>
         )}

         {/* Modal Change Avatar */}
         {editCoverModal && (
            <ChangeCoverImageModal
               show={editCoverModal}
               handleCloseModal={handleCloseEditCoverModal}
               type="avatar"
               setShow={setEditCoverModal}
            />
         )}

         {/* Need fix tooltip */}
      </div>
   );
};

export default UserAvatar;
