"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { FiFilter } from "react-icons/fi";

const ExplorerMenu = () => {
  const openExplorerMenu = useAppSelector(
    (selector) => selector.global.openExplorerMenu
  );
  return (
    <div className={`explorer-menu ${openExplorerMenu ? "is-active" : ""}`}>
      <div className="explorer-inner">
        <div className="explorer-container">
          {/* <!--Header--> */}
          <div className="explorer-header">
            <h3>Explore</h3>
            <div className="control">
              <input
                type="text"
                className="input is-rounded is-fade"
                placeholder="Filter"
              />
              <div className="form-icon">
                <FiFilter />
              </div>
            </div>
          </div>
          {/* <!--List--> */}
          <div className="explore-list has-slimscroll">
            {/* <!--item--> */}
            <a href="/navbar-v1-feed.html" className="explore-item">
              <img src="img/icons/explore/clover.svg" alt="" />
              <h4>Feed</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-profile-friends.html" className="explore-item">
              <img src="img/icons/explore/friends.svg" alt="" />
              <h4>Friends</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-videos-home.html" className="explore-item">
              <img src="img/icons/explore/videos.svg" alt="" />
              <h4>Videos</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-pages-main.html" className="explore-item">
              <img src="img/icons/explore/tag-euro.svg" alt="" />
              <h4>Pages</h4>
            </a>
            {/* <!--item--> */}
            <a
              href="/navbar-v1-ecommerce-products.html"
              className="explore-item">
              <img src="img/icons/explore/cart.svg" alt="" />
              <h4>Commerce</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-groups.html" className="explore-item">
              <img src="img/icons/explore/house.svg" alt="" />
              <h4>Interests</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-stories-main.html" className="explore-item">
              <img src="img/icons/explore/chrono.svg" alt="" />
              <h4>Stories</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-questions-home.html" className="explore-item">
              <img src="img/icons/explore/question.svg" alt="" />
              <h4>Questions</h4>
            </a>
            {/* <!--item--> */}
            <a href="news.html" className="explore-item">
              <img src="img/icons/explore/news.svg" alt="" />
              <h4>News</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-groups.html" className="explore-item">
              <img src="img/icons/explore/cake.svg" alt="" />
              <h4>Groups</h4>
            </a>
            {/* <!--item--> */}
            <a href="https://envato.com" className="explore-item">
              <img src="img/icons/explore/envato.svg" alt="" />
              <h4>Envato</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-events.html" className="explore-item">
              <img src="img/icons/explore/calendar.svg" alt="" />
              <h4>Events</h4>
            </a>
            {/* <!--item--> */}
            <a
              href="https://cssninja.io"
              target="_blank"
              className="explore-item">
              <img src="img/icons/explore/pin.svg" alt="" />
              <h4>Css Ninja</h4>
            </a>
            {/* <!--item--> */}
            <a href="/elements.html" className="explore-item">
              <img src="img/icons/explore/idea.svg" alt="" />
              <h4>Elements</h4>
            </a>
            {/* <!--item--> */}
            <a href="/navbar-v1-settings.html" className="explore-item">
              <img src="img/icons/explore/settings.svg" alt="" />
              <h4>Settings</h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerMenu;
