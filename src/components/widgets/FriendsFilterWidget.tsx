import React, { useState } from "react";
import { DropdownItem, WidgetDropdown } from "../dropdowns";
import { FiBell, FiChevronDown, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useParams } from "next/navigation";

const FriendsFilterWidget = () => {
   const { username } = useParams();
   const [dropdownActive, setDropdownActive] =
      useState<string>("Tất cả bạn bè");
   const handleClick = (e: any, activeDropdown: string) => {
      setDropdownActive(activeDropdown);
   };
   return (
      <>
         <div className="box-heading">
            <WidgetDropdown
               wclassName="friends-dropdown is-neutral"
               button={
                  <>
                     <span>{dropdownActive}</span>
                     <FiChevronDown></FiChevronDown>
                  </>
               }
            >
               <DropdownItem
                  href={`/${username}/friends?tab=follow`}
                  title="Đã theo dõi"
                  subTitle="Bạn bè mà bạn đã theo dõi."
                  onClick={() => setDropdownActive("Đã theo dõi")}
               >
                  {<FiBell />}
               </DropdownItem>
               <hr className="dropdown-divider" />
               <Link
                  className="dropdown-item modal-trigger"
                  data-modal="albums-modal"
                  href={`/${username}/friends?tab=friend`}
                  onClick={(e: any) => handleClick(e, "Tất cả bạn bè")}
               >
                  <div className="media">
                     <i data-feather="mail"></i>
                     <div className="media-content">
                        <h3>Tất cả bạn bè</h3>
                        <small>Tất cả bạn bè của bạn.</small>
                     </div>
                  </div>
               </Link>
               <Link
                  className="dropdown-item modal-trigger"
                  data-modal="albums-modal"
                  href={`/${username}/friends?tab=request`}
                  onClick={(e: any) => handleClick(e, "Lời mời kết bạn")}
               >
                  <div className="media">
                     <i data-feather="mail"></i>
                     <div className="media-content">
                        <h3>Lời mời kết bạn</h3>
                        <small>Lời mời kết bạn đã nhận.</small>
                     </div>
                  </div>
               </Link>
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
