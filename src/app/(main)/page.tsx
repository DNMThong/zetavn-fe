"use client";
import { CardPost } from "@/components/card";
import ComposeCard from "@/components/card/card-compose/CardCompose";
import {
  RecommendedPagesWidget,
  SuggestedFriendsWidget,
} from "@/components/widgets";
import { addNewsfeed, setNewsfeed } from "@/redux/features/auth/auth.slice";
import { useLazyGetPostsNewsFeedQuery } from "@/redux/features/post/post.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPlaceload from "@/components/placeloads/PostPlaceload";

export default function Home() {
  const { user, newsfeed } = useAppSelector((selector) => selector.auth);
  const dispatch = useAppDispatch();
  const [fetchPostsNewsFeed] = useLazyGetPostsNewsFeedQuery();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPostsNewsFeed({
        pageNumber: page,
        pageSize: 5,
      }).unwrap();
      if (response.code === 200) {
        const { data } = response;
        if (page === 0) {
          dispatch(setNewsfeed(data.data));
        } else {
          dispatch(addNewsfeed(data.data));
        }
        if (data.lastPage) setHasMore(false);
      }
    };
    fetchData();
  }, [user, fetchPostsNewsFeed, page, dispatch]);

  return (
    <>
      <div id="main-feed" className="container">
        {/* <!-- Feed page main wrapper --> */}
        <div id="activity-feed" className="view-wrap true-dom">
          <div className="columns">
            <div className="column is-3 is-hidden-mobile">
              {/* <RecommendedPagesWidget /> */}
              <SuggestedFriendsWidget page={0} />
            </div>
            <div className="column is-6">
              <ComposeCard />
              <InfiniteScroll
                loader={<PostPlaceload />}
                hasMore={hasMore}
                next={() => setPage((prev) => prev + 1)}
                dataLength={newsfeed.length}>
                {newsfeed.map((post) => (
                  <CardPost key={post.id} data={post} />
                ))}
              </InfiniteScroll>
            </div>

            <div className="column is-3">
              <SuggestedFriendsWidget page={1} />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Container -->

<!-- Create group modal in compose card -->
<!-- /partials/pages/feed/modals/create-group-modal.html -->
{{> create-group-modal}}

<!-- Albums onboarding modal -->
<!-- /partials/pages/feed/modals/albums-help-modal.html -->
{{> albums-help-modal}}

<!-- Album upload modal -->
<!-- /partials/pages/feed/modals/albums-modal.html -->
{{> albums-modal}}

<!-- Live video onboarding modal -->
<!-- /partials/pages/feed/modals/videos-help-modal.html -->
{{> videos-help-modal}}

<!-- Live video modal -->
<!-- /partials/pages/feed/modals/videos-modal.html -->
{{> videos-modal}}

<!-- Share from feed modal -->
<!-- /partials/pages/feed/modals/share-modal.html -->
{{> share-modal}}

<!-- No Stream modal -->
<!-- /partials/pages/feed/modals/no-stream-modal.html -->
{{> no-stream-modal}} */}
      <div id="share-modal-container"></div>
    </>
  );
}
