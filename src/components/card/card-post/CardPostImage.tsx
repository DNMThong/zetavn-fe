import { Fancybox } from "@/components/fancybox";
import Image from "next/image";
import React from "react";
import CardPostAction from "./CardPostAction";

interface CardPostImageProps {
  postAction?: React.ReactNode;
  images: string[];
}

const CardPostImage = ({ postAction, images }: CardPostImageProps) => {
  return (
    <div className="post-image">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}>
        <div
          className={`masonry-grid-image  ${
            images.length < 6 ? "mgi-el-" + images.length : "mgi-el-5-more"
          }`}>
          {images.map((image, index) => {
            if (index === 4 && images.length > 5) {
              return (
                <div className="mgi-el-item" key={index}>
                  <a
                    data-fancybox="post"
                    data-lightbox-type="image"
                    href={image}>
                    <div className="mgi-el-item-overlay">
                      +{images.length - 5}
                    </div>
                    <Image
                      src={image}
                      alt="image"
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </a>
                </div>
              );
            }

            return (
              <div className="mgi-el-item" key={index}>
                <a data-fancybox="post" data-lightbox-type="image" href={image}>
                  <Image
                    src={image}
                    alt="image"
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </Fancybox>
      {postAction !== undefined && postAction}
    </div>
  );
};

export default CardPostImage;
