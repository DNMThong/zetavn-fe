"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { AboutSideMenu } from "../_components/profile-menu";
import TopPart from "../_components/profile-part/TopPart";
import { ProfileAboutContent } from "@/types/contants.type";
import OverviewPart from "../_components/profile-part/OverviewPart";
import PersonalInfoPart from "../_components/profile-part/PersonalInfoPart";
import EducationContentPart from "../_components/profile-part/EducationContentPart";
import JobContentPart from "../_components/profile-part/JobContentPart";
import { useParams } from "next/navigation";
import { useLazyGetUserQuery } from "@/redux/features/user/user.service";
import { UserProfile } from "@/types/user.type";

const ProfileAboutPage = ({ params }: { params: { userId: string } }) => {
   const [aboutContent, setAboutContent] = useState<ProfileAboutContent>(
      ProfileAboutContent.OVERVIEW
   );
   return (
      <div className="container is-custom">
         <div id="profile-about" className="view-wrap is-headless">
            <TopPart></TopPart>
            <div className="column">
               {/* <!-- About sections --> */}
               <div className="profile-about side-menu">
                  <AboutSideMenu
                     activeAboutContent={aboutContent}
                     setActiveAboutContent={setAboutContent}
                  />
                  <div className="right-content">
                     <OverviewPart
                        isActive={aboutContent === ProfileAboutContent.OVERVIEW}
                     ></OverviewPart>
                     <PersonalInfoPart
                        isActive={aboutContent === ProfileAboutContent.PERSONAL}
                     ></PersonalInfoPart>
                     <EducationContentPart
                        isActive={
                           aboutContent === ProfileAboutContent.EDUCATION
                        }
                     ></EducationContentPart>
                     <JobContentPart
                        isActive={aboutContent === ProfileAboutContent.JOB}
                     ></JobContentPart>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileAboutPage;
