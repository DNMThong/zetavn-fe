import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import {
   useLazyGetFriendRequestQuery,
   useLazyGetFriendsListByUserIdQuery,
} from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserShort } from "@/types/user.type";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiEye, FiSearch, FiSmile } from "react-icons/fi";
import { CardFriend, CardFriendRequest } from "../card";
import { setFriendRequest, setFriends } from "@/redux/features/auth/auth.slice";

const ListFriend = () => {
   const router = useRouter();
   const user = useAppSelector((selector) => selector.auth.user);
   const friends = useAppSelector((selector) => selector.auth.friends);
   const friendRequests = useAppSelector(
      (selector) => selector.auth.friendRequest
   );
   const dispatch = useAppDispatch();
   const params = useSearchParams();
   const { username } = useParams();
   const isSelfProfile = user && user.id === username;
   const [getFriendRequest] = useLazyGetFriendRequestQuery();
   const [getFriendsList] = useLazyGetFriendsListByUserIdQuery();
   const [cardFriendType, setCardFriendType] = useState<string | undefined>(
      params.get("friendTab") || "friend"
   );

   const handleGetListFriendRequest = async () => {
      setCardFriendType("request");
      router.push(
         `/${username}/about?content=${params.get(
            "content"
         )}&friendTab=${params.get("request")}`
      );
   };

   useEffect(() => {
      router.push(
         `/${username}/about?content=${params.get(
            "content"
         )}&friendTab=${cardFriendType}`
      );
   }, [cardFriendType, params, router, username]);

   useEffect(() => {
      const fetchFriendRequest = async () => {
         const response = await getFriendRequest({
            userId: (username as string) || "",
            pageNumber: 0,
            pageSize: 6,
         }).unwrap();
         if (response.code === 200) {
            const { data } = response;
            dispatch(setFriendRequest(data.data));
         }
      };
      fetchFriendRequest();
   }, [cardFriendType, dispatch, getFriendRequest, username]);

   useEffect(() => {
      const fetchFriendList = async () => {
         const { data, code }: any = await getFriendsList({
            userId: username as string,
            pageSize: 6,
         }).unwrap();
         if (code === 200) {
            dispatch(setFriends(data?.data));
         }
      };

      fetchFriendList();
   }, [dispatch, getFriendsList, username]);

   return (
      <div className="about-card">
         {/* <!-- Header --> */}
         <div className="header">
            <div className="icon-title">
               <i className="mdi mdi-account-group"></i>
               <h3>
                  {cardFriendType === "request" ? "Lời mời kết bạn" : "Bạn bè"}
               </h3>
            </div>
            {isSelfProfile && (
               <div className="actions">
                  <div className="button-wrapper">
                     <a className="button" onClick={handleGetListFriendRequest}>
                        Lời mời kết bạn
                     </a>
                     <div className="indicator">
                        <span>{friendRequests.length || 0}</span>
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
            )}
         </div>
         <div className="body">
            <div className="columns friends-columns is-multiline">
               {/* <!-- Friend --> */}
               {cardFriendType === "request" &&
                  friendRequests &&
                  friendRequests.length > 0 &&
                  friendRequests.map((data, index) => (
                     <CardFriendRequest
                        key={index}
                        data={data}
                     ></CardFriendRequest>
                  ))}
               {cardFriendType === "friend" &&
                  friends &&
                  friends.length > 0 &&
                  friends.map((data, index) => (
                     <CardFriend
                        key={index}
                        data={data}
                        isSelfProfile={isSelfProfile}
                     ></CardFriend>
                  ))}
            </div>
         </div>
      </div>
   );
};

export default ListFriend;
