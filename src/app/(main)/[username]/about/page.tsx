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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLazyGetUserQuery } from "@/redux/features/user/user.service";
import { UserProfile } from "@/types/user.type";

const ProfileAboutPage = () => {
   const params = useSearchParams();
   const router = useRouter();
   const { username } = useParams();
   useEffect(() => {
      router.push(`/${username}/about?content=${ProfileAboutContent.OVERVIEW}`);
   }, []);
   return (
      <div className="container is-custom">
         <div id="profile-about" className="view-wrap is-headless">
            <TopPart></TopPart>
            <div className="column">
               {/* <!-- About sections --> */}
               <div className="profile-about side-menu">
                  <AboutSideMenu />
                  <div className="right-content">
                     {params.get("content") ===
                        ProfileAboutContent.OVERVIEW && (
                        <OverviewPart
                           isActive={
                              params.get("content") ===
                              ProfileAboutContent.OVERVIEW
                           }
                        ></OverviewPart>
                     )}
                     {params.get("content") ===
                        ProfileAboutContent.PERSONAL && (
                        <PersonalInfoPart
                           isActive={
                              params.get("content") ===
                              ProfileAboutContent.PERSONAL
                           }
                        ></PersonalInfoPart>
                     )}
                     {params.get("content") ===
                        ProfileAboutContent.EDUCATION && (
                        <EducationContentPart
                           isActive={
                              params.get("content") ===
                              ProfileAboutContent.EDUCATION
                           }
                        ></EducationContentPart>
                     )}
                     {params.get("content") === ProfileAboutContent.JOB && (
                        <JobContentPart
                           isActive={
                              params.get("content") === ProfileAboutContent.JOB
                           }
                        ></JobContentPart>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileAboutPage;
