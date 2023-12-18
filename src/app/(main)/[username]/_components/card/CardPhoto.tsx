import Post from "@/types/post.type";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";

interface CardPhotoProps {
   path: string;
}

const CardPhoto = ({ path }: CardPhotoProps) => {
   return (
        <div className="photo-wrapper">
            <div className="photo-overlay"></div>
            <div className="small-like">
               <div className="inner">
                  <div className="like-overlay"></div>
                  <FiHeart></FiHeart>
               </div>
            </div>
            <img
               src={path}
               style={{
                  height: "144px",
                  width: "100%",
               }}
               alt="img"
            />
         </div>
   );
};

export default CardPhoto;
