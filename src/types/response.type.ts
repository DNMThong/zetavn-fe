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
import User, { Friendship, SearchUserData, UserShort } from "./user.type";

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  time?: Date;
  data: T;
}

export type LoginResponse = ApiResponse<{
  userInfo: User;
  access_token: string;
}>;

export type RegisterResponse = ApiResponse<User>;

export interface AuthErrorResponse {
  error: string;
  message: string;
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

export type CreatePostResponse = ApiResponse<Post>;
export type ActivitiesResponse = ApiResponse<ActivityStatus[]>;
export type PostsUsersResponse = ApiResponse<Post[]>;
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
