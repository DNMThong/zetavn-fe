"use client";
import React, { useState } from "react";
import {
  FriendRequestsDropdown,
  MessagesDropdown,
  NotificationsDropdown,
} from "@/components/dropdowns";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenChat, toggleExplorerMenu } from "@/redux/features/global.slice";
import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";
import {
  FiActivity,
  FiBookmark,
  FiHeart,
  FiLifeBuoy,
  FiLogOut,
  FiPlayCircle,
  FiSearch,
  FiSettings,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";

const MobileNavbar = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useAppDispatch();

  const handleTriggerExplorer = () => {
    dispatch(toggleExplorerMenu());
  };
  return (
    <nav
      className="navbar mobile-navbar is-hidden-desktop"
      aria-label="main navigation">
      {/* Brand */}
      <div className={`navbar-brand ${openSearch && "is-hidden"}`}>
        <a className="navbar-item" href="/">
          <img
            className="light-image"
            src="img/vector/logo/friendkit-bold.svg"
            alt=""
          />
          <img
            className="dark-image"
            src="img/vector/logo/friendkit-white.svg"
            alt=""
          />
        </a>
        <>
          <FriendRequestsDropdown />
          <NotificationsDropdown />
          <MessagesDropdown />
        </>
        <div
          id="mobile-explorer-trigger"
          className="navbar-item is-icon"
          onClick={handleTriggerExplorer}>
          <button className="icon-link is-primary">
            <i className="mdi mdi-apps"></i>
          </button>
        </div>
        <div
          id="open-mobile-search"
          className="navbar-item is-icon"
          onClick={() => setOpenSearch(true)}>
          <button className="icon-link is-primary">
            <FiSearch />
          </button>
        </div>
        {/* Mobile menu toggler icon */}
        <div
          className="navbar-burger"
          onClick={() => setShow((prev) => !prev)}
          ref={nodeRefParent}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/* Navbar mobile menu  */}
      <div
        className={`navbar-menu ${show ? "is-active" : ""} ${
          openSearch && "is-hidden"
        }`}
        ref={nodeRefChild}>
        {/* Account */}
        <div className="navbar-item has-dropdown is-active">
          <Link href="/navbar-v1-profile-main.html" className="navbar-link">
            <img
              src="https://via.placeholder.com/150x150"
              data-demo-src="img/avatars/jenna.png"
              alt=""
            />
            <span className="is-heading">Jenna Davis</span>
          </Link>

          {/* Mobile Dropdown */}
          <div className="navbar-dropdown">
            <a
              href="/navbar-v1-feed.html"
              className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiActivity />
                Feed
              </span>
              <span className="menu-badge">87</span>
            </a>
            <a
              href="/navbar-v1-videos-home-v2.html"
              className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiPlayCircle />
                Watch
              </span>
              <span className="menu-badge">21</span>
            </a>
            <a
              href="/navbar-v1-profile-friends.html"
              className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiHeart />
                Friend Requests
              </span>
              <span className="menu-badge">3</span>
            </a>
            <a
              href="/navbar-v1-profile-main.html"
              className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiUser />
                Profile
              </span>
            </a>
            <a
              href="/navbar-v1-ecommerce-cart.html"
              className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiShoppingCart />
                Cart
              </span>
              <span className="menu-badge">3</span>
            </a>
            <a href="#" className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiBookmark />
                Bookmarks
              </span>
            </a>
          </div>
        </div>

        {/* More */}
        <div className="navbar-item has-dropdown">
          <Link href="/navbar-v1-settings.html" className="navbar-link">
            <FiUser />
            <span className="is-heading">Account</span>
          </Link>

          {/* Mobile Dropdown  */}
          <div className="navbar-dropdown">
            <a href="#" className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiLifeBuoy />
                Support
              </span>
            </a>
            <a
              href="/navbar-v1-settings.html"
              className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiSettings />
                Settings
              </span>
            </a>
            <a href="#" className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiLogOut />
                Logout
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* Search */}
      <div className={`mobile-search ${!openSearch && "is-hidden"}`}>
        <div className="control">
          <input
            id="tipue_drop_input_mobile"
            className="input"
            placeholder="Search..."
          />
          <div className="form-icon">
            <FiSearch />
          </div>
          <div className="close-icon" onClick={() => setOpenSearch(false)}>
            <FiX />
          </div>
          <div
            id="tipue_drop_content_mobile"
            className="tipue-drop-content"></div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
