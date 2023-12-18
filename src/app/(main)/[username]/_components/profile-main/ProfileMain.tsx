"use client";
import { PageLoader } from "@/components/pageloader";
import {
  useGetPostsByUserIdQuery,
  useLazyGetPostsByUserIdQuery,
} from "@/redux/features/post/post.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState, useEffect } from "react";
import TopPart from "../profile-part/TopPart";
import {
  BasicInfoWidget,
  PhotosWidget,
  StarFriendsWidget,
  VideosWidget,
} from "@/components/widgets";
import Post, { PostNewsfeed } from "@/types/post.type";
import { UserProfile } from "@/types/user.type";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPlaceload from "@/components/placeloads/PostPlaceload";
import { CardPost } from "@/components/card";
import { ImageDefault } from "@/types/contants.type";
import Image from "next/image";
import PostProfilePlaceload from "@/components/placeloads/PostProfilePlaceload";
import {
  addPostsProfile,
  setPostsProfile,
} from "@/redux/features/post/post.slice";

enum ActiveFilter {
  RECENT = "recent",
  POPULAR = "popular",
}

interface ProfileContentProps {
  userProfile: UserProfile;
}

const ProfileMain = ({ userProfile }: ProfileContentProps) => {
  const user = useAppSelector((selector) => selector.auth.user);
  const isSelfProfile: boolean =
    !!user &&
    (user.id === userProfile.username ||
      user.username === userProfile.username);
  const posts = useAppSelector((selector) => selector.post.postsProfile);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(
    ActiveFilter.RECENT
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [getPosts] = useLazyGetPostsByUserIdQuery();

  useEffect(() => {
    document.title = `${userProfile.display} | Zetavn`;
  }, []);
  useEffect(() => {
    const fetchGetPosts = async () => {
      const response = await getPosts({
        userId: userProfile.id,
        pageSize: 2,
        pageNumber: page,
      }).unwrap();
      if (response.code === 200) {
        const { data } = response;
        if (page === 0) {
          dispatch(setPostsProfile(data.data));
        } else {
          dispatch(addPostsProfile(data.data));
        }
        if (data.lastPage) setHasMore(false);
      }
    };
    fetchGetPosts();
  }, [page, userProfile, getPosts]);

  useEffect(() => {
    return () => {
      dispatch(setPostsProfile([]));
    };
  }, []);

  return (
    <div className="container is-custom">
      <div id="profile-main" className="view-wrap is-headless">
        <TopPart isSelfProfile={isSelfProfile} userProfile={userProfile} />
        <div className="columns">
          <div id="profile-timeline-widgets" className="column is-4">
            <BasicInfoWidget userProfile={userProfile} />
            <PhotosWidget userId={userProfile.id} />
            <StarFriendsWidget
              userId={userProfile.id}
              isSelfProfile={!!isSelfProfile}
            />
            <VideosWidget userId={userProfile.id} />
          </div>

          <div className="column is-8">
            <div id="profile-timeline-posts" className="box-heading">
              <h4>Bài đăng</h4>
              <div className="button-wrap">
                <button
                  type="button"
                  className={`button ${
                    activeFilter === ActiveFilter.RECENT ? "is-active" : ""
                  } `}>
                  Mới nhất
                </button>
                <button
                  type="button"
                  className={`button ${
                    activeFilter === ActiveFilter.POPULAR ? "is-active" : ""
                  } `}>
                  Phổ biến
                </button>
              </div>
            </div>
            <div className="profile-timeline">
              <InfiniteScroll
                loader={<PostProfilePlaceload />}
                hasMore={hasMore}
                next={() => setPage((prev) => prev + 1)}
                dataLength={posts.length}>
                {posts.map((post) => (
                  <div className="profile-post" key={post.id}>
                    <div className="time is-hidden-mobile">
                      <div className="img-container">
                        <img
                          src={post.user.avatar || ImageDefault.AVATAR}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <CardPost key={post.id} data={post} />
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
