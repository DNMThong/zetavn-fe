import { MediaType, PostAccessModifier } from "./contants.type";
import User, { UserShort } from "./user.type";

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

export interface Media {
  mediaPath: string;
  mediaType: MediaType;
}

export interface PhotoUpload {
  urlBase64: string;
}

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

export type PostMedia = {
  mediaPath: string;
  mediaType: string;
};
