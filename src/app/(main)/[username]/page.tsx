"use client";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
   BasicInfoWidget,
   PhotosWidget,
   StarFriendsWidget,
   VideosWidget,
} from "@/components/widgets";

import TopPart from "./_components/profile-part/TopPart";
import { CardPost } from "@/components/card";
import Post from "@/types/post.type";
import { useGetPostsByUserIdQuery } from "@/redux/features/post/post.service";
import Image from "next/image";

enum ActiveFilter {
   RECENT = "recent",
   POPULAR = "popular",
}

const ProfilePage = ({ params }: { params: { username: string } }) => {
   const user = useAppSelector((selector) => selector.auth.user);
   console.log("🚀 ~ file: page.tsx:25 ~ ProfilePage ~ user:", user);
   const isSelfProfile =
      user &&
      (user.id === params.username || user.username === params.username);
   const helmet = `${user?.display} | Zetantavn`;
   const [posts, setPosts] = useState<Post>();
   const [activeFilter, setActiveFilter] = useState<ActiveFilter>(
      ActiveFilter.RECENT
   );
   const { data } = useGetPostsByUserIdQuery(params.username || "");

   // useEffect(() => {}, [activeFilter]);

   return (
      <>
         <Helmet>
            <title>{helmet}</title>
            <meta name="description" content={helmet} />
         </Helmet>
         <div className="container is-custom">
            <div id="profile-main" className="view-wrap is-headless">
               <TopPart />
               <div className="columns">
                  <div id="profile-timeline-widgets" className="column is-4">
                     <BasicInfoWidget userId={params.username} />
                     <PhotosWidget userId={params.username} />
                     <StarFriendsWidget
                        userId={params.username}
                        isSelfProfile={!!isSelfProfile}
                     />
                     <VideosWidget />
                  </div>

                  <div className="column is-8">
                     <div id="profile-timeline-posts" className="box-heading">
                        <h4>Bài đăng</h4>
                        <div className="button-wrap">
                           <button
                              type="button"
                              className={`button ${
                                 activeFilter === ActiveFilter.RECENT
                                    ? "is-active"
                                    : ""
                              } `}
                           >
                              Recent
                           </button>
                           <button
                              type="button"
                              className={`button ${
                                 activeFilter === ActiveFilter.POPULAR
                                    ? "is-active"
                                    : ""
                              } `}
                           >
                              Popular
                           </button>
                        </div>
                     </div>
                     <div className="profile-timeline">
                        {data?.data &&
                           data?.data.length > 0 &&
                           data?.data.map((post, index) => (
                              <div className="profile-post" key={index}>
                                 <div className="time is-hidden-mobile">
                                    <div className="img-container">
                                       <Image
                                          src={
                                             post.user.avatar ||
                                             "https://via.placeholder.com/400x400"
                                          }
                                          alt="Avatar"
                                          width={44}
                                          height={44}
                                       />
                                    </div>
                                 </div>
                                 <CardPost key={post.id} data={post} />
                              </div>
                           ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProfilePage;
