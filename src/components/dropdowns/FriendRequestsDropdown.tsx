"use client";
import useClickOutside from "@/hooks/useClickOutside";
import {
  useAcceptFriendMutation,
  useGetFriendRequestQuery,
  useLazyGetFriendRequestQuery,
  useRejectFriendMutation,
} from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ImageDefault } from "@/types/contants.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, ReactNode } from "react";
import { FiHeart, FiSearch } from "react-icons/fi";
import { CardFriendRequest } from "../card";
import {
  setFriendRequest,
  addFriendRequest,
} from "@/redux/features/auth/auth.slice";
import InfiniteScroll from "react-infinite-scroll-component";
import { DropdowmItemPlaceload } from "../placeloads";

const FriendRequestsDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const user = useAppSelector((selector) => selector.auth.user);
  const friendRequest = useAppSelector(
    (selector) => selector.auth.friendRequest
  );

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [getFriendRequest] = useLazyGetFriendRequestQuery();

  useEffect(() => {
    const fetchFriendRequest = async () => {
      const response = await getFriendRequest({
        pageNumber: page,
        pageSize: 10,
      }).unwrap();
      if (response.code === 200) {
        const { data } = response;
        if (page === 0) {
          dispatch(setFriendRequest(data.data));
        } else {
          dispatch(addFriendRequest(data.data));
        }
        if (data.lastPage) setHasMore(false);
      }
    };
    if (show) {
      fetchFriendRequest();
    }
  }, [page, dispatch, getFriendRequest, user, show]);

  return (
    <div className="navbar-item is-icon drop-trigger" ref={nodeRefParent}>
      <button
        className="icon-link is-friends open-nav-drop-friends"
        id="open-nav-drop-friends"
        onClick={() => setShow((prev) => !prev)}>
        <FiHeart />
        <span className="indicator"></span>
      </button>

      <div className={`nav-drop ${show ? "is-active" : ""}`} ref={nodeRefChild}>
        <div className="inner">
          <div className="nav-drop-header">
            <span>Lời mời kết bạn</span>
            <a>
              <FiSearch />
            </a>
          </div>
          <div id="friend-requests-scroll">
            <InfiniteScroll
              className="nav-drop-body is-friend-requests"
              height={friendRequest.length >= 10 ? 420 : "auto"}
              loader={<DropdowmItemPlaceload />}
              hasMore={hasMore}
              next={() => setPage((prev) => prev + 1)}
              dataLength={friendRequest.length}
              scrollableTarget="friend-requests-scroll">
              {friendRequest.map((item, index) => (
                <CardFriendRequest data={item} key={item.user.id + index} />
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

export default FriendRequestsDropdown;
