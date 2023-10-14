import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { API_URL } from "@/types/contants.type";
import { AuthErrorResponse } from "@/types/response.type";
import { isAuthErrorResponse } from "@/utils/check-type.util";
import { logout, setAccessToken } from "../features/auth/auth.slice";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.DOMAIN,
  credentials: "include",
  prepareHeaders: (headers: Headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions): Promise<any> => {
  let result: any = await baseQuery(args, api, extraOptions);
  // console.log("RS: ", result);

  if (result?.error && result.error?.status === 401 && result.error?.data) {
    const { data } = result.error;
    if (data?.error === "TokenExpired") {
      const query = fetchBaseQuery({
        baseUrl: API_URL.DOMAIN,
        credentials: "include",
      });
      const refreshResult: any = await query(
        "/api/v0/auth/token/refresh",
        api,
        extraOptions
      );
      console.log(refreshResult);
      const { data: dataRefresh } = refreshResult;
      if (dataRefresh && dataRefresh?.data?.access_token) {
        api.dispatch(setAccessToken(dataRefresh?.data?.access_token));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }

  // if (result?.error?.originalStatus === 403) {
  //   console.log("sending refresh token");
  // const refreshResult = await baseQuery(
  //   "/api/v0/auth/token/refresh",
  //   api,
  //   extraOptions
  // );
  //   console.log(refreshResult);
  //   if (refreshResult?.data) {
  //     //   const user = api.getState().auth.user;
  //     //   api.dispatch(setCredentials({ ...refreshResult.data, user }));
  //     //   result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     //   api.dispatch(logOut());
  //   }
  // }

  return result;
};

export const apiAuthorization = createApi({
  reducerPath: "apiAuthorization",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export const apiNoAuthorization = createApi({
  reducerPath: "apiNoAuthorization",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL.DOMAIN,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
