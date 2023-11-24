import React, { useEffect, useState } from "react";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { HeaderWidget } from ".";
import { FiTag, FiVideo } from "react-icons/fi";
import { Overlay } from "@/components/modals";
import useClickOutside from "@/hooks/useClickOutside";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import { useParams } from "next/navigation";
import Post from "@/types/post.type";

interface IDropdownItem {
   icon: any;
   href: string;
   title: string;
   subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
   {
      icon: FiVideo,
      href: "#v1",
      title: "View Videos",
      subTitle: "View all your videos",
   },
   {
      icon: FiTag,
      href: "#v2",
      title: "Tagged",
      subTitle: "View videos you are tagged in.",
   },
];

interface VideoContainerProps {
   videoPath: string;
}

const VideoContainer = ({ videoPath }: VideoContainerProps) => {
   return (
      <div className="video-container" style={{ height: "114.1px" }}>
         <img
            src={videoPath}
            data-demo-src="assets/img/demo/widgets/videos/1.jpg"
            alt=""
         />
         <div className="video-button">
            <img src="assets/img/icons/video/play.svg" alt="" />
         </div>
         <Overlay overlayClassName="video-overlay"></Overlay>
      </div>
   );
};

const VideosWidget = () => {
   const { username: userId } = useParams();
   const [videos, setVideos] = useState<Post[]>();
   const [getPosts] = useLazyGetPostMediaByUserIdQuery(userId as any);
   useEffect(() => {
      async function fetchData() {
         const { data }: any = await getPosts(userId as string).unwrap();
         if (data?.data) {
            setVideos(data?.data);
         }
      }
      fetchData();
   }, [getPosts, userId]);
   return (
      <>
         <HeaderWidget header="Videos">
            <WidgetDropdown wclassName="is-neutral is-right">
               {dropdownItems.map((item, index) => {
                  return (
                     <DropdownItem
                        key={index}
                        href={item.href}
                        title={item.title}
                        subTitle={item.subTitle}
                     >
                        {<item.icon />}
                     </DropdownItem>
                  );
               })}
            </WidgetDropdown>
         </HeaderWidget>

         <div className="is-videos-widget">
            {videos &&
               videos.length > 0 &&
               videos.map((v, i) => {
                  return (
                     v.medias &&
                     v.medias.length > 0 &&
                     v.medias.map((vm, index) => {
                        if (vm.mediaType !== "video") return null;
                        return (
                           <VideoContainer
                              key={vm.mediaPath}
                              videoPath={vm.mediaPath}
                           ></VideoContainer>
                        );
                     })
                  );
               })}
         </div>
      </>
   );
};

export default VideosWidget;
