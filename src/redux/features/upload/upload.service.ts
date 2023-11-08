import { apiAuthorization } from "@/redux/api/api.service";
import { API_URL } from "@/types/contants.type";
import {
  ApiResponse,
  FilesUploadResponse,
  ImagesUploadResponse,
} from "@/types/response.type";

export const apiUpload = apiAuthorization.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<FilesUploadResponse, FormData>({
      query: (formData) => {
        console.log(formData);
        return {
          url: API_URL.UPLOAD,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    uploadImageBase64: build.mutation<ImagesUploadResponse, string[]>({
      query: (images) => {
        return {
          url: `${API_URL.UPLOAD}/images`,
          method: "POST",
          body: {
            images,
          },
        };
      },
    }),
    uploadVideoBase64: build.mutation<ImagesUploadResponse, string[]>({
      query: (videos) => {
        return {
          url: `${API_URL.UPLOAD}/videos`,
          method: "POST",
          body: {
            videos,
          },
        };
      },
    }),
    deleteFile: build.mutation<ApiResponse<null>, { id: string }>({
      query: (body) => ({
        url: API_URL.UPLOAD,
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useUploadFileMutation,
  useDeleteFileMutation,
  useUploadImageBase64Mutation,
  useUploadVideoBase64Mutation
} = apiUpload;
