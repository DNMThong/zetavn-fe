import { configureStore } from "@reduxjs/toolkit";
import GlobalState from "./features/global.slice";
import AuthReducer from "./features/auth/auth.slice";
import PostReducer from "./features/post/post.slice";
import { authApi } from "./features/auth/auth.service";
import { apiAuthorization, apiNoAuthorization } from "./api/api.service";
import { userApi } from "./features/user/user.service";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    global: GlobalState,
    post: PostReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiNoAuthorization.middleware,
      apiAuthorization.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
