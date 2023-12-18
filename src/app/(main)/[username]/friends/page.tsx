import { notFound } from "next/navigation";
import { API_URL } from "@/types/contants.type";
import { UserResponse } from "@/types/response.type";
import ProfileFriendsMain from "../_components/profile-friends-main/ProfileFriendsMain";

async function getProfile(username: string) {
  const res = await fetch(
    `${API_URL.DOMAIN}${API_URL.USERS}/${username}/profile`
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

const ProfileFriendsPage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const response: UserResponse | null = await getProfile(params.username);

  if (!response) notFound();
  if (response && response.code === 404) notFound();

  return <>{response && <ProfileFriendsMain userProfile={response.data} />}</>;
};

export default ProfileFriendsPage;
