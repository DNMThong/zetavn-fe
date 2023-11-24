import { FriendRequestResponse } from "@/types/response.type";
import { UserImage } from "../user-image";
import {
   FiDelete,
   FiMessageSquare,
   FiUser,
   FiUserMinus,
   FiUserPlus,
} from "react-icons/fi";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { UserShort } from "@/types/user.type";

interface CardFriendProps {
   data: UserShort;
   isSelfProfile: boolean | null;
}

const CardFriend = ({ data, isSelfProfile }: CardFriendProps) => {
   const { user }: any = data;
   // if (friendshipType === "request") {
   //    return <CardFriendRequest data={data} />;
   // }
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
               {isSelfProfile && (
                  <DropdownItem subTitle="Hủy kết bạn." title="Hủy kết bạn">
                     <FiDelete></FiDelete>
                  </DropdownItem>
               )}
            </WidgetDropdown>
         </div>
      </div>
   );
};

export default CardFriend;
