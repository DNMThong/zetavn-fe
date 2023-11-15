import { ProfileAboutContent } from "@/types/contants.type";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
}

const AboutSideMenuItem = (data: AboutSideMenuItemProps) => {
   const router = useRouter();
   const { username } = useParams();
   const { icon, title, dataContent } = data;
   const handleClick = () => {
      router.push(`/${username}/about?content=${dataContent}`);
   };
   return (
      <div
         className={`menu-item ${data?.className}`}
         data-content={dataContent}
         onClick={handleClick}
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

const AboutSideMenu = () => {
   const params = useSearchParams();
   return (
      <div className="left-menu">
         <div className="left-menu-inner">
            {sideMenuItems.map((item, index) => (
               <AboutSideMenuItem
                  className={
                     params.get("content") === item.dataContent
                        ? "is-active"
                        : ""
                  }
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  dataContent={item.dataContent}
               />
            ))}
         </div>
      </div>
   );
};

export default AboutSideMenu;
