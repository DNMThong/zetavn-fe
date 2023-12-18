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
import { ImageDefault } from "@/types/contants.type";

interface TopPartProps {
  isSelfProfile: boolean;
  userProfile: UserProfile;
}

const TopPart = ({ isSelfProfile, userProfile }: TopPartProps) => {
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
              path={userProfile?.poster || ImageDefault.POSTER}
            />
            <UserAvatar
              avatarPath={userProfile?.avatar || ImageDefault.AVATAR}
              userProfile={userProfile}
            />
            <Overlay overlayClassName="cover-overlay" />

            {isSelfProfile && editCoverModal && (
              <ChangeCoverImageModal
                show={editCoverModal}
                handleCloseModal={handleCloseEditCoverModal}
                type="poster"
                setShow={setEditCoverModal}
              />
            )}
            {isSelfProfile && (
              <div
                className="cover-edit modal-trigger"
                data-modal="change-cover-modal"
                onClick={() => setEditCoverModal(true)}>
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
            }></ProfileSubHeader>
        </div>
      </div>
      <div id="edit-cover-modal"></div>
      <div id="upload-crop-cover-modal-container"></div>
    </>
  );
};

export default TopPart;
