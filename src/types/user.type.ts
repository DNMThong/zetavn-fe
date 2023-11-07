import { Gender } from "./contants.type";

export default interface User {
   id: string;
   email: string;
   phone: string | null;
   username: string;
   firstName: string;
   lastName: string;
   display: string;
   avatar: string | null;
   poster: string | null;
   isAuthorized: boolean;
}

export type CurrentUser = UserProfile | null;

export interface UserShort {
   id: string;
   username: string;
   firstName: string;
   lastName: string;
   display: string;
   avatar: string | null;
   poster: string | null;
}

export interface UserProfile extends User {
   information: {
      genderEnum: Gender;
      aboutMe: string;
      birthday: string;
      worksAt: string;
      studiedAt: string;
      livesAt: string;
      updateAt: string;
      totalFriends: number;
      totalPosts: number;
      countLikesOfPosts: number;
      followers: number;
   };
}
