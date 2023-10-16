import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityMood, ActivityStatus, PhotoUpload } from "@/types/post.type";
import { PostAccessModifier } from "@/types/contants.type";

interface PostState {
  activityStatusSelected: ActivityStatus | undefined;
  openActivities: boolean;
  activityMood: ActivityMood | undefined;
  textContent: string;
  photos: PhotoUpload[];
  accessModifier: PostAccessModifier;
  activities: ActivityStatus[];
}

const initialState: PostState = {
  activityStatusSelected: undefined,
  openActivities: false,
  activityMood: undefined,
  textContent: "",
  photos: [],
  accessModifier: PostAccessModifier.FRIENDS,
  activities: [],
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
    setPhotos(state, action: PayloadAction<PhotoUpload[]>) {
      state.photos = action.payload;
    },
    addPhotos(state, action: PayloadAction<PhotoUpload[]>) {
      state.photos.concat(action.payload);
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
} = slice.actions;
export default PostReducer;
