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
   useAcceptFriendRequestMutation,
   useFollowMutation,
   useLazyGetFollowStatusQuery,
   useLazyGetFriendshipStatusQuery,
   useRejectFriendRequestMutation,
   useSendFriendRequestMutation,
   useUnFollowMutation,
} from "@/redux/features/user/user.service";
import { FollowPriority, FriendshipStatus } from "@/types/contants.type";
import { toast } from "react-toastify";

interface UserAvatarProps {
   avatarPath?: string;
   targetId?: string;
}

const UserAvatar = ({ avatarPath, targetId }: UserAvatarProps) => {
   const source = useAppSelector((selector) => selector.auth.user);
   const { username } = useParams();
   const [sendFriendRequest] = useSendFriendRequestMutation();
   const [acceptFriendRequest] = useAcceptFriendRequestMutation();
   const [rejectFriendRequest] = useRejectFriendRequestMutation();
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
         sourceId: source?.id as string,
         targetId: username as string,
      }).unwrap();
      if (code === 200) {
         setFriendshipStatus(data?.status);
      }
   };

   const handleAcceptFriendRequest = async () => {
      const { code, data } = await acceptFriendRequest({
         sourceId: source?.id as string,
         targetId: username as string,
      }).unwrap();
      if (code === 200) {
         toast.success("Chấp nhận lời mời kết bạn thành công!");
         setFriendshipStatus(FriendshipStatus.FRIEND);
      }
   };
   const handleRejectFriendRequest = async () => {
      const response = await rejectFriendRequest({
         sourceId: source?.id as string,
         targetId: username as string,
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
         sourceId: source?.id as string,
         targetId: username as string,
      }).unwrap();
      console.log(
         "🚀 ~ file: UserAvatar.tsx:100 ~ handleRetrieveFriendRequest ~ response:",
         response
      );
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
         console.log(
            "🚀 ~ file: UserAvatar.tsx:130 ~ handleFollow ~ response:",
            response
         );
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
      fetchFriendshipStatus();
   }, [getFriendshipStatus, friendshipStatus, source, username]);

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
      fetchFollowStatus();
   }, [getFollowStatus, followStatus, source, username]);

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
                  dataPlacement="top"
                  dataTitle="Subscription"
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
                     dataTitle="Relationship"
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
                     dataTitle="Relationship"
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
                        dataTitle="Relationship"
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
                        dataTitle="Relationship"
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
                     dataTitle="Relationship"
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
                  dataTitle="Chat"
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
                  dataPlacement="right"
                  dataTitle="Send message"
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
                  className={`"modal-trigger" ${
                     isSelfProfile ? "is-center" : "is-far-left"
                  }`}
                  dataModal="change-profile-pic-modal"
                  dataPlacement={isSelfProfile ? "top" : "right"}
                  dataTitle="Change profile picture"
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
            />
         )}

         {/* Need fix tooltip */}
         {/* <Tooltip
            place="top"
            variant="info"
            id="change-profile-pic"
            content="Change profile picture"
            className="ggtooltip right in fade"
         ></Tooltip> */}
      </div>
   );
};

export default UserAvatar;
