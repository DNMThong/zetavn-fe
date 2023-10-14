import { Fancybox } from "@/components/fancybox";
import Image from "next/image";
import React from "react";
import CardPostAction from "./CardPostAction";

interface CardPostImageProps {
  postAction?: React.ReactNode;
}

const CardPostImage = ({ postAction }: CardPostImageProps) => {
  return (
    <div className="post-image">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}>
        <div className="masonry-grid-image mgi-el-5-more">
          <div className="mgi-el-item">
            <a
              data-fancybox="post3"
              data-lightbox-type="comments"
              data-thumb="assets/img/demo/unsplash/4.jpg"
              href="https://via.placeholder.com/1600x900"
              data-demo-href="assets/img/demo/unsplash/4.jpg">
              <Image
                src="https://via.placeholder.com/1600x900"
                data-demo-src="assets/img/demo/unsplash/4.jpg"
                alt=""
                width={1600}
                height={900}
              />
            </a>
          </div>
          <div className="mgi-el-item">
            <a
              data-fancybox="post3"
              data-lightbox-type="comments"
              data-thumb="assets/img/demo/unsplash/4.jpg"
              href="https://via.placeholder.com/1600x900"
              data-demo-href="assets/img/demo/unsplash/4.jpg">
              <Image
                src="https://via.placeholder.com/1600x1200"
                data-demo-src="assets/img/demo/unsplash/4.jpg"
                alt=""
                width={1600}
                height={900}
              />
            </a>
          </div>
          <div className="mgi-el-item">
            <a
              data-fancybox="post3"
              data-lightbox-type="comments"
              data-thumb="assets/img/demo/unsplash/4.jpg"
              href="https://via.placeholder.com/1600x1200"
              data-demo-href="assets/img/demo/unsplash/4.jpg">
              <Image
                src="https://via.placeholder.com/1600x1200"
                data-demo-src="assets/img/demo/unsplash/4.jpg"
                alt=""
                width={1600}
                height={900}
              />
            </a>
          </div>
          <div className="mgi-el-item">
            <a
              data-fancybox="post3"
              data-lightbox-type="comments"
              data-thumb="assets/img/demo/unsplash/4.jpg"
              href="https://via.placeholder.com/1600x1200"
              data-demo-href="assets/img/demo/unsplash/4.jpg">
              <Image
                src="https://via.placeholder.com/1600x1200"
                data-demo-src="assets/img/demo/unsplash/4.jpg"
                alt=""
                width={1600}
                height={900}
              />
            </a>
          </div>
          <div className="mgi-el-item">
            <a
              data-fancybox="post3"
              data-lightbox-type="comments"
              data-thumb="assets/img/demo/unsplash/4.jpg"
              href="https://via.placeholder.com/1600x1200"
              data-demo-href="assets/img/demo/unsplash/4.jpg">
              <div className="mgi-el-item-overlay">+10</div>
              <Image
                src="https://via.placeholder.com/1600x1200"
                data-demo-src="assets/img/demo/unsplash/4.jpg"
                alt=""
                width={1600}
                height={900}
              />
            </a>
          </div>
          <div className="mgi-el-item">
            <a
              data-fancybox="post3"
              data-lightbox-type="comments"
              data-thumb="assets/img/demo/unsplash/4.jpg"
              href="https://via.placeholder.com/1600x1200"
              data-demo-href="assets/img/demo/unsplash/4.jpg">
              <Image
                src="https://via.placeholder.com/1600x1200"
                data-demo-src="assets/img/demo/unsplash/4.jpg"
                alt=""
                width={1600}
                height={900}
              />
            </a>
          </div>
          <div className="mgi-el-item">
            <a
              data-fancybox="post3"
              data-lightbox-type="comments"
              data-thumb="assets/img/demo/unsplash/4.jpg"
              href="https://via.placeholder.com/1600x1200"
              data-demo-href="assets/img/demo/unsplash/4.jpg">
              <Image
                src="https://via.placeholder.com/1600x1200"
                data-demo-src="assets/img/demo/unsplash/4.jpg"
                alt=""
                width={1600}
                height={900}
              />
            </a>
          </div>
        </div>
      </Fancybox>
      {postAction !== undefined && postAction}
    </div>
  );
};

export default CardPostImage;
