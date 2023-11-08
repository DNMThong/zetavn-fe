import { configureStore } from "@reduxjs/toolkit";
import GlobalState from "./features/global.slice";
import AuthReducer from "./features/auth/auth.slice";
import PostReducer from "./features/post/post.slice";
import { authApi, authApiAuthorization } from "./features/auth/auth.service";
import { apiAuthorization, apiNoAuthorization } from "./api/api.service";
import { userApi } from "./features/user/user.service";
import { apiUpload } from "./features/upload/upload.service";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    global: GlobalState,
    post: PostReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApiAuthorization.reducerPath]: authApiAuthorization.reducer,
    [apiUpload.reducerPath]: apiUpload.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiNoAuthorization.middleware, apiAuthorization.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
