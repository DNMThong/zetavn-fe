import { useAppSelector } from "@/redux/hooks";
import { SettingsTab } from "@/types/contants.type";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
   FiAlertTriangle,
   FiBell,
   FiLifeBuoy,
   FiLock,
   FiSettings,
   FiShield,
   FiSliders,
} from "react-icons/fi";

const SettingsSidebar = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const activeTab = searchParams.get("tab");
   const handleClick = (e: any, tab: SettingsTab) => {
      router.push("/settings?tab=" + tab);
   };
   const user = useAppSelector((selector) => selector.auth.user);
   return (
      <div className="settings-sidebar is-active">
         <div className="settings-sidebar-inner">
            <div className="user-block">
               <a className="close-settings-sidebar is-hidden">
                  <i data-feather="x"></i>
               </a>
               <div className="avatar-wrap">
                  <Image
                     src={user?.avatar || ""}
                     width={58}
                     height={58}
                     alt="image"
                  />
                  <div className="badge">
                     <i data-feather="check"></i>
                  </div>
               </div>
               <h4>{user?.display}</h4>
               <p>{user?.information.livesAt}</p>
            </div>
            <div className="user-menu">
               <div className="user-menu-inner has-slimscroll">
                  <div className="menu-block">
                     <ul>
                        <li
                           data-section="general"
                           className={`${
                              activeTab === SettingsTab.GENERAL
                                 ? "is-active"
                                 : ""
                           }`}
                        >
                           <a
                              onClick={(e) =>
                                 handleClick(e, SettingsTab.GENERAL)
                              }
                           >
                              <FiSettings></FiSettings>
                              <span>Cài đặt chung</span>
                           </a>
                        </li>
                        <li
                           data-section="security"
                           className={`${
                              activeTab === SettingsTab.SECURITY
                                 ? "is-active"
                                 : ""
                           }`}
                        >
                           <a
                              onClick={(e) =>
                                 handleClick(e, SettingsTab.SECURITY)
                              }
                           >
                              <FiShield></FiShield>
                              <span>Bảo mật</span>
                           </a>
                        </li>
                        <li
                           data-section="personal"
                           className={`${
                              activeTab === SettingsTab.PERSONAL
                                 ? "is-active"
                                 : ""
                           }`}
                        >
                           <a>
                              <FiAlertTriangle></FiAlertTriangle>
                              <span>Tài khoản</span>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div className="separator"></div>
                  <div className="menu-block">
                     <ul>
                        <li
                           data-section="privacy"
                           className={`${
                              activeTab === SettingsTab.PRIVACY
                                 ? "is-active"
                                 : ""
                           }`}
                        >
                           <a
                              onClick={(e) =>
                                 handleClick(e, SettingsTab.PRIVACY)
                              }
                           >
                              <FiLock></FiLock>
                              <span>Riêng tư</span>
                           </a>
                        </li>
                        <li
                           data-section="preferences"
                           className={`${
                              activeTab === SettingsTab.PREFERENCES
                                 ? "is-active"
                                 : ""
                           }`}
                        >
                           <a
                              onClick={(e) =>
                                 handleClick(e, SettingsTab.PREFERENCES)
                              }
                           >
                              <FiSliders></FiSliders>
                              <span>Ưu tiên</span>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div className="separator"></div>
                  <div className="menu-block">
                     <ul>
                        <li
                           data-section="notifications"
                           className={`${
                              activeTab === SettingsTab.NOTIFICATIONS
                                 ? "is-active"
                                 : ""
                           }`}
                        >
                           <a
                              onClick={(e) =>
                                 handleClick(e, SettingsTab.NOTIFICATIONS)
                              }
                           >
                              <FiBell></FiBell>
                              <span>Thông báo</span>
                           </a>
                        </li>
                        <li
                           data-section="support"
                           className={`${
                              activeTab === SettingsTab.SUPPORT
                                 ? "is-active"
                                 : ""
                           }`}
                        >
                           <a
                              onClick={(e) =>
                                 handleClick(e, SettingsTab.SUPPORT)
                              }
                           >
                              <FiLifeBuoy></FiLifeBuoy>
                              <span>Hỗ trợ</span>
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SettingsSidebar;
