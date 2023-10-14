import User, { CurrentUser } from "@/types/user.type";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localstorage.util";
import { clearSessionData, removeSessionData } from "@/utils/session.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: CurrentUser;
  friends: User[];
  accessToken: string | null;
}

interface Credentials {
  userInfo: User;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  friends: [
    {
      avatar: "avatar.png",
      createdAt: "12:13AM 17/07/2023",
      display: "Hà Vi Trần Thị",
      email: "havi@gmail.com",
      firstName: "Hà Vi",
      id: "62404842-e806-47d0-b46c-79bebaf379d6",
      isAuthorized: true,
      lastName: "Trần Thị",
      phone: "09123456789",
      poster: "poster.png",
      updatedAt: "12:13AM 17/07/2023",
      username: "havi",
    },
    {
      avatar: "avatar.png",
      createdAt: "12:13AM 17/07/2023",
      display: "Yasua",
      email: "havi@gmail.com",
      firstName: "Hà Vi",
      id: "62404842-e806-47d0-b46c-79bebaf37916",
      isAuthorized: true,
      lastName: "Trần Thị",
      phone: "09123456789",
      poster: "poster.png",
      updatedAt: "12:13AM 17/07/2023",
      username: "havi",
    },
  ],
  accessToken: getLocalStorageItem("soloyasuakhong"),
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      setLocalStorageItem("soloyasuakhong", state.accessToken);
    },
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      const { userInfo, accessToken } = action.payload;
      state.user = userInfo;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      clearSessionData();
      removeLocalStorageItem("soloyasuakhong");
    },
  },
});
const AuthReducer = slice.reducer;

export const { setUser, setCredentials, setAccessToken, logout } =
  slice.actions;
export default AuthReducer;
