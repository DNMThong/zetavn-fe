import { FollowPriority, FriendshipStatus } from "./contants.type";
import Post, { ActivityStatus } from "./post.type";
import User, { UserProfile } from "./user.type";

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

export type CreatePostResponse = ApiResponse<Post>;
export type ActivitiesResponse = ApiResponse<ActivityStatus[]>;

export type PostsUsersResponse = ApiResponse<Post[]>;

export type UserResponse = ApiResponse<UserProfile>;

export type FriendshipResponse = ApiResponse<Friendship>;
