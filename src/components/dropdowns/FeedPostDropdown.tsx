"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { removePostNewsfeed } from "@/redux/features/auth/auth.slice";
import { useRemovePostMutation } from "@/redux/features/post/post.service";
import { removePostsProfile } from "@/redux/features/post/post.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import {
  FiBell,
  FiBookmark,
  FiDelete,
  FiEdit3,
  FiFlag,
  FiMoreVertical,
} from "react-icons/fi";
import Swal from "sweetalert2";

interface FeedPostDropdownProps {
  userId: string;
  postId: string;
}

const FeedPostDropdown = ({ userId, postId }: FeedPostDropdownProps) => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const user = useAppSelector((selector) => selector.auth.user);
  const [removePosts] = useRemovePostMutation();
  const dispatch = useAppDispatch();

  const handleRemovePost = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa bài viết này?",
      text: "Khi xóa xong sẽ không thể hoàn tác được",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(postId);
        removePosts(postId)
          .unwrap()
          .then((response) => {
            if (response.code === 200) {
              dispatch(removePostNewsfeed(postId));
              dispatch(removePostsProfile(postId));
              Swal.fire({
                title: "Đã xóa!",
                text: "Bài viết đã được xóa",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Xóa thất bại!",
                text: "Đã có lỗi xảy ra vui lòng thử lại",
                icon: "error",
              });
            }
          });
      }
    });
  };

  return (
    <div
      className={`dropdown is-spaced is-right is-neutral dropdown-trigger ${
        show ? "is-active" : ""
      }`}>
      <div>
        <div
          className="button"
          onClick={() => setShow((prev) => !prev)}
          ref={nodeRefParent}>
          <FiMoreVertical />
        </div>
      </div>
      <div className="dropdown-menu" role="menu" ref={nodeRefChild}>
        {user?.id === userId && (
          <div className="dropdown-content">
            <a className="dropdown-item">
              <div className="media">
                <FiEdit3 />
                <div className="media-content">
                  <h3>Chỉnh sửa</h3>
                  <small>Chỉnh sửa bài viết của bạn</small>
                </div>
              </div>
            </a>
            <a className="dropdown-item" onClick={handleRemovePost}>
              <div className="media">
                <FiDelete />
                <div className="media-content">
                  <h3>Xóa</h3>
                  <small>Xóa bài viết của bạn</small>
                </div>
              </div>
            </a>
          </div>
        )}

        {user?.id !== userId && (
          <div className="dropdown-content">
            <a className="dropdown-item">
              <div className="media">
                <FiBookmark />
                <div className="media-content">
                  <h3>Lưu bài viết</h3>
                  <small>
                    Thêm bài đăng này vào danh sách lưu trữ của bạn.
                  </small>
                </div>
              </div>
            </a>
            <a className="dropdown-item">
              <div className="media">
                <FiBell />
                <div className="media-content">
                  <h3>Bật thông báo</h3>
                  <small>Gửi các thông báo mới nhất của bài viết.</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a className="dropdown-item">
              <div className="media">
                <FiFlag />
                <div className="media-content">
                  <h3>Báo cáo</h3>
                  <small>Trong trường hợp nội dung không phù hợp.</small>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPostDropdown;
