import { API_URL } from "@/types/contants.type";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localstorage.util";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";


interface GlobalState {
  openExplorerMenu: boolean;
  openChat: boolean;
  isDarkTheme: boolean;
  clientStomp: Client | null;
}

const initialState: GlobalState = {
  openExplorerMenu: false,
  openChat: false,
  isDarkTheme: getLocalStorageItem<string>("theme")
    ? getLocalStorageItem<string>("theme") === "dark"
    : true,
  clientStomp: null,
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
    setClientStomp(state, action: PayloadAction<Client>) {
      state.clientStomp = action.payload;
    },
  }
});

const GlobalReducer = slice.reducer;

export const {
  setOpenExplorerMenu,
  toggleExplorerMenu,
  setOpenChat,
  setIsDarkTheme,
  toggleChangeTheme,
  setClientStomp,
} = slice.actions;
export default GlobalReducer;
