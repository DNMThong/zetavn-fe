import { PostAccessModifier } from "./contants.type";
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
