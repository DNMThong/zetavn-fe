import { API_URL, ProfileAboutContent } from "@/types/contants.type";
import { notFound } from "next/navigation";
import { UserResponse } from "@/types/response.type";
import ProfileAboutMain from "../_components/profile-about-main/ProfileAboutMain";

async function getProfile(username: string) {
  const res = await fetch(
    `${API_URL.DOMAIN}${API_URL.USERS}/${username}/profile`
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

const ProfileAboutPage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const response: UserResponse | null = await getProfile(params.username);

  if (!response) notFound();
  if (response && response.code === 404) notFound();

  return <>{response && <ProfileAboutMain userProfile={response.data} />}</>;
};

export default ProfileAboutPage;
