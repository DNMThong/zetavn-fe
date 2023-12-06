"use client";
import useClickOutside from "@/hooks/useClickOutside";
import {
  addPostNotification,
  setPostNotification,
} from "@/redux/features/auth/auth.slice";
import {
  useLazyGetFriendRequestQuery,
  useLazyGetPostNotificationsQuery,
  useUpdateReadPostNotificationMutation,
} from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useMemo, useState } from "react";
import {
  FiBell,
  FiHeart,
  FiImage,
  FiMessageSquare,
  FiYoutube,
} from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import { DropdowmItemPlaceload } from "../placeloads";
import { CardNotification } from "../card";
import { PostNotification } from "@/types/post.type";

const NotificationsDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const user = useAppSelector((selector) => selector.auth.user);
  const postNotification = useAppSelector(
    (selector) => selector.auth.postNotification
  );

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [getPostNotifications] = useLazyGetPostNotificationsQuery();
  const [updateReadPostNotification] = useUpdateReadPostNotificationMutation();
  const [isRead, setIsRead] = useState(true);

  // const postNotificationUnread = useMemo<PostNotification[]>(() => {
  //   return postNotification.filter((item) => !item.isRead);
  // }, [postNotification, isRead]);

  useEffect(() => {
    const index = postNotification.findIndex((item) => !item.isRead);
    setIsRead(index < 0);
  }, [postNotification]);

  useEffect(() => {
    const fetchUpdateReadPostNotification = async () => {
      const response = await updateReadPostNotification({
        ids: postNotification
          .filter((item) => !item.isRead)
          .map((item) => item.id),
      }).unwrap();
      if (response.code === 200) setIsRead(true);
    };
    if (show) {
      fetchUpdateReadPostNotification();
    }
  }, [show, postNotification, updateReadPostNotification]);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      const response = await getPostNotifications({
        pageNumber: page,
        pageSize: 10,
      }).unwrap();
      if (response.code === 200) {
        const { data } = response;
        if (page === 0) {
          dispatch(setPostNotification(data.data));
        } else {
          dispatch(addPostNotification(data.data));
        }

        if (data.lastPage) setHasMore(false);
      }
    };
    fetchFriendRequest();
    // if (show) {
    //   fetchFriendRequest();
    // }
  }, [page, dispatch, getPostNotifications, user, show]);

  return (
    <div className="navbar-item is-icon drop-trigger" ref={nodeRefParent}>
      <button
        onClick={() => setShow((prev) => !prev)}
        className={`icon-link ${isRead ? "" : "is-active"}`}>
        <FiBell />
        <span className="indicator"></span>
      </button>

      <div className={`nav-drop ${show ? "is-active" : ""}`} ref={nodeRefChild}>
        <div className="inner">
          <div className="nav-drop-header">
            <span>Notifications</span>
            <a href="#">
              <FiBell />
            </a>
          </div>
          <div id="notifications-scroll">
            <InfiniteScroll
              className="nav-drop-body is-notifications"
              height={postNotification.length >= 10 ? 420 : "auto"}
              loader={<DropdowmItemPlaceload />}
              hasMore={hasMore}
              next={() => setPage((prev) => prev + 1)}
              dataLength={postNotification.length}
              scrollableTarget="notifications-scroll">
              {postNotification.map((item) => (
                <CardNotification data={item} key={item.id + item.createdAt} />
              ))}
            </InfiniteScroll>
          </div>

          {/* <div className="nav-drop-footer">
            <a href="#">View All</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
