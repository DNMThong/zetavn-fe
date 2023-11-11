import { ProfileAboutContent } from "@/types/contants.type";
import React from "react";

const sideMenuItems: IMenuItem[] = [
   {
      icon: <i className="mdi mdi-progress-check"></i>,
      title: "Overview",
      dataContent: ProfileAboutContent.OVERVIEW,
   },
   {
      icon: <i className="mdi mdi-apps"></i>,
      title: "Personal Info",
      dataContent: ProfileAboutContent.PERSONAL,
   },
   {
      icon: <i className="mdi mdi-school"></i>,
      title: "Education",
      dataContent: ProfileAboutContent.EDUCATION,
   },
   {
      icon: <i className="mdi mdi-briefcase-plus"></i>,
      title: "Jobs",
      dataContent: ProfileAboutContent.JOB,
   },
];

interface IMenuItem {
   icon: React.ReactNode;
   title: string;
   dataContent: ProfileAboutContent;
}

interface AboutSideMenuItemProps extends IMenuItem {
   className?: string;
   onClick?: () => {};
}

const AboutSideMenuItem = (data: AboutSideMenuItemProps) => {
   const { icon, title, dataContent } = data;
   return (
      <div
         className={`menu-item ${data?.className}`}
         data-content={dataContent}
         onClick={data?.onClick}
      >
         <div className="menu-icon">
            {icon}
            <span>{title}</span>
         </div>
      </div>
   );
};

interface AboutSideMenuProps {
   activeAboutContent: ProfileAboutContent;
   setActiveAboutContent?: any;
}

const AboutSideMenu = ({
   activeAboutContent,
   setActiveAboutContent,
}: AboutSideMenuProps) => {
   return (
      <div className="left-menu">
         <div className="left-menu-inner">
            {sideMenuItems.map((item, index) => (
               <AboutSideMenuItem
                  className={
                     activeAboutContent === item.dataContent ? "is-active" : ""
                  }
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  dataContent={item.dataContent}
                  onClick={() => setActiveAboutContent(item.dataContent)}
               />
            ))}
         </div>
      </div>
   );
};

export default AboutSideMenu;
