import { API_URL } from "@/types/contants.type";
import { ProfileActive } from "@/types/contants.type";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localstorage.util";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

interface GlobalState {
  openExplorerMenu: boolean;
  isDarkTheme: boolean;
  clientStomp: Client | null;
  profilePageActive: ProfileActive;
}

const initialState: GlobalState = {
  openExplorerMenu: false,
  isDarkTheme: getLocalStorageItem<string>("theme")
    ? getLocalStorageItem<string>("theme") === "dark"
    : true,
  clientStomp: null,
  profilePageActive: ProfileActive.TIMELINE,
};

const slice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setOpenExplorerMenu(state, action: PayloadAction<boolean>) {
      state.openExplorerMenu = action.payload;
    },
    toggleExplorerMenu(state) {
      state.openExplorerMenu = !state.openExplorerMenu;
    },

    setIsDarkTheme(state, action: PayloadAction<boolean>) {
      state.isDarkTheme = action.payload;
      setLocalStorageItem("theme", state.isDarkTheme ? "dark" : "light");
    },
    toggleChangeTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
      setLocalStorageItem("theme", state.isDarkTheme ? "dark" : "light");
    },
    setClientStomp(state, action: PayloadAction<Client | null>) {
      state.clientStomp = action.payload;
    },
    setProfilePageActive(state, action: PayloadAction<ProfileActive>) {
      state.profilePageActive = action.payload;
    },
  },
});

const GlobalReducer = slice.reducer;

export const {
  setOpenExplorerMenu,
  toggleExplorerMenu,
  setIsDarkTheme,
  toggleChangeTheme,
  setClientStomp,
  setProfilePageActive,
} = slice.actions;
export default GlobalReducer;
