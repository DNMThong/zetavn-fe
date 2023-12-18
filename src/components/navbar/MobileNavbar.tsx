"use client";
import React, { useState } from "react";
import {
  FriendRequestsDropdown,
  MessagesDropdown,
  NotificationsDropdown,
} from "@/components/dropdowns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleExplorerMenu } from "@/redux/features/global.slice";
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
  FiMessageSquare,
} from "react-icons/fi";
import { logout } from "@/redux/features/auth/auth.slice";
import { SearchWidget } from ".";
import { setOpenChat } from "@/redux/features/chat/chat.slice";
import { ImageDefault, SettingsTab } from "@/types/contants.type";
import { useRouter } from "next/navigation";

const MobileNavbar = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((selector) => selector.auth.user);
  const router = useRouter();

  const handleOpenChat = () => {
    dispatch(setOpenChat(true));
  };

  const handleTriggerExplorer = () => {
    dispatch(toggleExplorerMenu());
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleClickProfile = () => {
    router.push(`/${user?.username}`);
    setShow(false);
  };

  const handleClickSetting = () => {
    router.push(`/settings?tab=${SettingsTab.GENERAL}`);
    setShow(false);
  };

  return (
    <nav
      className="navbar mobile-navbar is-hidden-desktop"
      aria-label="main navigation">
      {/* Brand */}
      <div className={`navbar-brand ${openSearch && "is-hidden"}`}>
        <Link className="navbar-item" href="/">
          <img className="light-image" src="/img/vector/logo/logo.svg" alt="" />
          <img
            className="dark-image"
            src="/img/vector/logo/logo-white.svg"
            alt=""
          />
        </Link>
        <>
          <FriendRequestsDropdown />
          <NotificationsDropdown />
          {/* <MessagesDropdown /> */}
        </>
        <div className="navbar-item is-icon open-chat" onClick={handleOpenChat}>
          <button className="icon-link is-primary">
            <FiMessageSquare />
            <span className="indicator"></span>
          </button>
        </div>
        {/* <div
          id="mobile-explorer-trigger"
          className="navbar-item is-icon"
          onClick={handleTriggerExplorer}>
          <button className="icon-link is-primary">
            <i className="mdi mdi-apps"></i>
          </button>
        </div> */}
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
          <a onClick={handleClickProfile} className="navbar-link">
            <img src={user?.avatar || ImageDefault.AVATAR} alt="" />
            <span className="is-heading">{user?.display}</span>
          </a>

          {/* Mobile Dropdown */}
          {/* <div className="navbar-dropdown">
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
          </div> */}
        </div>

        {/* More */}
        <div className="navbar-item has-dropdown">
          {/* <Link className="navbar-link">
            <FiUser />
            <span className="is-heading">Account</span>
          </Link> */}

          {/* Mobile Dropdown  */}
          <div className="navbar-dropdown">
            <a className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiLifeBuoy />
                Hỗ trợ
              </span>
            </a>
            <a
              onClick={handleClickSetting}
              className="navbar-item is-flex is-mobile-icon">
              <span>
                <FiSettings />
                Cài đặt
              </span>
            </a>
            <a
              className="navbar-item is-flex is-mobile-icon"
              onClick={handleLogOut}>
              <span>
                <FiLogOut />
                Đăng xuất
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* Search */}
      <SearchWidget
        classNameWapper={`mobile-search ${openSearch ? "" : "is-hidden"}`}
        onClose={() => setOpenSearch(false)}
        mobile={true}
      />
      {/* <div>
        <div className="control">
          <input
            id="tipue_drop_input_mobile"
            className="input"
            placeholder="Search..."
          />
          <div className="form-icon">
            <FiSearch />
          </div>
          <div className="close-icon" onClick={}>
            <FiX />
          </div>
          <div
            id="tipue_drop_content_mobile"
            className="tipue-drop-content"></div>
        </div>
      </div> */}
    </nav>
  );
};

export default MobileNavbar;
