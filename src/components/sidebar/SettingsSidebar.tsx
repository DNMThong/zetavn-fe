import { SettingsTab } from "@/types/contants.type";
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
   return (
      <div className="settings-sidebar is-active">
         <div className="settings-sidebar-inner">
            <div className="user-block">
               <a className="close-settings-sidebar is-hidden">
                  <i data-feather="x"></i>
               </a>
               <div className="avatar-wrap">
                  <img
                     src="https://via.placeholder.com/150x150"
                     data-demo-src="assets/img/avatars/jenna.png"
                     data-user-popover="0"
                     alt=""
                  />
                  <div className="badge">
                     <i data-feather="check"></i>
                  </div>
               </div>
               <h4>Jenna Davis</h4>
               <p>Melbourne, AU</p>
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
                              <span>General</span>
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
                              <span>Security</span>
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
                              <span>Account</span>
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
                              <span>Privacy</span>
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
                              <span>Preferences</span>
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
                              <span>Notifications</span>
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
                              <span>Help</span>
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
