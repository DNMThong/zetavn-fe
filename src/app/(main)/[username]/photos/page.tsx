"use client";
import React, { useEffect, useState } from "react";
import TopPart from "../_components/profile-part/TopPart";
import { PhotosFilterWidget } from "@/components/widgets";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import Post from "@/types/post.type";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";

const ProfilePhotosPage = () => {
   const { username } = useParams();
   const user = useAppSelector((selector) => selector.auth.user);
   const isSelfProfile =
      user && (user.id === username || user.username === username);
   const [posts, setPosts] = useState<Post[]>([]);
   const [getPosts] = useLazyGetPostMediaByUserIdQuery(username as any);
   useEffect(() => {
      async function fetchData() {
         const { data }: any = await getPosts(username as string).unwrap();
         console.log(
            "🚀 ~ file: PhotosWidget.tsx:46 ~ fetchData ~ data:",
            data
         );
         if (data?.data) {
            setPosts(data?.data);
         }
      }
      fetchData();
   }, [getPosts, username]);
   return (
      <>
         <div className="container is-custom">
            <div id="profile-about" className="view-wrap is-headless">
               <TopPart></TopPart>
               <div className="columns">
                  <div className="column">
                     <PhotosFilterWidget></PhotosFilterWidget>
                     <div className="image-grid-wrap">
                        <div className="image-grid">
                           {/* <!--Grid Row--> */}
                           <div className="image-row">
                              {/* <!--Photo--> */}
                              {/* Image here */}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProfilePhotosPage;
