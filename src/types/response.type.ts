import User from "./user.type";

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
