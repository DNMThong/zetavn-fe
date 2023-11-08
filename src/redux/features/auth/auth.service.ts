import { apiAuthorization, apiNoAuthorization } from "@/redux/api/api.service";
import { API_URL } from "@/types/contants.type";
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "@/types/request.type";
import {
  ApiResponse,
  LoginResponse,
  RegisterResponse,
} from "@/types/response.type";
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
    }),
    forgotPassword: builder.mutation<ApiResponse<null>, string>({
      query: (email) => ({
        url: API_URL.FORGOT_PASSWORD,
        method: "POST",
        params: {
          email,
        },
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordRequest>({
      query: (body) => ({
        url: API_URL.RESET_PASSWORD,
        method: "POST",
        body,
      }),
    }),
    sendConfirmationEmail: builder.mutation<ApiResponse<null>, string>({
      query: (userId) => ({
        url: API_URL.SEND_CONFIRMATION_EMAIL,
        method: "POST",
        params: {
          userId,
        },
      }),
    }),
    confirmationEmail: builder.mutation<ApiResponse<null>, string>({
      query: (token) => ({
        url: API_URL.CONFIRMATION_EMAIL,
        method: "POST",
        params: {
          token,
        },
      }),
    }),
  }),
});

export const authApiAuthorization = apiAuthorization.injectEndpoints({
  endpoints: (builder) => ({
    relogin: builder.query<LoginResponse, void>({
      query: () => API_URL.RELOGIN,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useConfirmationEmailMutation,
  useSendConfirmationEmailMutation,
} = authApi;

export const { useLazyReloginQuery } = authApiAuthorization;
