import { useLazyGetUserQuery } from "@/redux/features/user/user.service";
import { useAppSelector } from "@/redux/hooks";
import { SettingsTab } from "@/types/contants.type";
import { UserProfile } from "@/types/user.type";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

interface OverviewPartProps {
   isActive: boolean;
}

const OverviewPart = ({ isActive }: OverviewPartProps) => {
   const user = useAppSelector((selector) => selector.auth.user);
   const router = useRouter();
   const { username } = useParams();
   const [getUserInfo] = useLazyGetUserQuery();
   const [userProfile, setUserProfile] = useState<UserProfile>();
   useEffect(() => {
      async function fetchData() {
         const { data, code } = await getUserInfo(username as string).unwrap();
         if (code === 200) {
            setUserProfile(data);
         }
      }
      fetchData();
   }, [username, getUserInfo, user]);
   return (
      <div
         id="overview-content"
         className={`content-section ${isActive ? "is-active" : ""}`}
      >
         <div className="columns">
            <div className="column">
               {/* <!-- Work block --> */}
               {userProfile?.information?.worksAt && (
                  <div className="flex-block">
                     <div className="flex-block-meta">
                        <span>
                           Làm việc tại{" "}
                           <a>{userProfile?.information?.worksAt}</a>
                        </span>
                        <a
                           onClick={() =>
                              router.push(
                                 `/settings/tab=${SettingsTab.GENERAL}`
                              )
                           }
                           className="action-link"
                        >
                           Chỉnh sửa thông tin giới thiệu
                        </a>
                     </div>
                     <div
                        className="go-button"
                        onClick={() =>
                           router.push(`/settings/tab=${SettingsTab.GENERAL}`)
                        }
                     >
                        <FiArrowRight></FiArrowRight>
                     </div>
                  </div>
               )}
               {/* <!-- Education block --> */}
               {userProfile?.information?.studiedAt && (
                  <div className="flex-block">
                     <div className="flex-block-meta">
                        <span>
                           Đã học tại{" "}
                           <a>{userProfile?.information?.studiedAt}</a>
                        </span>
                        <a
                           className="action-link"
                           onClick={() =>
                              router.push(
                                 `/settings/tab=${SettingsTab.GENERAL}`
                              )
                           }
                        >
                           Thay đổi thông tin trường học
                        </a>
                     </div>
                     <div
                        className="go-button"
                        onClick={() =>
                           router.push(`/settings/tab=${SettingsTab.GENERAL}`)
                        }
                     >
                        <FiArrowRight></FiArrowRight>
                     </div>
                  </div>
               )}
               {/* <!-- Location block --> */}
               {userProfile?.information?.livesAt && (
                  <div className="flex-block">
                     <div className="flex-block-meta">
                        <span>
                           Đang sống tại{" "}
                           <a>{userProfile?.information?.livesAt}</a>
                        </span>
                        <a
                           className="action-link"
                           onClick={() =>
                              router.push(
                                 `/settings/tab=${SettingsTab.GENERAL}`
                              )
                           }
                        >
                           Thay đổi nơi sống
                        </a>
                     </div>
                     <div
                        className="go-button"
                        onClick={() =>
                           router.push(`/settings/tab=${SettingsTab.GENERAL}`)
                        }
                     >
                        <FiArrowRight></FiArrowRight>
                     </div>
                  </div>
               )}
            </div>
            <div className="column">
               <div className="about-summary">
                  <div className="content">
                     <h3>Giới thiệu bản thân</h3>
                     <p>{userProfile?.information?.aboutMe}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OverviewPart;
