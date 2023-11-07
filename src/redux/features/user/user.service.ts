import { apiAuthorization, apiNoAuthorization } from "@/redux/api/api.service";
import { API_URL } from "@/types/contants.type";
import {
   FollowRequest,
   FriendListRequest,
   FriendshipStatusRequest,
   LoginRequest,
   RegisterRequest,
   UpdateInfoRequest,
} from "@/types/request.type";
import {
   FollowResponse,
   FriendshipResponse,
   LoginResponse,
   RegisterResponse,
   UserResponse,
} from "@/types/response.type";
import User, { UserProfile } from "@/types/user.type";

export const userApi = apiAuthorization.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query<unknown, void>({
         query: () => "/api/v0/users",
      }),
      getUser: builder.query<UserResponse, string>({
         query: (id) => `${API_URL.USERS}/${id}`,
      }),
      updateUserInfo: builder.mutation<UserResponse, UpdateInfoRequest>({
         query: (data) => ({
            url: `${API_URL.USERS}/${data.userId}/info`,
            body: data.info,
            method: "PUT",
         }),
      }),
      getFriendsListByUserId: builder.query<UserProfile, FriendListRequest>({
         query: ({ userId, pageNumber = 0, pageSize = 5 }) => ({
            url: `${API_URL.FRIENDS}/friends`,
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
            url: `${API_URL.FRIENDS}/status`,
            params: {
               sourceId,
               targetId,
            },
         }),
      }),
      sendFriendRequest: builder.mutation<
         FriendshipResponse,
         FriendshipStatusRequest
      >({
         query: (data) => {
            return {
               url: `${API_URL.FRIENDS}`,
               method: "POST",
               body: {
                  senderId: data?.sourceId,
                  receiverId: data?.targetId,
               },
            };
         },
      }),
      acceptFriendRequest: builder.mutation<
         FriendshipResponse,
         FriendshipStatusRequest
      >({
         query: (data) => ({
            url: `${API_URL.FRIENDS}/accept`,
            method: "PUT",
            body: {
               senderId: data?.targetId,
               receiverId: data?.sourceId,
            },
         }),
      }),
      rejectFriendRequest: builder.mutation<
         FriendshipResponse,
         FriendshipStatusRequest
      >({
         query: (data) => ({
            url: `${API_URL.FRIENDS}/reject`,
            method: "PUT",
            body: {
               senderId: data?.sourceId,
               receiverId: data?.targetId,
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
   }),
});

export const {
   useGetUsersQuery,
   useLazyGetUserQuery,
   useUpdateUserInfoMutation,
   useLazyGetFriendsListByUserIdQuery,
   useSendFriendRequestMutation,
   useLazyGetFriendshipStatusQuery,
   useAcceptFriendRequestMutation,
   useRejectFriendRequestMutation,
   useLazyGetFollowStatusQuery,
   useUnFollowMutation,
   useFollowMutation,
} = userApi;
