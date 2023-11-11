import React from "react";
import { DropdownItem, WidgetDropdown } from "../dropdowns";
import useClickOutside from "@/hooks/useClickOutside";
import {
   FiBell,
   FiBookOpen,
   FiChevronDown,
   FiClock,
   FiCoffee,
   FiHeart,
   FiSearch,
   FiTag,
} from "react-icons/fi";

interface IDropdownItem {
   icon: any;
   href: string;
   title: string;
   subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
   {
      icon: FiTag,
      href: "profile-about.html",
      title: "Tagged Photos",
      subTitle: "Photos whith this user tagged.",
   },
   {
      icon: FiClock,
      href: "#",
      title: "Recent",
      subTitle: "View most recent photos.",
   },
   {
      icon: FiHeart,
      href: "#",
      title: "Popular",
      subTitle: "View popular photos.",
   },
   {
      icon: FiBookOpen,
      href: "#",
      title: "Albums",
      subTitle: "See all albums.",
   },
];

const PhotosFilterWidget = () => {
   return (
      <>
         <div className="box-heading">
            <WidgetDropdown
               wclassName="photos-dropdown is-neutral"
               button={
                  <>
                     <span>Tất cả ảnh</span>
                     <FiChevronDown />
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
                     <i data-feather="plus"></i>
                     <div className="media-content">
                        <h3>Thêm ảnh</h3>
                        <small>Tải ảnh lên.</small>
                     </div>
                  </div>
               </a>
            </WidgetDropdown>

            <div className="button-wrap">
               <button type="button" className="button is-active">
                  Mới nhất
               </button>
               <button type="button" className="button">
                  Bộ sưu tập
               </button>
            </div>
         </div>
      </>
   );
};

export default PhotosFilterWidget;
