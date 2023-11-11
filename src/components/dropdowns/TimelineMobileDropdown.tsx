import React from "react";
import { DropdownItem, WidgetDropdown } from ".";
import { FiActivity, FiAlignRight, FiHeart, FiImage } from "react-icons/fi";
import useClickOutside from "@/hooks/useClickOutside";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setProfilePageActive } from "@/redux/features/global.slice";
import { ProfileActive } from "@/types/contants.type";

interface IDropdownItem {
   icon: any;
   href: string;
   title: string;
   subTitle: string;
   active: ProfileActive;
}

const dropdownItems: IDropdownItem[] = [
   {
      icon: FiActivity,
      href: "/profile-main.html",
      title: "Dòng thời gian",
      subTitle: "Vào dòng thời gian.",
      active: ProfileActive.TIMELINE,
   },
   {
      icon: FiAlignRight,
      href: "/profile-about.html",
      title: "Giới thiệu",
      subTitle: "Xem thông tin.",
      active: ProfileActive.ABOUT,
   },
   {
      icon: FiHeart,
      href: "/profile-friends.html",
      title: "Bạn bè",
      subTitle: "Xem danh sách bạn bè.",
      active: ProfileActive.FRIENDS,
   },
   {
      icon: FiImage,
      href: "/profile-photos.html",
      title: "Ảnh",
      subTitle: "Xem tất cả ảnh.",
      active: ProfileActive.PHOTOS,
   },
];

const TimelineMobileDropdown = () => {
   const pageActive = useAppSelector(
      (selector) => selector.global.profilePageActive
   );
   const dispatch = useDispatch();
   return (
      <WidgetDropdown wclassName="is-accent timeline-mobile-dropdown is-hidden-desktop">
         {dropdownItems.map((item, index) => {
            return (
               <DropdownItem
                  className={`${pageActive === item.active ? "is-active" : ""}`}
                  key={index}
                  href={item.href}
                  title={item.title}
                  subTitle={item.subTitle}
                  // onClick={() => handleActivePage(item.active)}
               >
                  {<item.icon />}
               </DropdownItem>
            );
         })}
      </WidgetDropdown>
   );
};

export default TimelineMobileDropdown;
