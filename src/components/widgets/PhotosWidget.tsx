import React, { useEffect, useState } from "react";
import { HeaderWidget } from ".";
import { FiFolder, FiImage, FiTag } from "react-icons/fi";
import useClickOutside from "@/hooks/useClickOutside";
import { DropdownItem, WidgetDropdown } from "../dropdowns";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import Post from "@/types/post.type";

interface IDropdownItem {
   icon: any;
   href: string;
   title: string;
   subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
   {
      icon: FiImage,
      href: "/photos",
      title: "Ảnh",
      subTitle: "Xem tất cả ảnh.",
   },
   {
      icon: FiTag,
      href: "/photos",
      title: "Được gắn thẻ",
      subTitle: "Xem ảnh bạn được gắn thẻ.",
   },
   {
      icon: FiFolder,
      href: "/photos",
      title: "Bộ sưu tập",
      subTitle: "Xem bộ sưu tập.",
   },
];

interface PhotosWidgetProps {
   userId: string;
}

const PhotosWidget = ({ userId }: PhotosWidgetProps) => {
   const [posts, setPosts] = useState<Post[]>([]);
   const [getPosts] = useLazyGetPostMediaByUserIdQuery(userId as any);
   useEffect(() => {
      async function fetchData() {
         const { data }: any = await getPosts(userId).unwrap();
         console.log(
            "🚀 ~ file: PhotosWidget.tsx:46 ~ fetchData ~ data:",
            data
         );
         if (data?.data) {
            setPosts(data?.data);
         }
      }
      fetchData();
   }, [getPosts, userId]);
   return (
      <>
         <HeaderWidget header="Ảnh">
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

         <div
            className="is-photos-widget"
            style={{
               justifyContent: "flex-start",
               columnGap: "8px",
            }}
         >
            {posts &&
               posts.length > 0 &&
               posts.map((p, index) => {
                  return (
                     <PhotoItems
                        key={p.id + index}
                        postId={p.id}
                        medias={p.medias}
                     ></PhotoItems>
                  );
               })}
         </div>
      </>
   );
};

interface PhotoItemsProps {
   postId: string;
   medias: {
      mediaPath: string;
      mediaType: string;
   }[];
}

const PhotoItems = ({ medias, postId }: PhotoItemsProps) => {
   return (
      <>
         {medias &&
            medias.length > 0 &&
            medias.map((m, index2) => {
               if (m.mediaType === "image") {
                  return (
                     <img
                        key={index2}
                        src={m.mediaPath}
                        alt=""
                        style={{ height: "85px", objectFit: "cover" }}
                        onClick={() => console.log(postId)}
                     />
                  );
               }
               return <></>;
            })}
      </>
   );
};

export default PhotosWidget;
