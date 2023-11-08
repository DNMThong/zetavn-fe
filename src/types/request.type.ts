import { PostAccessModifier, SearchUserOption } from "./contants.type";
import { Media } from "./post.type";

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
  medias: Media[];
  mentions?: { userId: string }[];
}

export interface PostPaginationRequest {
  userId: string;
  pageNumber: number;
  pageSize: number;
}

export interface CreateCommentRequest {
  postId: string;
  comment: {
    content: string;
    userId: string;
    path: string | null;
  };
}

export interface LikePostRequest {
  postId: string;
  userId: string;
}

export interface SearchUsersRequest {
  userId: string;
  kw: string;
  pageNumber?: number;
  pageSize?: number;
  option?: SearchUserOption;
}

export interface AddFriendRequest {
  senderId: string;
  receiverId: string;
}

export interface FriendRequest {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface CommentRequest {
  postId: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface CommentRequest {
  postId: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface GetPostNotificationsRequest {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
}
