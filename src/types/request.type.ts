import { FollowPriority, PostAccessModifier } from "./contants.type";
import { PostMedia } from "./post.type";

export interface LoginRequest {
   username: string;
   password: string;
}

export interface RegisterRequest {
   email: string;
   firstName: string;
   lastName: string;
   password: string;
   gender: string;
   birthday: string;
}

export interface CreatePostRequest {
   userId: string;
   content: string;
   accessModifier: PostAccessModifier;
   activityId?: number;
   medias?: PostMedia[];
   mentions?: { userId: string }[];
}

export interface UpdateInfoRequest {
   userId: string;

   info: {
      email: string;
      username: string;
      phone: string;
      firstName: string;
      lastName: string;
      aboutMe: string;
      genderEnum: string;
      birthday: string;
      livesAt: string;
      worksAt: string;
      studiedAt: string;
   };
}

export interface FriendListRequest {
   userId: string;
   pageNumber?: number;
   pageSize?: number;
}

export interface FriendshipStatusRequest {
   sourceId: string;
   targetId: string;
}

export interface FollowRequest {
   followerId: string;
   followingId: string;
   priority: FollowPriority;
}
