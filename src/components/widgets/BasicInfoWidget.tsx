import React, { useEffect, useState } from "react";
import { HeaderWidget } from ".";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { FiEye, FiSearch } from "react-icons/fi";
import { UserProfile } from "@/types/user.type";
import { useLazyGetUserQuery } from "@/redux/features/user/user.service";

interface IDropdownItem {
   icon: any;
   href: string;
   title: string;
   subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
   {
      icon: FiEye,
      href: "/about",
      title: "Giới thiệu",
      subTitle: "Thông tin chi tiết.",
   },
   {
      icon: FiSearch,
      href: "#",
      title: "Related",
      subTitle: "Search for related users.",
   },
];

interface InfoItemProps {
   infoName: string;
   infoDetail: string | number;
   children: React.ReactNode;
}

const InfoItem = ({ infoName, infoDetail, children }: InfoItemProps) => {
   return (
      <div className="info-row">
         {infoDetail && (
            <>
               <div>
                  <span>{infoName}</span>
                  <a className="is-inverted">{infoDetail}</a>
               </div>
               {children}
            </>
         )}
      </div>
   );
};

interface BasicInfoWidgetProps {
   userId: string;
}

const BasicInfoWidget = ({ userId }: BasicInfoWidgetProps) => {
   const [userProfile, setUserProfile] = useState<UserProfile>();
   const [getUserInfo] = useLazyGetUserQuery();

   useEffect(() => {
      async function fetchData() {
         const { data }: any = await getUserInfo(userId);
         if (data?.code === 200) {
            setUserProfile(data?.data);
         }
      }
      fetchData();
   }, [userId, getUserInfo]);

   return (
      <>
         <HeaderWidget header="Giới thiệu">
            <WidgetDropdown wclassName="is-neutral is-right">
               {dropdownItems.map((item, index) => {
                  return (
                     <DropdownItem
                        key={index}
                        title={item.title}
                        subTitle={item.subTitle}
                        href={`/${userId}/${item.href}`}
                     >
                        <item.icon />
                     </DropdownItem>
                  );
               })}
            </WidgetDropdown>
         </HeaderWidget>

         <div className="basic-infos-wrapper">
            <div className="card is-profile-info">
               {userProfile?.information?.studiedAt && (
                  <InfoItem
                     infoName="Đã học tại"
                     infoDetail={userProfile?.information?.studiedAt}
                  >
                     <i className="mdi mdi-school"></i>
                  </InfoItem>
               )}
               {userProfile?.information?.livesAt && (
                  <InfoItem
                     infoName="Đang sống ở"
                     infoDetail={userProfile?.information?.livesAt}
                  >
                     <i className="mdi mdi-map-marker"></i>
                  </InfoItem>
               )}
               {userProfile?.information?.followers && (
                  <InfoItem
                     infoName="Số người theo dõi"
                     infoDetail={userProfile?.information?.followers as number}
                  >
                     <i className="mdi mdi-bell-ring"></i>
                  </InfoItem>
               )}
            </div>
         </div>
      </>
   );
};

export default BasicInfoWidget;
