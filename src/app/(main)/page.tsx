"use client";
import { CardPost } from "@/components/card";
import ComposeCard from "@/components/card/card-compose/CardCompose";
import {
  RecommendedPagesWidget,
  SuggestedFriendsWidget,
} from "@/components/widgets";
import { useGetUsersQuery } from "@/redux/features/user/user.service";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Home() {
  const { data } = useGetUsersQuery();

  console.log("Data", data);

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
              <CardPost />
              <CardPost />
              <CardPost />
              {/* <!-- Publishing Area -->
        <!-- /partials/pages/feed/compose-card.html -->
        {{> compose-card}}

        <!-- Post 1 -->
        <!-- /partials/pages/feed/posts/feed-post1.html -->
        {{> feed-post1}}

        <!-- Post 2 -->
        <!-- /partials/pages/feed/posts/feed-post2.html -->
        {{> feed-post2}}

        <!-- Post 3 -->
        <!-- /partials/pages/feed/posts/feed-post3.html -->
        {{> feed-post3}}

        <!-- Post 4 -->
        <!-- /partials/pages/feed/posts/feed-post4.html -->
        {{> feed-post4}}

        <!-- Post 5 -->
        <!-- /partials/pages/feed/posts/feed-post5.html -->
        {{> feed-post5}}

        <!-- Post 6 -->
        <!-- /partials/pages/feed/posts/feed-post6.html -->
        {{> feed-post6}} */}

              {/* <!-- Load more posts --> */}
              <div className="load-more-wrap narrow-top has-text-centered">
                <a href="#" className="load-more-button">
                  Load More
                </a>
              </div>
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
