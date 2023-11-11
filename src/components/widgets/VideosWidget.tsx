import React from "react";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { HeaderWidget } from ".";
import { FiTag, FiVideo } from "react-icons/fi";
import { Overlay } from "@/components/modals";
import useClickOutside from "@/hooks/useClickOutside";

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
      <div className="video-container">
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
            <VideoContainer videoPath="https://via.placeholder.com/200x200"></VideoContainer>
            <VideoContainer videoPath="https://via.placeholder.com/200x200"></VideoContainer>
            <VideoContainer videoPath="https://via.placeholder.com/200x200"></VideoContainer>
         </div>
      </>
   );
};

export default VideosWidget;
