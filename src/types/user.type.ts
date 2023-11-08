import { FriendshipStatus, StatusFriend } from "./contants.type";

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
  createdAt: string;
  updatedAt: string;
}

export type CurrentUser = User | null;

export interface UserShort {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  display: string;
  avatar: string | null;
  poster: string | null;
}

export interface Friendship {
  id: number;
  senderUser: UserShort;
  receiverUser: UserShort;
  status: FriendshipStatus;
  createdAt: string;
}

export interface SearchUserData {
  user: UserShort;
  countLikesOfPosts: number;
  totalFriends: number;
  totalPosts: number;
  status: StatusFriend;
}
