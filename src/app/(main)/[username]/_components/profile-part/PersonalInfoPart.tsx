import {
   useLazyGetFriendRequestQuery,
   useLazyGetFriendsListByUserIdQuery,
} from "@/redux/features/user/user.service";
import { useAppSelector } from "@/redux/hooks";
import Post from "@/types/post.type";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import {
   FiDelete,
   FiEdit3,
   FiEye,
   FiImage,
   FiPlus,
   FiSearch,
   FiSettings,
   FiSmile,
   FiUploadCloud,
   FiUser,
   FiUsers,
} from "react-icons/fi";
import {
   FriendRequestResponse,
   GetFriendRequestResponse,
} from "@/types/response.type";
import { CardFriend, CardFriendRequest, CardPhoto } from "../card";
import { UserShort } from "@/types/user.type";
import { ListFriend, ListPhoto } from "../section";
import { ProfileAboutContent } from "@/types/contants.type";

interface PersonalInfoPartProps {
   isActive: boolean;
}

const PersonalInfoPart = ({ isActive }: PersonalInfoPartProps) => {
   return (
      <div
         id="personal-content"
         className={`content-section ${isActive ? "is-active" : ""}`}
      >
         {/* <!-- Friends about card --> */}
         <ListFriend></ListFriend>
         {/* <!-- Photos about card --> */}
         <ListPhoto></ListPhoto>
         {/* <!-- Videos about card --> */}
         <div className="about-card">
            {/* <!-- Header --> */}
            <div className="header">
               <div className="icon-title">
                  <i className="mdi mdi-video"></i>
                  <h3>Videos</h3>
               </div>
               <div className="actions">
                  <div className="button-wrapper">
                     <a className="button">Tất cả Videos</a>
                  </div>
                  <WidgetDropdown wclassName="is-accent is-right">
                     <DropdownItem title="Video" subTitle="Quản lý video.">
                        <FiEdit3></FiEdit3>
                     </DropdownItem>
                     <DropdownItem
                        title="Tải video"
                        subTitle="Tải video mới lên."
                     >
                        <FiPlus></FiPlus>
                     </DropdownItem>
                     <DropdownItem
                        title="Tùy chỉnh video"
                        subTitle="Mở tùy chỉnh video."
                     >
                        <FiSettings></FiSettings>
                     </DropdownItem>
                  </WidgetDropdown>
               </div>
            </div>
            <div className="body has-flex-list">
               {/* <!-- Videos --> */}
               <div className="video-list">
                  {/* <!-- Video item --> */}
                  <div className="video-wrapper">
                     <div className="video-overlay"></div>
                     <div className="video-length">02:32</div>
                     <div className="small-like">
                        <div className="inner">
                           <div className="like-overlay"></div>
                           <i data-feather="heart"></i>
                        </div>
                     </div>
                     <img
                        src="https://via.placeholder.com/800x600"
                        data-demo-src="assets/img/demo/profile/about/videos/1.jpg"
                        alt=""
                     />
                     <div className="video-button" data-video-id="LTrzSSf0YlA">
                        <img src="assets/img/icons/video/play.svg" alt="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PersonalInfoPart;
