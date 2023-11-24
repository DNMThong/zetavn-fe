import Post from "@/types/post.type";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";

interface CardPhotoProps {
   post: Post;
}

const CardPhoto = ({ post }: CardPhotoProps) => {
   const { id, medias } = post;
   return (
      <>
         {medias &&
            medias.length > 0 &&
            medias.map((m, index) => {
               if (m.mediaType === "video") return null;
               return (
                  <div
                     key={index}
                     className="photo-wrapper"
                     onClick={() => console.log(id)}
                  >
                     <div className="photo-overlay"></div>
                     <div className="small-like">
                        <div className="inner">
                           <div className="like-overlay"></div>
                           <FiHeart></FiHeart>
                        </div>
                     </div>
                     <Image
                        src={m?.mediaPath}
                        width={144}
                        height={144}
                        style={{
                           height: "144px",
                           width: "100%",
                        }}
                        alt="Image"
                     />
                  </div>
               );
            })}
      </>
   );
};

export default CardPhoto;
