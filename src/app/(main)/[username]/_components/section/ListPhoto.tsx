import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import Post, { Media } from "@/types/post.type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiImage, FiUploadCloud, FiUser, FiUsers } from "react-icons/fi";
import { CardPhoto } from "../card";
import { MediaType } from "@/types/contants.type";
import Link from "next/link";

interface ListPhotoProps {
  userId: string;
}

const ListPhoto = ({ userId }: ListPhotoProps) => {
  const { username } = useParams();
  const [medias, setMedias] = useState<Media[]>([]);
  const [getMediaPost] = useLazyGetPostMediaByUserIdQuery();
  useEffect(() => {
    async function fetchData() {
      const { data }: any = await getMediaPost({
        userId,
        type: MediaType.IMAGE,
        pageSize: 5,
        pageNumber: 0,
      }).unwrap();
      if (data?.data) {
        setMedias(data?.data);
      }
    }
    fetchData();
  }, [username]);

  return (
    <div className="about-card">
      {/* <!-- Header --> */}
      <div className="header">
        <div className="icon-title">
          <i className="mdi mdi-camera"></i>
          <h3>Ảnh</h3>
        </div>
        <div className="actions">
          <div className="button-wrapper">
            <Link href={`/${username}/photos`} className="button">
              Bộ sưu tập
            </Link>
          </div>
          {/* <!-- Dropdown --> */}
          <WidgetDropdown wclassName=" is-accent is-right">
            <DropdownItem
              title="Ảnh của bạn"
              subTitle="Xem tất cả ảnh của bạn.">
              <FiUser></FiUser>
            </DropdownItem>
            <DropdownItem title="Ảnh có bạn" subTitle="Xem tất cả ảnh có bạn.">
              <FiUsers></FiUsers>
            </DropdownItem>
            <hr className="dropdown-divider" />
            <DropdownItem title="Tải ảnh lên" subTitle="Tải ảnh từ thiết bị.">
              <FiUploadCloud></FiUploadCloud>
            </DropdownItem>
            <hr className="dropdown-divider" />
            <DropdownItem
              title="Xem tất cả"
              subTitle="Xem tất cả ảnh."
              href={`/${username}/photos`}>
              <FiImage></FiImage>
            </DropdownItem>
          </WidgetDropdown>
          <div className="dropdown is-spaced is-accent is-right dropdown-trigger">
            <div className="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <hr className="dropdown-divider" />
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <div className="media">
                    <i data-feather="image"></i>
                    <div className="media-content">
                      <h3>Xem tất cả</h3>
                      <small>Xem tất cả ảnh.</small>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body has-flex-list">
        {/* <!-- Photos --> */}
        <div className="photo-list">
          {/* <!-- Photo item --> */}
          {medias &&
            medias.length > 0 &&
            medias.map((m, index) => (
              <CardPhoto key={`${index}_image`} path={m.mediaPath}></CardPhoto>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListPhoto;
