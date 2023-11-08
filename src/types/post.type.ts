import {
  MediaType,
  PostAccessModifier,
  PostNotificationType,
} from "./contants.type";
import User, { UserShort } from "./user.type";
import { FileUpload } from "./response.type";

export default interface Post {
  id: string;
  user: UserShort;
  content: string;
  accessModifier: PostAccessModifier;
  createdAt: string;
  updatedAt: string;
  activity: ActivityMood;
  medias: Media[];
  mentions: UserShort[];
}

export interface PostNewsfeed extends Post {
  countLike: number;
  countComment: number;
  usersLike: UserShort[];
}

export interface Media {
  mediaPath: string;
  mediaType: MediaType;
}

export type PhotoUpload = FileUpload & {
  type: MediaType;
};

export interface ActivityStatusDetail {
  id: number;
  name: string;
  pic: string;
  desc?: string;
}

export interface ActivityStatus {
  id: number;
  title: string;
  name: string;
  desc: string;
  pic: string;
  details: ActivityStatusDetail[];
}

export type ActivityMood = Omit<ActivityStatus, "details"> & {
  detail: ActivityStatusDetail;
};

export interface Comment {
  id: string;
  user: UserShort;
  content: string;
  mediaPath: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostNotification {
  id: number;
  postId: string;
  relatedId: number;
  interacting: UserShort;
  receiving: UserShort;
  type: PostNotificationType;
  isRead: boolean;
  createdAt: string;
  isCancel: boolean;
}
