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
  const isSelfProfile = user && user.id === username;
  const [getUserInfo] = useLazyGetUserQuery();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  useEffect(() => {
    async function fetchData() {
      const { data, code }: any | null = await getUserInfo(
        username as string
      ).unwrap();
      if (code === 200) {
        setUserProfile(data);
      }
    }
    fetchData();
  }, [username, getUserInfo, user]);
  return (
    <div
      id="overview-content"
      className={`content-section ${isActive ? "is-active" : ""}`}>
      <div className="columns">
        <InfoBlock
          isSelfProfile={!!isSelfProfile}
          worksAt={userProfile?.information.worksAt}
          livesAt={userProfile?.information.livesAt}
          studiedAt={userProfile?.information.studiedAt}
        />
        <div className="column">
          <div className="about-summary">
            <div className="content">
              <h3>Giới thiệu bản thân</h3>
              {userProfile?.information.aboutMe ? (
                <>
                  <p>{userProfile?.information?.aboutMe}</p>
                </>
              ) : (
                <p
                  style={{
                    opacity: "0.5",
                  }}>
                  Không có thông tin giới thiệu
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  info: string | null;
  subtitle?: string;
  title: string | null;
}

const InfoItem = ({ info, subtitle, title }: InfoItemProps) => {
  const router = useRouter();
  if (info === undefined) return null;
  return (
    <div className="flex-block">
      <div className="flex-block-meta">
        <span>
          {title} <a>{info}</a>
        </span>
        <a
          onClick={() => router.push(`/settings?tab=${SettingsTab.GENERAL}`)}
          className="action-link">
          {subtitle}
        </a>
      </div>
      <div
        className="go-button"
        onClick={() => router.push(`/settings?tab=${SettingsTab.GENERAL}`)}>
        <FiArrowRight></FiArrowRight>
      </div>
    </div>
  );
};

interface InfoBlockProps {
  worksAt?: string | null;
  studiedAt?: string | null;
  livesAt?: string | null;
  isSelfProfile: boolean;
}

const InfoBlock = ({
  worksAt,
  studiedAt,
  livesAt,
  isSelfProfile,
}: InfoBlockProps) => {
  const router = useRouter();
  if (worksAt === null && studiedAt === null && livesAt === null) {
    return (
      <div className="column">
        <div
          className="about-summary"
          style={{
            height: "100%",
          }}>
          <div className="content">
            <p
              style={{
                opacity: "0.5",
              }}>
              Không có thông tin giới thiệu
            </p>
            {isSelfProfile && (
              <a
                onClick={() =>
                  router.push(`/settings?tab=${SettingsTab.GENERAL}`)
                }
                className="action-link">
                Chỉnh sửa thông tin cá nhân
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="column">
        {/* <!-- Work block --> */}
        <InfoItem
          info={worksAt as string}
          title="Làm việc tại"
          subtitle="Chỉnh sửa thông tin giới thiệu"
        />
        {/* {userProfile?.information?.worksAt && (
               <div className="flex-block">
                  <div className="flex-block-meta">
                     <span>
                        Làm việc tại <a>{userProfile?.information?.worksAt}</a>
                     </span>
                     <a
                        onClick={() =>
                           router.push(`/settings?tab=${SettingsTab.GENERAL}`)
                        }
                        className="action-link"
                     >
                        Chỉnh sửa thông tin giới thiệu
                     </a>
                  </div>
                  <div
                     className="go-button"
                     onClick={() =>
                        router.push(`/settings?tab=${SettingsTab.GENERAL}`)
                     }
                  >
                     <FiArrowRight></FiArrowRight>
                  </div>
               </div>
            )} */}
        {/* <!-- Education block --> */}
        <InfoItem
          info={studiedAt as string}
          title="Đã học tại"
          subtitle="Thay đổi thông tin trường học"
        />

        <InfoItem
          info={livesAt as string}
          title="Đang sống tại"
          subtitle="Thay đổi nơi sống"
        />
      </div>
    </>
  );
};

export default OverviewPart;
