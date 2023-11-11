import {
   useLazyGetFriendsListByUserIdQuery,
   useLazyGetUserQuery,
} from "@/redux/features/user/user.service";
import { useAppSelector } from "@/redux/hooks";
import Post from "@/types/post.type";
import { UserProfile, UserShort } from "@/types/user.type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserImage } from "../user-image";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import Image from "next/image";
import {
   FiDelete,
   FiEdit3,
   FiEye,
   FiHeart,
   FiImage,
   FiMessageSquare,
   FiPlus,
   FiSearch,
   FiSettings,
   FiSmile,
   FiUploadCloud,
   FiUser,
   FiUsers,
} from "react-icons/fi";

interface PersonalInfoPartProps {
   isActive: boolean;
}

const PersonalInfoPart = ({ isActive }: PersonalInfoPartProps) => {
   const { username } = useParams();
   const [getFriendsList] = useLazyGetFriendsListByUserIdQuery();
   const [getPosts] = useLazyGetPostMediaByUserIdQuery();
   const [friendsList, setFriendsList] = useState<UserShort[]>();
   const [postMediaList, setPostMediaList] = useState<Post[]>();
   useEffect(() => {
      async function fetchFriendsList() {
         const { data, code }: any = await getFriendsList({
            userId: username as string,
            pageSize: 6,
         }).unwrap();
         if (code === 200) {
            setFriendsList(data?.data);
         }
      }

      async function fetchPosts() {
         const { data, code }: any = await getPosts(
            username as string
         ).unwrap();
         if (code === 200) {
            setPostMediaList(data?.data);
         }
      }

      // Fetch Video when have api
      fetchFriendsList();
      fetchPosts();
   }, [getFriendsList, getPosts, username]);
   return (
      <div
         id="personal-content"
         className={`content-section ${isActive ? "is-active" : ""}`}
      >
         {/* <!-- Friends about card --> */}
         <div className="about-card">
            {/* <!-- Header --> */}
            <div className="header">
               <div className="icon-title">
                  <i className="mdi mdi-account-group"></i>
                  <h3>Bạn bè</h3>
               </div>
               <div className="actions">
                  <div className="button-wrapper">
                     <a className="button">Lời mời kết bạn</a>
                     <div className="indicator">
                        <span>8</span>
                     </div>
                  </div>
                  <WidgetDropdown wclassName="is-accent is-right">
                     <DropdownItem
                        title="Tùy chỉnh"
                        subTitle="Tùy chỉnh danh sách bạn bè."
                     >
                        <FiSmile></FiSmile>
                     </DropdownItem>
                     <DropdownItem title="Tìm bạn" subTitle="Tìm bạn.">
                        <FiSearch></FiSearch>
                     </DropdownItem>
                     <hr className="dropdown-divider" />
                     <DropdownItem
                        title="Danh sách bạn bè"
                        subTitle="Xem tất cả bạn bè."
                        href={`/${username}/friends`}
                     >
                        <FiEye></FiEye>
                     </DropdownItem>
                  </WidgetDropdown>
               </div>
            </div>
            <div className="body">
               <div className="columns friends-columns is-multiline">
                  {/* <!-- Friend --> */}
                  {friendsList &&
                     friendsList.length > 0 &&
                     friendsList.map(({ user }: any, index) => (
                        <FriendItem
                           key={index}
                           user={user as UserShort}
                        ></FriendItem>
                     ))}
               </div>
            </div>
         </div>

         {/* <!-- Photos about card --> */}
         <div className="about-card">
            {/* <!-- Header --> */}
            <div className="header">
               <div className="icon-title">
                  <i className="mdi mdi-camera"></i>
                  <h3>Ảnh</h3>
               </div>
               <div className="actions">
                  <div className="button-wrapper">
                     <a className="button">Bộ sưu tập</a>
                  </div>
                  {/* <!-- Dropdown --> */}
                  <WidgetDropdown wclassName=" is-accent is-right">
                     <DropdownItem
                        title="Ảnh của bạn"
                        subTitle="Xem tất cả ảnh của bạn."
                     >
                        <FiUser></FiUser>
                     </DropdownItem>
                     <DropdownItem
                        title="Ảnh có bạn"
                        subTitle="Xem tất cả ảnh có bạn."
                     >
                        <FiUsers></FiUsers>
                     </DropdownItem>
                     <hr className="dropdown-divider" />
                     <DropdownItem
                        title="Tải ảnh lên"
                        subTitle="Tải ảnh từ thiết bị."
                     >
                        <FiUploadCloud></FiUploadCloud>
                     </DropdownItem>
                     <hr className="dropdown-divider" />
                     <DropdownItem
                        title="Xem tất cả"
                        subTitle="Xem tất cả ảnh."
                     >
                        <FiImage></FiImage>
                     </DropdownItem>
                  </WidgetDropdown>
                  <div className="dropdown is-spaced is-accent is-right dropdown-trigger">
                     <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                           <hr className="dropdown-divider" />
                           <hr className="dropdown-divider" />
                           <a href="#" className="dropdown-item">
                              <div className="media">
                                 <i data-feather="image"></i>
                                 <div className="media-content">
                                    <h3>Xem tất cả</h3>
                                    <small>Xem tất cả ảnh.</small>
                                 </div>
                              </div>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="body has-flex-list">
               {/* <!-- Photos --> */}
               <div className="photo-list">
                  {/* <!-- Photo item --> */}
                  {postMediaList &&
                     postMediaList.length > 0 &&
                     postMediaList.map((p, index) => (
                        <PhotoItem key={index} post={p}></PhotoItem>
                     ))}
               </div>
            </div>
         </div>

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

interface FriendItemProps {
   user: UserShort;
}

const FriendItem = ({ user }: FriendItemProps) => {
   return (
      <div className="column is-6">
         <div className="friend-small-card">
            <UserImage
               id={user?.id as string}
               path={(user?.avatar as string) || ""}
            />
            <div className="meta">
               <span>{user?.display}</span>
               {/* <span>264 Friends</span> */}
            </div>
            {/* <!-- Dropdown --> */}
            <WidgetDropdown wclassName="is-right is-accent">
               <DropdownItem
                  subTitle="Xem trang cá nhân."
                  title="Trang cá nhân"
               >
                  <FiUser></FiUser>
               </DropdownItem>
               <DropdownItem subTitle="Gửi tin nhắn." title="Nhắn tin">
                  <FiMessageSquare></FiMessageSquare>
               </DropdownItem>
               <DropdownItem subTitle="Hủy kết bạn." title="Hủy kết bạn">
                  <FiDelete></FiDelete>
               </DropdownItem>
            </WidgetDropdown>
         </div>
      </div>
   );
};

interface PhotoItemProps {
   post: Post;
}

const PhotoItem = ({ post }: PhotoItemProps) => {
   const { id, medias } = post;
   return (
      <>
         {medias &&
            medias.length > 0 &&
            medias.map((m, index) => {
               return (
                  <div
                     key={index}
                     className="photo-wrapper"
                     onClick={() => console.log(id)}
                  >
                     <div className="photo-overlay"></div>
                     <div className="small-like">
                        <div className="inner">
                           <div className="like-overlay"></div>
                           <FiHeart></FiHeart>
                        </div>
                     </div>
                     <Image
                        src={m?.mediaPath}
                        width={144}
                        height={144}
                        style={{
                           height: "144px",
                           width: "100%",
                        }}
                        alt="Image"
                     />
                  </div>
               );
            })}
      </>
   );
};

export default PersonalInfoPart;
