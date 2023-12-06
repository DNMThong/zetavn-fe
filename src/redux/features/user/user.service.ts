import { apiAuthorization, apiNoAuthorization } from "@/redux/api/api.service";
import { API_URL, SearchUserOption } from "@/types/contants.type";
import {
  AddFriendRequest,
  FollowRequest,
  FriendRequest,
  FriendshipStatusRequest,
  GetPostNotificationsRequest,
  LoginRequest,
  RegisterRequest,
  SearchUsersRequest,
  UpdateInfoRequest,
  UpdateUserImageRequest,
  UploadImageRequest,
} from "@/types/request.type";
import {
  AddFriendResponse,
  ApiResponse,
  FileUploadResponse,
  FollowResponse,
  FriendshipResponse,
  GetFriendRequestResponse,
  GetFriendsResponse,
  GetPostNotificationsResponse,
  LoginResponse,
  RegisterResponse,
  SearchUserResponse,
  UserResponse,
} from "@/types/response.type";
import User, { UserProfile } from "@/types/user.type";
import { FriendListRequest } from "./../../../types/request.type";

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
          pageNumber: data.pageNumber || 0,
          pageSize: data.pageSize || 5,
        },
      }),
    }),
    getPostNotifications: builder.query<
      GetPostNotificationsResponse,
      GetPostNotificationsRequest
    >({
      query: (data) => ({
        url: API_URL.NOTIFICATIONS,
        params: {
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
    getUser: builder.query<SearchUserResponse, string>({
      query: (id) => `${API_URL.USERS}/${id}`,
    }),
    updateUserInfo: builder.mutation<UserResponse, UpdateInfoRequest>({
      query: (data) => ({
        url: `${API_URL.USERS}/info`,
        body: data,
        method: "PUT",
      }),
    }),
    getFriendsListByUserId: builder.query<UserProfile, FriendListRequest>({
      query: ({ userId, pageNumber = 0, pageSize = 5 }) => ({
        url: `${API_URL.FRIENDSHIP}/friends`,
        params: {
          id: userId,
          pageNumber: pageNumber as number,
          pageSize: pageSize as number,
        },
      }),
    }),
    getFriendshipStatus: builder.query<
      FriendshipResponse,
      FriendshipStatusRequest
    >({
      query: ({ sourceId, targetId }) => ({
        url: `${API_URL.FRIENDSHIP}/status`,
        params: {
          sourceId,
          targetId,
        },
      }),
    }),
    getFollowStatus: builder.query<FollowResponse, FriendshipStatusRequest>({
      query: ({ sourceId, targetId }) => ({
        url: `${API_URL.FOLLOWS}/check-follow`,
        params: {
          sourceId: sourceId,
          targetId: targetId,
        },
      }),
    }),
    unFollow: builder.mutation<FollowResponse, FriendshipStatusRequest>({
      query: ({ sourceId: followerId, targetId: followingId }) => ({
        url: `${API_URL.FOLLOWS}`,
        method: "DELETE",
        params: {
          followerId,
          followingId,
        },
      }),
    }),
    follow: builder.mutation<FollowResponse, FollowRequest>({
      query: ({ followerId, followingId, priority }) => ({
        url: `${API_URL.FOLLOWS}`,
        method: "POST",
        body: {
          followerId,
          followingId,
          priority,
        },
      }),
    }),

    updateUserImage: builder.mutation<UserProfile, UpdateUserImageRequest>({
      query: ({ urlBase64, type }) => ({
        url: `${API_URL.USERS}/${type}`,
        method: "PUT",
        body: {
          images: [urlBase64],
        },
      }),
    }),
    uploadImage: builder.mutation<FileUploadResponse, UploadImageRequest>({
      query: ({ images }) => ({
        url: `${API_URL.UPLOAD}/images`,
        method: "POST",
        body: {
          images: [...images],
        },
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
  useLazyGetUserQuery,
  useUpdateUserInfoMutation,
  useLazyGetFriendsListByUserIdQuery,
  useLazyGetFriendshipStatusQuery,
  useLazyGetFollowStatusQuery,
  useUnFollowMutation,
  useFollowMutation,
  useUpdateUserImageMutation,
  useUploadImageMutation,
} = userApi;
