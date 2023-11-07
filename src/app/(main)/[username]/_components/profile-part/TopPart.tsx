"use client";
import React, { useEffect, useState } from "react";
import { UserImage } from "../user-image";
import { UserAvatar } from "../user-avatar";
import { ChangeCoverImageModal, Overlay } from "@/components/modals";
import { TimelineMobileDropdown } from "@/components/dropdowns";
import { ProfileSubHeader } from "../profile-subheader";
import { ProfileMenu } from "../profile-menu";
import User, { UserProfile } from "@/types/user.type";
import { useAppSelector } from "@/redux/hooks";
import { useLazyGetUserQuery } from "@/redux/features/user/user.service";
import { useParams, usePathname, useRouter } from "next/navigation";

interface TopPartProps {
   userId: string;
}

const TopPart = () => {
   const user = useAppSelector((selector) => selector.auth.user);
   const router = useRouter();
   const pathname = usePathname();
   const { username } = useParams();
   const isSelfProfile =
      (user && user?.id === username) || user?.username === username;
   const [userProfile, setUserProfile] = useState<UserProfile>();
   const [getUserQuery] = useLazyGetUserQuery();

   useEffect(() => {
      const fetchUserProfile = async () => {
         const response = await getUserQuery(username as string).unwrap();
         if (response?.code === 200) {
            const { data } = response;
            setUserProfile(data);
         } else {
            console.log("ERROR Fetching");
            router.push(pathname + "/404");
         }
      };
      if (isSelfProfile) {
         if (user) {
            setUserProfile(user);
         }
      } else {
         fetchUserProfile();
      }
   }, [
      username,
      isSelfProfile,
      userProfile,
      getUserQuery,
      user,
      router,
      pathname,
   ]);

   const [editCoverModal, setEditCoverModal] = useState(false);

   const handleCloseEditCoverModal = () => {
      setEditCoverModal(false);
   };
   return (
      <>
         <div className="columns is-multiline no-margin">
            {/* <!-- Left side column --> */}
            <div className="column is-paddingless">
               {/* <!-- Timeline Header --> */}
               {/* <!-- html/partials/pages/profile/timeline/timeline-header.html --> */}
               <div className="cover-bg">
                  <UserImage
                     imageClass="cover-image"
                     path={
                        userProfile?.poster ||
                        "https://via.placeholder.com/1600x460"
                     }
                  />
                  <UserAvatar
                     avatarPath={
                        userProfile?.avatar ||
                        "https://via.placeholder.com/300x300"
                     }
                  />
                  <Overlay overlayClassName="cover-overlay" />

                  {isSelfProfile && editCoverModal && (
                     <ChangeCoverImageModal
                        show={editCoverModal}
                        handleCloseModal={handleCloseEditCoverModal}
                     />
                  )}
                  {isSelfProfile && (
                     <div
                        className="cover-edit modal-trigger"
                        data-modal="change-cover-modal"
                        onClick={() => setEditCoverModal(true)}
                     >
                        <i className="mdi mdi-camera"></i>
                        <span>Thay đổi ảnh bìa</span>
                     </div>
                  )}
                  {/* <!--/html/partials/pages/profile/timeline/dropdowns/timeline-mobile-dropdown.html--> */}
                  <TimelineMobileDropdown></TimelineMobileDropdown>
               </div>

               <ProfileMenu></ProfileMenu>

               <ProfileSubHeader
                  display={userProfile?.display as string}
                  totalFriends={
                     userProfile?.information?.totalFriends as number
                  }
               ></ProfileSubHeader>
            </div>
         </div>
         <div id="edit-cover-modal"></div>
         <div id="upload-crop-cover-modal-container"></div>
      </>
   );
};

export default TopPart;
