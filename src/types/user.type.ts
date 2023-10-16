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
