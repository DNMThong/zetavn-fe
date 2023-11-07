import React from "react";
import { HeaderWidget } from ".";
import { DropdownItem, WidgetDropdown } from "../dropdowns";
import useClickOutside from "@/hooks/useClickOutside";
import {
   FiBell,
   FiChevronDown,
   FiCoffee,
   FiHeart,
   FiSearch,
} from "react-icons/fi";

interface IDropdownItem {
   icon: any;
   href: string;
   title: string;
   subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
   // {
   //    icon: FiHeart,
   //    href: "profile-about.html",
   //    title: "Ban",
   //    subTitle: "Your closest friends list.",
   // },
   {
      icon: FiBell,
      href: "#",
      title: "Đã theo dõi",
      subTitle: "Bạn bè mà bạn đã theo dõi.",
   },
   {
      icon: FiCoffee,
      href: "#",
      title: "Công việc",
      subTitle: "Mối quan hệ công việc.",
   },
];

const FriendsFilterWidget = () => {
   return (
      <>
         <div className="box-heading">
            <WidgetDropdown
               wclassName="friends-dropdown is-neutral"
               button={
                  <>
                     <span>Tất cả bạn bè</span>
                     <FiChevronDown></FiChevronDown>
                  </>
               }
            >
               {dropdownItems.map((item, index) => {
                  return (
                     <DropdownItem
                        key={index}
                        href={item.href}
                        title={item.title}
                        subTitle={item.subTitle}
                     >
                        {<item.icon />}
                     </DropdownItem>
                  );
               })}
               <hr className="dropdown-divider" />
               <a
                  className="dropdown-item modal-trigger"
                  data-modal="albums-modal"
               >
                  <div className="media">
                     <i data-feather="mail"></i>
                     <div className="media-content">
                        <h3>Lời mời kết bạn</h3>
                        <small>Lời mời kết bạn đã nhận.</small>
                     </div>
                  </div>
               </a>
            </WidgetDropdown>

            <div className="control heading-search">
               <input
                  type="text"
                  className="input is-rounded"
                  placeholder="Search Friends..."
               />
               <div className="search-icon">
                  <FiSearch></FiSearch>
               </div>
            </div>
         </div>
      </>
   );
};

export default FriendsFilterWidget;
