import React from "react";
import { notFound } from "next/navigation";
import { API_URL } from "@/types/contants.type";
import { UserResponse } from "@/types/response.type";
import ProfilePhotosMain from "../_components/profile-photos-main/ProfilePhotosMain";

async function getProfile(username: string) {
  const res = await fetch(
    `${API_URL.DOMAIN}${API_URL.USERS}/${username}/profile`
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

const ProfilePhotosPage = async ({ params }: { params: { username: string } }) => {
  const response: UserResponse | null = await getProfile(params.username);

  if (!response) notFound();
  if (response && response.code === 404) notFound();

  return <>{response && <ProfilePhotosMain userProfile={response.data} />}</>;
};

export default ProfilePhotosPage;
