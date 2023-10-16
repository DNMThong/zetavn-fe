import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { API_URL } from "@/types/contants.type";
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
  if (result?.error && result.error?.status === 401 && result.error?.data) {
    const { data } = result.error;
    if (data?.error === "TokenInvalid") {
      const query = fetchBaseQuery({
        baseUrl: API_URL.DOMAIN,
        credentials: "include",
      });
      const refreshResult: any = await query(
        "/api/v0/auth/token/refresh",
        api,
        extraOptions
      );
      const { data: dataRefresh } = refreshResult;
      if (dataRefresh && dataRefresh?.data?.access_token) {
        api.dispatch(setAccessToken(dataRefresh?.data?.access_token));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
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
