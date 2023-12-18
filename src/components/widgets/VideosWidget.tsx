import React, { useEffect, useState } from "react";
import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { HeaderWidget } from ".";
import { FiTag, FiVideo } from "react-icons/fi";
import { Overlay } from "@/components/modals";
import useClickOutside from "@/hooks/useClickOutside";
import { MediaType } from "@/types/contants.type";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import { Media } from "@/types/post.type";
import { Fancybox } from "../fancybox";

interface IDropdownItem {
  icon: any;
  href: string;
  title: string;
  subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
  {
    icon: FiVideo,
    href: "#",
    title: "Video",
    subTitle: "Xem tất cả video",
  },
  {
    icon: FiTag,
    href: "#",
    title: "Được gắn thẻ",
    subTitle: "Xem ảnh bạn được gắn thẻ.",
  },
];

interface VideoContainerProps {
  videoPath: string;
}

const VideoContainer = ({ videoPath }: VideoContainerProps) => {
  return (
    <div className="video-container">
      <a
        data-fancybox={`${videoPath}`}
        data-lightbox-type="video"
        href={videoPath}>
        <img src="/favicon.png" alt="thumbnail" />
        <div className="video-button">
          <img src="/img/icons/video/play.svg" alt="" />
        </div>
        <Overlay overlayClassName="video-overlay"></Overlay>
      </a>
    </div>
  );
};

interface VideosWidgetProps {
  userId: string;
}

const VideosWidget = ({ userId }: VideosWidgetProps) => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [getMediaPost] = useLazyGetPostMediaByUserIdQuery();
  useEffect(() => {
    async function fetchData() {
      const { data }: any = await getMediaPost({
        userId,
        type: MediaType.VIDEO,
        pageSize: 3,
        pageNumber: 0,
      }).unwrap();
      if (data?.data) {
        setMedias(data?.data);
      }
    }
    fetchData();
  }, [userId]);

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
                subTitle={item.subTitle}>
                {<item.icon />}
              </DropdownItem>
            );
          })}
        </WidgetDropdown>
      </HeaderWidget>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}>
        <div className="is-videos-widget">
          {medias &&
            medias.length > 0 &&
            medias.map((media) => (
              <VideoContainer
                key={media.mediaPath}
                videoPath={media.mediaPath}></VideoContainer>
            ))}
        </div>
      </Fancybox>
    </>
  );
};

export default VideosWidget;
