import { apiAuthorization } from "@/redux/api/api.service";
import { API_URL } from "@/types/contants.type";
import {
  CommentRequest,
  CreateCommentRequest,
  CreatePostRequest,
  LikePostRequest,
  PostPaginationRequest,
} from "@/types/request.type";
import {
  ActivitiesResponse,
  ApiResponse,
  CommentsResponse,
  CreateCommentResponse,
  CreatePostResponse,
  PostPaginationResponse,
  PostsUsersResponse,
} from "@/types/response.type";

const apiPost = apiAuthorization.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<CreatePostResponse, CreatePostRequest>({
      query: (body) => ({
        url: API_URL.POSTS,
        method: "POST",
        body,
      }),
    }),
    getActivities: build.query<ActivitiesResponse, void>({
      query: () => API_URL.ACTIVITIES,
    }),
    getPostsByUserId: build.query<PostsUsersResponse, string>({
      query: (id) => `${API_URL.USERS}/${id}/posts`,
    }),
    getPostsNewsFeed: build.query<
      PostPaginationResponse,
      PostPaginationRequest
    >({
      query: (request) => ({
        url: `${API_URL.USERS}/newsfeed`,
        params: {
          pageNumber: request.pageNumber,
          pageSize: request.pageSize,
        },
      }),
    }),
    getComments: build.query<CommentsResponse, CommentRequest>({
      query: (data) => ({
        url: `${API_URL.POSTS}/${data.postId}/comments`,
        params: {
          pageNumber: data.pageNumber || 0,
          pageSize: data.pageSize || 10,
        },
      }),
    }),
    createComment: build.mutation<CreateCommentResponse, CreateCommentRequest>({
      query: (data) => ({
        url: `${API_URL.POSTS}/${data.postId}/comments`,
        method: "POST",
        body: data.comment,
      }),
    }),
    likePost: build.mutation<ApiResponse<unknown>, LikePostRequest>({
      query: (body) => ({
        url: API_URL.LIKE,
        method: "POST",
        body,
      }),
    }),
    unlikePost: build.mutation<ApiResponse<unknown>, LikePostRequest>({
      query: (body) => ({
        url: API_URL.LIKE,
        method: "DELETE",
        body,
      }),
    }),
    checkLikePost: build.query<ApiResponse<boolean>, LikePostRequest>({
      query: (request) => ({
        url: API_URL.LIKE,
        params: {
          postId: request.postId,
        },
      }),
    }),
    getPostMediaByUserId: build.query<PostsUsersResponse, string>({
      query: (userId) => ({
        url: `${API_URL.POSTS}/postMedia`,
        params: {
          userId,
        },
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetActivitiesQuery,
  useGetPostsByUserIdQuery,
  useGetCommentsQuery,
  useLazyGetPostsNewsFeedQuery,
  useGetPostsNewsFeedQuery,
  useCreateCommentMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useLazyCheckLikePostQuery,
  useLazyGetPostMediaByUserIdQuery,
} = apiPost;
