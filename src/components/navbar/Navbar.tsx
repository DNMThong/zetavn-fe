"use client";
import React from "react";
import Image from "next/image";
import SearchWidget from "./SearchWidget";
import { useAppDispatch } from "./../../redux/hooks";
import {
  AccountDropdown,
  FriendRequestsDropdown,
  MessagesDropdown,
  NotificationsDropdown,
} from "../dropdowns";
import { toggleExplorerMenu } from "@/redux/features/global.slice";
import { FiMessageSquare } from "react-icons/fi";
import Link from "next/link";
import { setOpenChat } from "@/redux/features/chat/chat.slice";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const handleOpenChat = () => {
    dispatch(setOpenChat(true));
  };

  const handleTriggerExplorer = () => {
    dispatch(toggleExplorerMenu());
  };

  return (
    <div
      id="main-navbar"
      className="navbar navbar-v1 is-inline-flex is-transparent no-shadow is-hidden-mobile">
      <div className="container is-fluid">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item">
            <Image
              className="logo light-image"
              src="img/vector/logo/logo.svg"
              width="112"
              height="28"
              alt=""
            />
            <Image
              className="logo dark-image"
              src="img/vector/logo/logo-white.svg"
              width="112"
              height="28"
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            {/* <!-- Navbar Search --> */}

            <FriendRequestsDropdown />
            <NotificationsDropdown />
            {/* <MessagesDropdown /> */}

            <div
              className="navbar-item is-icon open-chat"
              onClick={handleOpenChat}>
              <button className="icon-link is-primary">
                <FiMessageSquare />
                <span className="indicator"></span>
              </button>
            </div>

            {/* <div
              id="explorer-trigger"
              className="navbar-item is-icon"
              onClick={handleTriggerExplorer}>
              <button className="icon-link is-primary">
                <i className="mdi mdi-apps"></i>
              </button>
            </div> */}
          </div>

          <div className="navbar-end">
            <SearchWidget classNameWapper="navbar-item"></SearchWidget>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
