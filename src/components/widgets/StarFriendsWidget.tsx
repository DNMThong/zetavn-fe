import React, { useEffect, useState } from "react";
import { HeaderWidget } from ".";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { FiBriefcase, FiHeart, FiStar, FiUsers } from "react-icons/fi";
import useClickOutside from "@/hooks/useClickOutside";
import { useLazyGetFriendsListByUserIdQuery } from "@/redux/features/user/user.service";
import Image from "next/image";
import Link from "next/link";

interface IDropdownItem {
   icon: any;
   href: string;
   title: string;
   subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
   {
      icon: FiUsers,
      href: "/friends",
      title: "Danh sách bạn bè",
      subTitle: "Xem tất cả bạn bè.",
   },
   // {
   //    icon: FiHeart,
   //    href: "/family",
   //    title: "Family",
   //    subTitle: "View family members",
   // },
   // {
   //    icon: FiBriefcase,
   //    href: "/work",
   //    title: "Work Relations",
   //    subTitle: "View work related friends.",
   // },
];

interface FriendItemProps {
   id: string;
   username: string;
   display: string;
   avatar: string | null;
   mutualFriends: number;
   userPopover: number;
   isSelfProfile: boolean;
}

const FriendItem = ({
   id,
   username,
   display,
   avatar,
   mutualFriends,
   userPopover,
   isSelfProfile,
}: FriendItemProps) => {
   return (
      <div className="friend-item">
         <Image
            src={avatar || "https://via.placeholder.com/400x400"}
            alt=""
            data-user-popover={userPopover}
            width={44}
            height={44}
         />
         <div className="text-content">
            <Link href={username || id}>{display}</Link>
            <span>{mutualFriends} bạn chung</span>
         </div>
         {/* {isSelfProfile && (
            <div className="star-friend">
               <FiStar></FiStar>
            </div>
         )} */}
      </div>
   );
};

interface StarFriendsWidgetProps {
   userId: string;
   isSelfProfile: boolean;
}

const StarFriendsWidget = ({
   userId,
   isSelfProfile,
}: StarFriendsWidgetProps) => {
   const [friendsList, setFriendsList] = useState([]);
   const [getFriendsList] = useLazyGetFriendsListByUserIdQuery(userId as any);
   useEffect(() => {
      async function fetchData() {
         const { data }: any = await getFriendsList({ userId }).unwrap();
         setFriendsList(data?.data);
      }
      fetchData();
   }, [userId, friendsList, getFriendsList]);
   return (
      <>
         <HeaderWidget header="Bạn bè">
            <WidgetDropdown wclassName="is-neutral is-right">
               {dropdownItems.map((item, index) => {
                  return (
                     <DropdownItem
                        key={index}
                        href={`/${userId}/${item.href}`}
                        title={item.title}
                        subTitle={item.subTitle}
                     >
                        {<item.icon />}
                     </DropdownItem>
                  );
               })}
            </WidgetDropdown>
         </HeaderWidget>

         <div className="friend-cards-list">
            <div className="card is-friend-card">
               {friendsList &&
                  friendsList.length > 0 &&
                  friendsList.map(({ user }: any, index) => {
                     return (
                        <FriendItem
                           key={index}
                           id={user?.id}
                           username={user?.username}
                           avatar={user?.avatar}
                           userPopover={index}
                           display={user?.display}
                           mutualFriends={4}
                           isSelfProfile={!!isSelfProfile}
                        />
                     );
                  })}
            </div>
         </div>
      </>
   );
};

export default StarFriendsWidget;
