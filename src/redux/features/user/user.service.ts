import { apiAuthorization, apiNoAuthorization } from "@/redux/api/api.service";
import { API_URL } from "@/types/contants.type";
import { LoginRequest, RegisterRequest } from "@/types/request.type";
import { LoginResponse, RegisterResponse } from "@/types/response.type";
import User from "@/types/user.type";

export const userApi = apiAuthorization.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<unknown, void>({
      query: () => "/api/v0/users",
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
