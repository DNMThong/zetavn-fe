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
