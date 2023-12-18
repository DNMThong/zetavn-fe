import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActivityMood,
  ActivityStatus,
  PhotoUpload,
  PostNewsfeed,
} from "@/types/post.type";
import { PostAccessModifier } from "@/types/contants.type";

interface PostState {
  activityStatusSelected: ActivityStatus | undefined;
  openActivities: boolean;
  activityMood: ActivityMood | undefined;
  textContent: string;
  photos: string[];
  accessModifier: PostAccessModifier;
  activities: ActivityStatus[];
  photosLoading: number;
  video: string;
  videoLoading: boolean;
  postsProfile: PostNewsfeed[];
}

const initialState: PostState = {
  activityStatusSelected: undefined,
  openActivities: false,
  activityMood: undefined,
  textContent: "",
  photos: [],
  accessModifier: PostAccessModifier.FRIENDS,
  activities: [],
  photosLoading: 0,
  video: "",
  videoLoading: false,
  postsProfile: [],
};

const slice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    resetState(state) {
      state.activityStatusSelected = undefined;
      state.openActivities = false;
      state.activityMood = undefined;
      state.textContent = "";
      state.photos = [];
      state.video = "";
    },
    setActivityStatusSelected(state, action: PayloadAction<ActivityStatus>) {
      state.activityStatusSelected = action.payload;
    },
    clearActivityStatusSelected(state) {
      state.activityStatusSelected = undefined;
    },
    setOpenActivities(state, action: PayloadAction<boolean>) {
      state.openActivities = action.payload;
    },
    openActivities(state) {
      state.openActivities = true;
      state.activityStatusSelected = undefined;
      state.activityMood = undefined;
    },
    closeActivities(state) {
      state.openActivities = false;
      state.activityStatusSelected = undefined;
      state.activityMood = undefined;
    },
    setActivityMood(state, action: PayloadAction<ActivityMood>) {
      state.activityMood = action.payload;
    },
    clearActivityMood(state) {
      state.activityMood = undefined;
    },
    setTextContent(state, action: PayloadAction<string>) {
      state.textContent = action.payload;
    },
    addTextContent(state, action: PayloadAction<string>) {
      state.textContent += action.payload;
    },
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    addPhotos(state, action: PayloadAction<string[]>) {
      state.photos = [...state.photos, ...action.payload];
    },
    removePhoto(state, action: PayloadAction<number>) {
      state.photos.splice(action.payload, 1);
    },
    setAccessModifier(state, action: PayloadAction<PostAccessModifier>) {
      state.accessModifier = action.payload;
    },
    setActivities(state, action: PayloadAction<ActivityStatus[]>) {
      state.activities = action.payload;
    },
    setPhotosLoading(state, action: PayloadAction<number>) {
      state.photosLoading = action.payload;
    },
    setVideoUploadPost(state, action: PayloadAction<string>) {
      state.video = action.payload;
    },
    setVideoLoading(state, action: PayloadAction<boolean>) {
      state.videoLoading = action.payload;
    },
    setPostsProfile(state, action: PayloadAction<PostNewsfeed[]>) {
      state.postsProfile = action.payload;
    },
    addPostsProfile(state, action: PayloadAction<PostNewsfeed[]>) {
      state.postsProfile = [...state.postsProfile, ...action.payload];
    },
    removePostsProfile(state, action: PayloadAction<string>) {
      const index = state.postsProfile.findIndex(
        (item) => item.id === action.payload
      );
      state.postsProfile.splice(index, 1);
    },
  },
});
const PostReducer = slice.reducer;

export const {
  resetState,
  setActivityStatusSelected,
  clearActivityStatusSelected,
  setOpenActivities,
  openActivities,
  closeActivities,
  setActivityMood,
  clearActivityMood,
  setTextContent,
  addTextContent,
  setPhotos,
  addPhotos,
  removePhoto,
  setAccessModifier,
  setActivities,
  setPhotosLoading,
  setVideoUploadPost,
  setVideoLoading,
  addPostsProfile,
  removePostsProfile,
  setPostsProfile,
} = slice.actions;
export default PostReducer;
