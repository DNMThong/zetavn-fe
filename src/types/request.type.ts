import { Message } from "./chat.type";
import {
  FollowPriority,
  MessageType,
  PostAccessModifier,
  SearchUserOption,
} from "./contants.type";
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

export interface UpdateUserImageRequest {
  userId: string;
  urlBase64: string;
  type: string;
}

export interface UploadImageRequest {
  images: string[];
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

export interface GetChatMessagesRequest {
  userIdGetChat: string;
  userIdContact: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateChatMessagesRequest {
  senderId: string;
  recieverId: string;
  message: string;
  type: MessageType;
}

export interface UploadFileChatMessageRequest
  extends CreateChatMessagesRequest {
  file: File;
}
