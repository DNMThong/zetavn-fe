import React from "react";
import { FiClock } from "react-icons/fi";

interface ProfileSubHeaderProps {
   display: string;
   totalFriends: number;
}

const ProfileSubHeader = ({ display, totalFriends }: ProfileSubHeaderProps) => {
   console.log(
      "🚀 ~ file: ProfileSubHeader.tsx:10 ~ ProfileSubHeader ~ totalFriends:",
      totalFriends
   );
   return (
      <div className="profile-subheader">
         <div className="subheader-start is-hidden-mobile">
            <span>
               {totalFriends >= 0 && totalFriends > 1000
                  ? totalFriends / 1000
                  : totalFriends || 0}
            </span>
            <span>Bạn bè</span>
         </div>
         <div className="subheader-middle">
            <h2>{display}</h2>
            {/* role */}
            {/* <span>Media Influencer</span> */}
         </div>
         <div className="subheader-end is-hidden-mobile">
            <a className="button has-icon is-bold">
               <FiClock></FiClock>
               Lịch sử
            </a>
         </div>
      </div>
   );
};

export default ProfileSubHeader;
