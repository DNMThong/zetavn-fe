"use client";
import React, { useEffect, useState } from "react";
import TopPart from "../_components/profile-part/TopPart";
import { FriendsFilterWidget } from "@/components/widgets";
import { CardFriend } from "@/components/card";
import { useAppSelector } from "@/redux/hooks";
import { useLazyGetFriendsListByUserIdQuery } from "@/redux/features/user/user.service";
import { useParams, useSearchParams } from "next/navigation";
import { UserShort } from "@/types/user.type";

enum Tab {
   ALL = "all",
   FOLLOW = "follow",
   REQUEST = "request",
}

const ProfileFriendsPage = () => {
   const { username } = useParams();
   const query = useSearchParams();

   console.log(
      "🚀 ~ file: page.tsx:13 ~ ProfileFriendsPage ~ query:",
      query.get("tab")
   );

   const user = useAppSelector((selector) => selector.auth.user);
   const isSelfProfile =
      user && (user.id === username || user.username === username);
   const [friendsList, setFriendsList] = useState<UserShort[]>([]);
   console.log(
      "🚀 ~ file: page.tsx:29 ~ ProfileFriendsPage ~ friendsList:",
      friendsList
   );
   const [getFriendsList] = useLazyGetFriendsListByUserIdQuery(username as any);
   const [tabQuery, setTabQuery] = useState<Tab>(Tab.ALL);
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
                        {friendsList &&
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
                     </div>
                     {/* <!-- Load more photos --> */}
                     <div className="load-more-wrap has-text-centered">
                        <a
                           href="#"
                           className="load-more-button"
                           onClick={handleLoadMoreFriends}
                        >
                           Load More
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileFriendsPage;
