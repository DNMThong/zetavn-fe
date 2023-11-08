export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum API_URL {
  DOMAIN = "http://localhost:8888",
  _DOMAIN = "localhost:8888",
  LOGIN = "/api/v0/auth/login",
  RELOGIN = "/api/v0/auth/re-login",
  REGISTER = "/api/v0/auth/register",
  FORGOT_PASSWORD = "/api/v0/auth/forgot-password",
  RESET_PASSWORD = "/api/v0/auth/reset-password",
  SEND_CONFIRMATION_EMAIL = "/api/v0/auth/send-confirmation-email",
  CONFIRMATION_EMAIL = "/api/v0/auth/confirmation-email",
  POSTS = "/api/v0/posts",
  ACTIVITIES = "/api/v0/activities",
  USERS = "/api/v0/users",
  UPLOAD = "/api/v0/upload",
  LIKE = "/api/v0/post-like",
  FRIENDSHIP = "/api/v0/friendship",
  NOTIFICATIONS = "/api/v0/notifications",
}

export enum PostAccessModifier {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  FRIENDS = "FRIENDS",
}

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

export enum ImageDefault {
  AVATAR = "https://via.placeholder.com/300x300",
}

export enum SearchUserOption {
  ALL = "all",
  FRIENDS = "friends",
  STRANGERS = "strangers",
}

export enum StatusFriend {
  FRIEND = "FRIEND",
  NONE = "NONE",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export enum NotificationFriendRequest {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  REJECT = "REJECT",
  CANCEL = "CANCEL",
}

export enum FriendshipStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum PostNotificationType {
  LIKE = "LIKE",
  SHARE = "SHARE",
  COMMENT = "COMMENT",
}
