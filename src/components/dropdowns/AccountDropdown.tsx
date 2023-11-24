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
import Link from "next/link";
import { ImageDefault, SettingsTab } from "@/types/contants.type";

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

  const handleChangeTheme = () => {
    dispatch(toggleChangeTheme());
  };

  const handleClickProfile = () => {
    router.push(`/${user?.id}`);
    setShow(false);
  };

  const handleClickSetting = () => {
    router.push(`/settings?tab=${SettingsTab.GENERAL}`);
    setShow(false);
  };

  return (
    <div
      id="account-dropdown"
      className="navbar-item is-account drop-trigger has-caret"
      ref={nodeRefParent}>
      <div className="user-image" onClick={() => setShow((prev) => !prev)}>
        <img src={user?.avatar || ImageDefault.AVATAR} alt="" />
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
              onClick={handleClickProfile}
              className="account-item">
              <div className="media">
                <div className="media-left">
                  <div className="image">
                    <img src={user?.avatar || ImageDefault.AVATAR} alt="" />
                  </div>
                </div>
                <div className="media-content">
                  <h3>{user?.display}</h3>
                  <small>Tài khoản chính</small>
                </div>
                <div className="media-right">
                  <FiCheck />
                </div>
              </div>
            </a>
            <hr className="account-divider" />
            <a onClick={handleClickSetting} className="account-item">
              <div className="media">
                <div className="icon-wrap">
                  <FiSettings />
                </div>
                <div className="media-content">
                  <h3>Cài đặt</h3>
                  <small>Truy cập cài đặt tiện ích.</small>
                </div>
              </div>
            </a>
            <a className="account-item">
              <div className="media">
                <div className="icon-wrap">
                  <FiLifeBuoy />
                </div>
                <div className="media-content">
                  <h3>Hỗ trợ</h3>
                  <small>Liên hệ để được hỗ trợ.</small>
                </div>
              </div>
            </a>
            <a className="account-item" onClick={handleLogout}>
              <div className="media">
                <div className="icon-wrap">
                  <FiPower />
                </div>
                <div className="media-content">
                  <h3>Đăng xuất</h3>
                  <small>Đăng xuất khỏi tài khoản.</small>
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
