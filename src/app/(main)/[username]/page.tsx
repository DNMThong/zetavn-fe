import { notFound } from "next/navigation";
import { API_URL } from "@/types/contants.type";
import { UserResponse } from "@/types/response.type";
import ProfileMain from "./_components/profile-main/ProfileMain";

async function getProfile(username: string) {
  const res = await fetch(
    `${API_URL.DOMAIN}${API_URL.USERS}/${username}/profile`
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const response: UserResponse | null = await getProfile(params.username);

  if (!response) notFound();
  if (response && response.code === 404) notFound();

  return <>{response && <ProfileMain userProfile={response.data} />}</>;
};

export default ProfilePage;
