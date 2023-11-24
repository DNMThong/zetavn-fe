import {
  MediaType,
  NotificationFriendRequest,
  StatusFriend,
} from "./contants.type";
import Post, {
  ActivityStatus,
  Comment,
  PostNewsfeed,
  PostNotification,
} from "./post.type";
import User, {
  SearchUserData,
  UserShort,
  UserProfile,
  UserContact,
} from "./user.type";
import { FollowPriority, FriendshipStatus } from "./contants.type";
import { Message } from "./chat.type";

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  time?: Date;
  data: T;
}

export type LoginResponse = ApiResponse<{
  userInfo: UserProfile;
  access_token: string;
}>;

export type RegisterResponse = ApiResponse<User>;

export interface AuthErrorResponse {
  error: string;
  message: string;
}

export interface Friendship {
  id: number;
  sender: UserProfile;
  receiver: UserProfile;
  status: FriendshipStatus;
  createdAt: Date;
}

export interface FollowResponse {
  followId: number;
  followerId: string;
  followingId: string;
  priority: FollowPriority;
}

export interface FileUpload {
  id: string;
  url: string;
  type: MediaType;
  width: number;
  height: number;
}

export type ImagesUpload = FileUpload & {
  type: MediaType.IMAGE;
};

export interface Pagination<T> {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
  data: T;
}

export interface FriendRequestResponse {
  user: UserShort;
  createdAt: string;
  status: NotificationFriendRequest;
}

export type PostPagination = Pagination<PostNewsfeed[]>;
export type SearchUserPagination = Pagination<SearchUserData[]>;
export type FriendRequestPagination = Pagination<FriendRequestResponse[]>;
export type CommentPagination = Pagination<Comment[]>;
export type PostNotificationPagination = Pagination<PostNotification[]>;
export type ChatMessagesPagination = Pagination<Message[]>;

export type CreatePostResponse = ApiResponse<Post>;
export type ActivitiesResponse = ApiResponse<ActivityStatus[]>;
export type PostsUsersResponse = ApiResponse<PostNewsfeed[]>;
export type PostPaginationResponse = ApiResponse<PostPagination>;
export type FilesUploadResponse = ApiResponse<FileUpload[]>;
export type ImagesUploadResponse = ApiResponse<ImagesUpload[]>;
export type CommentsResponse = ApiResponse<CommentPagination>;
export type CreateCommentResponse = ApiResponse<Comment>;
export type GetFriendsResponse = ApiResponse<UserShort[]>;
export type SearchUserResponse = ApiResponse<SearchUserPagination>;
export type AddFriendResponse = ApiResponse<Friendship>;
export type GetFriendRequestResponse = ApiResponse<FriendRequestPagination>;
export type GetPostNotificationsResponse =
  ApiResponse<PostNotificationPagination>;

export type UserResponse = ApiResponse<UserProfile>;

export type FriendshipResponse = ApiResponse<Friendship>;

export type FileUploadResponse = ApiResponse<FileUpload>;
export type GetContactResponse = ApiResponse<UserContact[]>;
export type GetChatMessagesResponse = ApiResponse<ChatMessagesPagination>;
export type CreateChatMessagesResponse = ApiResponse<Message>;
