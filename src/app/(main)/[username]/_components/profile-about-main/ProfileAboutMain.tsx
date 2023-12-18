"use client";
import React, { useEffect } from "react";
import EducationContentPart from "../profile-part/EducationContentPart";
import { AboutSideMenu } from "../profile-menu";
import TopPart from "../profile-part/TopPart";
import OverviewPart from "../profile-part/OverviewPart";
import PersonalInfoPart from "../profile-part/PersonalInfoPart";
import { useRouter, useSearchParams } from "next/navigation";
import { UserProfile } from "@/types/user.type";
import { useAppSelector } from "@/redux/hooks";
import { ProfileAboutContent } from "@/types/contants.type";
import JobContentPart from "../profile-part/JobContentPart";

interface ProfileAboutContentProps {
  userProfile: UserProfile;
}

const ProfileAboutMain = ({ userProfile }: ProfileAboutContentProps) => {
  const params = useSearchParams();
  const user = useAppSelector((selector) => selector.auth.user);
  const router = useRouter();
  const isSelfProfile: boolean =
    !!user &&
    (user.id === userProfile.username ||
      user.username === userProfile.username);
  useEffect(() => {
    if (!params.has("content")) {
      router.push(
        `/${userProfile.username}/about?content=${ProfileAboutContent.OVERVIEW}`
      );
    }
  }, []);

  return (
    <div className="container is-custom">
      <div id="profile-about" className="view-wrap is-headless">
        <TopPart
          isSelfProfile={isSelfProfile}
          userProfile={userProfile}></TopPart>
        <div className="column">
          {/* <!-- About sections --> */}
          <div className="profile-about side-menu">
            <AboutSideMenu />
            <div className="right-content">
              {params.get("content") === ProfileAboutContent.OVERVIEW && (
                <OverviewPart
                  isSelfProfile={isSelfProfile}
                  userProfile={userProfile}
                  isActive={
                    params.get("content") === ProfileAboutContent.OVERVIEW
                  }></OverviewPart>
              )}
              {params.get("content") === ProfileAboutContent.PERSONAL && (
                <PersonalInfoPart
                  userId={userProfile.id}
                  isActive={
                    params.get("content") === ProfileAboutContent.PERSONAL
                  }></PersonalInfoPart>
              )}
              {params.get("content") === ProfileAboutContent.EDUCATION && (
                <EducationContentPart
                  isActive={
                    params.get("content") === ProfileAboutContent.EDUCATION
                  }></EducationContentPart>
              )}
              {params.get("content") === ProfileAboutContent.JOB && (
                <JobContentPart
                  isActive={
                    params.get("content") === ProfileAboutContent.JOB
                  }></JobContentPart>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAboutMain;
