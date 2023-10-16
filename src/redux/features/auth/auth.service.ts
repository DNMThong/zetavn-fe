import { apiAuthorization, apiNoAuthorization } from "@/redux/api/api.service";
import { API_URL } from "@/types/contants.type";
import { LoginRequest, RegisterRequest } from "@/types/request.type";
import { LoginResponse, RegisterResponse } from "@/types/response.type";
import User from "@/types/user.type";

export const authApi = apiNoAuthorization.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: API_URL.LOGIN,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: API_URL.REGISTER,
        method: "POST",
        body,
      }),
    })
  }),
});

export const authApiAuthorization = apiAuthorization.injectEndpoints({
  endpoints: (builder) => ({
    relogin: builder.query<LoginResponse, void>({
      query: () => API_URL.RELOGIN,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export const { useLazyReloginQuery } = authApiAuthorization;
