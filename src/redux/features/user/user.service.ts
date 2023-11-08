import { apiAuthorization, apiNoAuthorization } from "@/redux/api/api.service";
import { API_URL, SearchUserOption } from "@/types/contants.type";
import {
  AddFriendRequest,
  FriendRequest,
  GetNotificationsRequest,
  LoginRequest,
  RegisterRequest,
  SearchUsersRequest,
} from "@/types/request.type";
import {
  AddFriendResponse,
  ApiResponse,
  GetFriendRequestResponse,
  GetFriendsResponse,
  GetPostNotificationsResponse,
  LoginResponse,
  RegisterResponse,
  SearchUserResponse,
} from "@/types/response.type";
import User from "@/types/user.type";

export const userApi = apiAuthorization.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<unknown, void>({
      query: () => "/api/v0/users",
    }),
    getFriends: builder.query<GetFriendsResponse, string>({
      query: (id) => `${API_URL.USERS}/${id}/friends`,
    }),
    searchUsers: builder.query<SearchUserResponse, SearchUsersRequest>({
      query: (data) => ({
        url: `${API_URL.USERS}/search`,
        params: {
          userId: data.userId,
          kw: data.kw,
          pageNumber: data.pageNumber || 0,
          pageSize: data.pageSize || 8,
          option: data.option || SearchUserOption.ALL,
        },
      }),
    }),
    addFriend: builder.mutation<AddFriendResponse, AddFriendRequest>({
      query: (body) => ({
        url: API_URL.FRIENDSHIP,
        method: "POST",
        body,
      }),
    }),
    acceptFriend: builder.mutation<AddFriendResponse, AddFriendRequest>({
      query: (body) => ({
        url: `${API_URL.FRIENDSHIP}/accept`,
        method: "PUT",
        body,
      }),
    }),
    rejectFriend: builder.mutation<AddFriendResponse, AddFriendRequest>({
      query: (body) => ({
        url: `${API_URL.FRIENDSHIP}/reject`,
        method: "PUT",
        body,
      }),
    }),
    getFriendRequest: builder.query<GetFriendRequestResponse, FriendRequest>({
      query: (data) => ({
        url: API_URL.FRIENDSHIP,
        params: {
          id: data.userId,
          pageNumber: data.pageNumber || 0,
          pageSize: data.pageSize || 5,
        },
      }),
    }),
    getPostNotifications: builder.query<
      GetPostNotificationsResponse,
      GetNotificationsRequest
    >({
      query: (data) => ({
        url: API_URL.NOTIFICATIONS,
        params: {
          id: data.userId,
          pageNumber: data.pageNumber || 0,
          pageSize: data.pageSize || 5,
        },
      }),
    }),
    updateReadPostNotification: builder.mutation<
      ApiResponse<null>,
      { ids: number[] }
    >({
      query: (body) => ({
        url: `${API_URL.NOTIFICATIONS}/read`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetFriendsQuery,
  useLazySearchUsersQuery,
  useAddFriendMutation,
  useGetFriendRequestQuery,
  useLazyGetFriendRequestQuery,
  useAcceptFriendMutation,
  useRejectFriendMutation,
  useLazyGetPostNotificationsQuery,
  useUpdateReadPostNotificationMutation,
} = userApi;
