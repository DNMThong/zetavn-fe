import Post, { PostNewsfeed, PostNotification } from "@/types/post.type";
import User, {
  CurrentUser,
  Friendship,
  UserProfile,
  UserShort,
} from "@/types/user.type";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localstorage.util";
import { clearSessionData, removeSessionData } from "@/utils/session.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FriendRequestResponse } from "@/types/response.type";

interface AuthState {
  user: CurrentUser;
  friends: UserShort[];
  accessToken: string | null;
  newsfeed: PostNewsfeed[];
  friendRequest: FriendRequestResponse[];
  postNotification: PostNotification[];
}

interface Credentials {
  userInfo: UserProfile;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  friends: [],
  accessToken: getLocalStorageItem("soloyasuakhong"),
  newsfeed: [],
  friendRequest: [],
  postNotification: [],
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
    setFriends: (state, action: PayloadAction<UserShort[]>) => {
      state.friends = action.payload;
    },
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      const { userInfo, accessToken } = action.payload;
      state.user = userInfo;
      state.accessToken = accessToken;
    },
    setNewsfeed(state, action: PayloadAction<PostNewsfeed[]>) {
      state.newsfeed = action.payload;
    },
    addNewsfeed(state, action: PayloadAction<PostNewsfeed[]>) {
      state.newsfeed = [...state.newsfeed, ...action.payload];
    },
    addNewsfeedHead(state, action: PayloadAction<PostNewsfeed>) {
      state.newsfeed = [action.payload, ...state.newsfeed];
    },
    setFriendRequest(state, action: PayloadAction<FriendRequestResponse[]>) {
      state.friendRequest = action.payload;
    },
    addFriendRequestHead(state, action: PayloadAction<FriendRequestResponse>) {
      state.friendRequest = [action.payload, ...state.friendRequest];
    },
    addFriendRequest(state, action: PayloadAction<FriendRequestResponse[]>) {
      state.friendRequest = [...state.friendRequest, ...action.payload];
    },
    removeFriendRequest(state, action: PayloadAction<FriendRequestResponse>) {
      const index = state.friendRequest.findIndex(
        (item) => item.user.id === action.payload.user.id
      );
      state.friendRequest.splice(index, 1);
    },
    setPostNotification(state, action: PayloadAction<PostNotification[]>) {
      state.postNotification = action.payload;
    },
    addPostNotificationHead(state, action: PayloadAction<PostNotification>) {
      state.postNotification = [action.payload, ...state.postNotification];
    },
    addPostNotification(state, action: PayloadAction<PostNotification[]>) {
      state.postNotification = [...state.postNotification, ...action.payload];
    },
    removePostNotification(state, action: PayloadAction<number>) {
      const index = state.postNotification.findIndex(
        (item) => item.id === action.payload
      );
      state.postNotification.splice(index, 1);
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.newsfeed = [];
      clearSessionData();
      removeLocalStorageItem("soloyasuakhong");
    },
  },
});
const AuthReducer = slice.reducer;

export const {
  setUser,
  setCredentials,
  setAccessToken,
  logout,
  addNewsfeed,
  addNewsfeedHead,
  setNewsfeed,
  setFriends,
  setFriendRequest,
  addFriendRequest,
  addFriendRequestHead,
  removeFriendRequest,
  addPostNotification,
  addPostNotificationHead,
  removePostNotification,
  setPostNotification,
} = slice.actions;
export default AuthReducer;
