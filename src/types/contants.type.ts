export enum Gender {
   MALE = "MALE",
   FEMALE = "FEMALE",
   OTHER = "OTHER",
}

export enum API_URL {
   DOMAIN = "http://localhost:8888",
   LOGIN = "/api/v0/auth/login",
   RELOGIN = "/api/v0/auth/re-login",
   REGISTER = "/api/v0/auth/register",
   POSTS = "/api/v0/posts",
   ACTIVITIES = "/api/v0/activities",
   USERS = "/api/v0/users",
   FRIENDS = "/api/v0/friendship",
   FOLLOWS = "/api/v0/follows",
   UPLOAD = "/api/v0/upload",
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
