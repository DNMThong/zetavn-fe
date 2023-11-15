"use client";
import { SettingsSidebar } from "@/components/sidebar";
import React from "react";
import GeneralSetting from "./_components/settings-part/GeneralSetting";

const SettingsPage = () => {
   console.log("Setting");

   return (
      <>
         <SettingsSidebar></SettingsSidebar>
         <div className="settings-wrapper">
            <GeneralSetting></GeneralSetting>
         </div>
      </>
      // /settings/tab=general
   );
};

export default SettingsPage;
