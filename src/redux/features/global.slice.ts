import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localstorage.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  openExplorerMenu: boolean;
  openChat: boolean;
  isDarkTheme: boolean;
}

const initialState: GlobalState = {
  openExplorerMenu: false,
  openChat: false,
  isDarkTheme: getLocalStorageItem<string>("theme") === "dark" || true,
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
    setOpenChat(state, action: PayloadAction<boolean>) {
      state.openChat = action.payload;
    },
    setIsDarkTheme(state, action: PayloadAction<boolean>) {
      state.isDarkTheme = action.payload;
      setLocalStorageItem("theme", state.isDarkTheme ? "dark" : "light");
    },
    toggleChangeTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
      setLocalStorageItem("theme", state.isDarkTheme ? "dark" : "light");
    },
  },
});

const GlobalReducer = slice.reducer;

export const {
  setOpenExplorerMenu,
  toggleExplorerMenu,
  setOpenChat,
  setIsDarkTheme,
  toggleChangeTheme,
} = slice.actions;
export default GlobalReducer;
