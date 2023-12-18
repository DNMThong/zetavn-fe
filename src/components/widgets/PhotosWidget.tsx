import React, { useEffect, useState } from "react";
import { HeaderWidget } from ".";
import { FiFolder, FiImage, FiTag } from "react-icons/fi";
import useClickOutside from "@/hooks/useClickOutside";
import { DropdownItem, WidgetDropdown } from "../dropdowns";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import Post, { Media } from "@/types/post.type";
import { MediaType } from "@/types/contants.type";
import { Fancybox } from "../fancybox";

interface IDropdownItem {
  icon: any;
  href: string;
  title: string;
  subTitle: string;
}

const dropdownItems: IDropdownItem[] = [
  {
    icon: FiImage,
    href: "#",
    title: "Ảnh",
    subTitle: "Xem tất cả ảnh.",
  },
  {
    icon: FiTag,
    href: "#",
    title: "Được gắn thẻ",
    subTitle: "Xem ảnh bạn được gắn thẻ.",
  },
  {
    icon: FiFolder,
    href: "#",
    title: "Bộ sưu tập",
    subTitle: "Xem bộ sưu tập.",
  },
];

interface PhotosWidgetProps {
  userId: string;
}

const PhotosWidget = ({ userId }: PhotosWidgetProps) => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [getMediaPost] = useLazyGetPostMediaByUserIdQuery();
  useEffect(() => {
    async function fetchData() {
      const { data }: any = await getMediaPost({
        userId,
        type: MediaType.IMAGE,
        pageSize: 4,
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
      <HeaderWidget header="Ảnh">
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
        <div
          className="is-photos-widget"
          style={{
            justifyContent: "flex-start",
            columnGap: "8px",
          }}>
          {medias &&
            medias.length > 0 &&
            medias.map((media, index) => {
              return (
                <a
                  key={index}
                  data-fancybox={`post-image ${index}`}
                  data-lightbox-type="image"
                  href={media.mediaPath}>
                  <img src={media.mediaPath} alt="" />
                </a>
              );
            })}
        </div>
      </Fancybox>
    </>
  );
};

// interface PhotoItemsProps {
//   postId: string;
//   medias: {
//     mediaPath: string;
//     mediaType: string;
//   }[];
// }

// const PhotoItems = ({ medias, postId }: PhotoItemsProps) => {
//   return (
//     <>
//       {medias &&
//         medias.length > 0 &&
//         medias.slice(0, 1).map((m, index2) => {
//           if (m.mediaType === "image") {
//             return (

//             );
//           }
//           return <></>;
//         })}
//     </>
//   );
// };

export default PhotosWidget;
