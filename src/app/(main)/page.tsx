"use client";
import { CardPost } from "@/components/card";
import ComposeCard from "@/components/card/card-compose/CardCompose";
import {
  RecommendedPagesWidget,
  SuggestedFriendsWidget,
} from "@/components/widgets";
import { addNewsfeed } from "@/redux/features/auth/auth.slice";
import {
  useGetPostsByUserIdQuery,
  useLazyGetPostsNewsFeedQuery,
} from "@/redux/features/post/post.service";
import { useGetUsersQuery } from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPlaceload from "@/components/placeloads/PostPlaceload";
import { IncomingCallModal } from "@/components/modals";

export default function Home() {
  const { user, newsfeed } = useAppSelector((selector) => selector.auth);
  const dispatch = useAppDispatch();
  // const { data } = useGetPostsByUserIdQuery(user?.id || "");
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
        dispatch(addNewsfeed(data.data));
        if (data.lastPage) setHasMore(false);
      }
    };
    fetchData();
  }, [user, fetchPostsNewsFeed, page, dispatch]);

  return (
    <>
      <div id="main-feed" className="container">
        {/* <!-- Content placeholders at page load -->
  {{> feed-shadow-dom}} */}

        {/* <!-- Feed page main wrapper --> */}
        <div id="activity-feed" className="view-wrap true-dom">
          <div className="columns">
            {/* <!-- Left side column --> */}
            <div className="column is-3 is-hidden-mobile">
              <RecommendedPagesWidget />
            </div>
            {/* <!-- /Left side column --> */}

            {/* <!-- Middle column --> */}
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

              {/* <!-- Load more posts --> */}
              {/* <div className="load-more-wrap narrow-top has-text-centered">
                <a href="#" className="load-more-button">
                  Load More
                </a>
              </div> */}
              {/* <!-- /Load more posts --> */}
            </div>
            {/* <!-- /Middle column --> */}

            {/* <!-- Right side column --> */}
            <div className="column is-3">
              <SuggestedFriendsWidget />
            </div>
            {/* <!-- /Right side column --> */}
          </div>
        </div>
        {/* <!-- /Feed page main wrapper --> */}
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
