import { apiAuthorization } from "@/redux/api/api.service";
import { API_URL } from "@/types/contants.type";
import { CreatePostRequest } from "@/types/request.type";
import {
  ActivitiesResponse,
  CreatePostResponse,
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
    getComments: build.query<any, string>({
      query: (id) => `${API_URL.POSTS}/${id}/comments`,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetActivitiesQuery,
  useGetPostsByUserIdQuery,
  useGetCommentsQuery,
} = apiPost;
