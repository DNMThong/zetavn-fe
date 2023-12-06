import { DropdownItem, WidgetDropdown } from "@/components/dropdowns";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import Post from "@/types/post.type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiImage, FiUploadCloud, FiUser, FiUsers } from "react-icons/fi";
import { CardPhoto } from "../card";

const ListPhoto = () => {
  const { username } = useParams();
  const [getPosts] = useLazyGetPostMediaByUserIdQuery();
  const [postMediaList, setPostMediaList] = useState<Post[]>();
  useEffect(() => {
    async function fetchPosts() {
      const { data, code }: any = await getPosts(username as string).unwrap();
      if (code === 200) {
        setPostMediaList(data?.data);
      }
    }
    fetchPosts();
  }, []);
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
            <a className="button">Bộ sưu tập</a>
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
          {postMediaList &&
            postMediaList.length > 0 &&
            postMediaList.map((p, index) => (
              <CardPhoto key={index} post={p}></CardPhoto>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListPhoto;
