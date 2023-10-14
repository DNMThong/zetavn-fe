"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FiCheck,
  FiLifeBuoy,
  FiMoon,
  FiPower,
  FiSettings,
  FiSun,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleChangeTheme } from "@/redux/features/global.slice";
import { logout } from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "@/utils/localstorage.util";

const AccountDropdown = () => {
  const { show, setShow, nodeRefParent, nodeRefChild } = useClickOutside();
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const { user } = useAppSelector((selector) => selector.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("is-dark");
    } else {
      document.body.classList.remove("is-dark");
    }
  }, [isDarkTheme]);

  const handleChangeTheme = () => {
    dispatch(toggleChangeTheme());
  };

  return (
    <div
      id="account-dropdown"
      className="navbar-item is-account drop-trigger has-caret"
      ref={nodeRefParent}>
      <div className="user-image" onClick={() => setShow((prev) => !prev)}>
        <img
          src={user?.avatar || "https://via.placeholder.com/400x400"}
          alt=""
        />
        <span className="indicator"></span>
      </div>

      <div
        className={`nav-drop is-account-dropdown ${show && "is-active"}`}
        ref={nodeRefChild}>
        <div className="inner">
          <div className="nav-drop-header">
            <span className="username">{user?.display}</span>
            <label className="theme-toggle">
              <input
                type="checkbox"
                onChange={handleChangeTheme}
                checked={isDarkTheme}
              />
              <span className="toggler">
                <span className="dark">
                  <FiMoon />
                </span>
                <span className="light">
                  <FiSun />
                </span>
              </span>
            </label>
          </div>
          <div className="nav-drop-body account-items">
            <a
              id="profile-link"
              href="/profile-main.html"
              className="account-item">
              <div className="media">
                <div className="media-left">
                  <div className="image">
                    <img
                      src="https://via.placeholder.com/400x400"
                      data-demo-src="/img/avatars/jenna.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="media-content">
                  <h3>{user?.display}</h3>
                  <small>Main account</small>
                </div>
                <div className="media-right">
                  <FiCheck />
                </div>
              </div>
            </a>
            <hr className="account-divider" />
            <a href="/options-settings.html" className="account-item">
              <div className="media">
                <div className="icon-wrap">
                  <FiSettings />
                </div>
                <div className="media-content">
                  <h3>Settings</h3>
                  <small>Access widget settings.</small>
                </div>
              </div>
            </a>
            <a className="account-item">
              <div className="media">
                <div className="icon-wrap">
                  <FiLifeBuoy />
                </div>
                <div className="media-content">
                  <h3>Help</h3>
                  <small>Contact our support.</small>
                </div>
              </div>
            </a>
            <a className="account-item" onClick={handleLogout}>
              <div className="media">
                <div className="icon-wrap">
                  <FiPower />
                </div>
                <div className="media-content">
                  <h3>Log out</h3>
                  <small>Log out from your account.</small>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
