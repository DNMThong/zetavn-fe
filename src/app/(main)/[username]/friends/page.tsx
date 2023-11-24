"use client";
import React, { useEffect, useState } from "react";
import TopPart from "../_components/profile-part/TopPart";
import { FriendsFilterWidget } from "@/components/widgets";
import { CardFriend, CardFriendRequest } from "@/components/card";
import { useAppSelector } from "@/redux/hooks";
import { useLazyGetFriendsListByUserIdQuery } from "@/redux/features/user/user.service";
import { useParams, useSearchParams } from "next/navigation";
import { UserShort } from "@/types/user.type";
import CardFriendReqCol4 from "../_components/card/CardFriendReqCol4";
import { StatusFriend } from "@/types/contants.type";

enum Tab {
   FRIENDS = "friend",
   FOLLOWS = "follow",
   REQUESTS = "request",
}

const ProfileFriendsPage = () => {
   const { username } = useParams();
   const query = useSearchParams();

   const user = useAppSelector((selector) => selector.auth.user);
   const friends = useAppSelector((selector) => selector.auth.friends);
   const friendRequests = useAppSelector(
      (selector) => selector.auth.friendRequest
   );
   console.log(
      "🚀 ~ file: page.tsx:26 ~ ProfileFriendsPage ~ friendRequests:",
      friendRequests
   );
   const isSelfProfile =
      user && (user.id === username || user.username === username);
   const [friendsList, setFriendsList] = useState<UserShort[]>([]);
   console.log(
      "🚀 ~ file: page.tsx:29 ~ ProfileFriendsPage ~ friendsList:",
      friendsList
   );
   const [getFriendsList] = useLazyGetFriendsListByUserIdQuery(username as any);
   const [tabQuery, setTabQuery] = useState<Tab>(
      (query.get("tab") as Tab) || Tab.FRIENDS
   );
   const [paginate, setPaginate] = useState<{
      pageNumber: number;
      pageSize: number;
   }>();
   const handleLoadMoreFriends = (e: any) => {
      e.preventDefault();
      setPaginate((prev: any) => ({
         pageNumber: prev?.pageNumber + 1,
         ...prev,
      }));
   };

   useEffect(() => {
      setTabQuery(query.get("tab") as Tab);
   }, [query, tabQuery]);

   useEffect(() => {
      async function fetchFriendsList() {
         const response: any = await getFriendsList({
            userId: username as string,
            ...paginate,
         }).unwrap();
         if (response?.code === 200 && response?.status === "OK") {
            setFriendsList((prev: any) => {
               return [...prev, ...response?.data?.data];
            });
         }
      }
      fetchFriendsList();
   }, [tabQuery, username, user, getFriendsList, paginate]);
   return (
      <div className="container is-custom">
         <div id="profile-about" className="view-wrap is-headless">
            <TopPart></TopPart>
            <div className="columns">
               <div className="column">
                  <FriendsFilterWidget></FriendsFilterWidget>
                  <div className="friends-grid">
                     <div className="columns is-multiline">
                        {tabQuery === Tab.FRIENDS &&
                           friendsList &&
                           friendsList.length > 0 &&
                           friendsList.map((f: any, index: any) => {
                              return (
                                 <div className="column is-3" key={index}>
                                    <CardFriend
                                       user={f.user}
                                       popOver={index}
                                    ></CardFriend>
                                 </div>
                              );
                           })}

                        {tabQuery === Tab.REQUESTS &&
                           friendRequests &&
                           friendRequests.length > 0 &&
                           friendRequests.map((fq: any, index: any) => {
                              return (
                                 <div className="column is-4" key={index}>
                                    <CardFriendReqCol4
                                       data={fq}
                                       isFriend={false}
                                    ></CardFriendReqCol4>
                                 </div>
                              );
                           })}
                     </div>
                     {/* <!-- Load more photos --> */}
                     {/* <div className="load-more-wrap has-text-centered">
                        <a
                           href="#"
                           className="load-more-button"
                           onClick={handleLoadMoreFriends}
                        >
                           Load More
                        </a>
                     </div> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileFriendsPage;
