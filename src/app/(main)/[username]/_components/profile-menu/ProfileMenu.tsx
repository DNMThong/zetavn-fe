import React, { useEffect } from "react";
import { ProfileMenuItem } from ".";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { ProfileActive } from "@/types/contants.type";
import { setProfilePageActive } from "@/redux/features/global.slice";
import { usePathname, useRouter } from "next/navigation";

const ProfileMenu = () => {
   const activePage = useAppSelector(
      (selector) => selector.global.profilePageActive
   );
   const dispatch = useDispatch();
   const router = useRouter();
   const pathName = usePathname();

   const handleClick = (e: any, value: ProfileActive) => {
      dispatch(setProfilePageActive(value));
      let newPath = pathName;
      if (pathName.includes("/about")) {
         newPath = pathName.split("/about").join("");
      } else if (pathName.includes("/friends")) {
         newPath = pathName.split("/friends").join("");
      } else if (pathName.includes("/photos")) {
         newPath = pathName.split("/photos").join("");
      }
      router.push(newPath + e.target.getAttribute("data-href"));
   };
   useEffect(() => {
      if (pathName.includes(activePage)) {
         dispatch(setProfilePageActive(activePage));
      } else {
         if (pathName.includes("/about")) {
            dispatch(setProfilePageActive(ProfileActive.ABOUT));
         } else if (pathName.includes("/friends")) {
            dispatch(setProfilePageActive(ProfileActive.FRIENDS));
         } else if (pathName.includes("/photos")) {
            dispatch(setProfilePageActive(ProfileActive.PHOTOS));
         } else {
            dispatch(setProfilePageActive(ProfileActive.TIMELINE));
         }
      }
   }, [pathName]);
   return (
      <div className="profile-menu is-hidden-mobile">
         <div className="menu-start">
            <ProfileMenuItem
               className={`${
                  activePage === ProfileActive.TIMELINE ? "is-active" : ""
               }`}
               title="Dòng thời gian"
               href="/"
               onClick={(e: any) => handleClick(e, ProfileActive.TIMELINE)}
            />
            <ProfileMenuItem
               className={`${
                  activePage === ProfileActive.ABOUT ? "is-active" : ""
               }`}
               title="Thông tin cá nhân"
               href="/about"
               onClick={(e: any) => handleClick(e, ProfileActive.ABOUT)}
            />
         </div>
         <div className="menu-end">
            <ProfileMenuItem
               className={`${
                  activePage === ProfileActive.FRIENDS ? "is-active" : ""
               }`}
               title="Bạn bè"
               id="profile-friends-link"
               href="/friends"
               onClick={(e: any) => handleClick(e, ProfileActive.FRIENDS)}
            />
            <ProfileMenuItem
               className={`${
                  activePage === ProfileActive.PHOTOS ? "is-active" : ""
               }`}
               title="Ảnh"
               href="/photos"
               onClick={(e: any) => handleClick(e, ProfileActive.PHOTOS)}
            />
         </div>
      </div>
   );
};

export default ProfileMenu;
