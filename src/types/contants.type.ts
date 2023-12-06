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
  FOLLOWS = "/api/v0/follows",
  MESSAGES = "/api/v0/messages",
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

export enum ProfileActive {
  TIMELINE = "Timeline",
  ABOUT = "About",
  FRIENDS = "Friends",
  PHOTOS = "Photos",
}

export enum ProfileAboutContent {
  OVERVIEW = "overview-content",
  PERSONAL = "personal-content",
  EDUCATION = "education-content",
  JOB = "job-content",
}

export enum FriendshipStatus {
  SENDER = "SENDER",
  FRIEND = "FRIEND",
  NONE = "NONE",
  RECEIVER = "RECEIVER",
}

export enum SettingsTab {
  GENERAL = "general",
  SECURITY = "security",
  PERSONAL = "personal",
  PRIVACY = "privacy",
  PREFERENCES = "preferences",
  NOTIFICATIONS = "notifications",
  SUPPORT = "support",
}

export enum FollowPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  NONE = "NONE",
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

export enum MessageType {
  TEXT = "TEXT",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
}

export enum MessageStatus {
  SENT = "SENT",
  READ = "READ",
}

export enum CallType {
  VIDEO = "video",
  VOICE = "voice",
}

export enum CallStatus {
  OUT_GOING = "out-going",
  IN_COMING = "in-coming",
}
