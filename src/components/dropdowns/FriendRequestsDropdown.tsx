"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { useState } from "react";
import {
  FiHeart,
  FiSearch,
  FiTag,
  FiUserMinus,
  FiUserPlus,
} from "react-icons/fi";

const FriendRequestsDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();

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
            <span>Friend requests</span>
            <a>
              <FiSearch />
            </a>
          </div>
          <div className="nav-drop-body is-friend-requests">
            {/* <!-- Friend request --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/bobby.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <a href="#">Bobby Brown</a>
                <span>Najeel verwick is a common friend</span>
              </div>
              <div className="media-right">
                <button className="button icon-button is-solid grey-button raised">
                  <FiUserPlus />
                </button>
                <button className="button icon-button is-solid grey-button raised">
                  <FiUserMinus />
                </button>
              </div>
            </div>
            {/* <!-- Friend request --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/dan.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <a href="#">Dan Walker</a>
                <span>You have 4 common friends</span>
              </div>
              <div className="media-right">
                <button className="button icon-button is-solid grey-button raised">
                  <FiUserPlus />
                </button>
                <button className="button icon-button is-solid grey-button raised">
                  <FiUserMinus />
                </button>
              </div>
            </div>
            {/* <!-- Friend request --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/nelly.png"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <span>
                  You are now friends with <a href="#">Nelly Schwartz</a>. Check
                  her <a href="#">profile</a>.
                </span>
              </div>
              <div className="media-right">
                <div className="added-icon">
                  <FiTag />
                </div>
              </div>
            </div>
            {/* <!-- Friend request --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/milly.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <a href="#">Milly Augustine</a>
                <span>You have 8 common friends</span>
              </div>
              <div className="media-right">
                <button className="button icon-button is-solid grey-button raised">
                  <FiUserPlus />
                </button>
                <button className="button icon-button is-solid grey-button raised">
                  <FiUserMinus />
                </button>
              </div>
            </div>
            {/* <!-- Friend request --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/elise.jpg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <span>
                  You are now friends with <a href="#">Elise Walker</a>. Check
                  her
                  <a href="#">profile</a>.
                </span>
              </div>
              <div className="media-right">
                <div className="added-icon">
                  <FiTag />
                </div>
              </div>
            </div>
            {/* <!-- Friend request --> */}
            <div className="media">
              <figure className="media-left">
                <p className="image">
                  <img
                    src="https://via.placeholder.com/300x300"
                    data-demo-src="/img/avatars/edward.jpeg"
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <span>
                  You are now friends with <a href="#">Edward Mayers</a>. Check
                  his
                  <a href="#">profile</a>.
                </span>
              </div>
              <div className="media-right">
                <div className="added-icon">
                  <FiTag />
                </div>
              </div>
            </div>
          </div>
          <div className="nav-drop-footer">
            <a href="#">View All</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsDropdown;
