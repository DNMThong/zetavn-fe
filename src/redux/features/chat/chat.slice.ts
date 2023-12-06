import { Call, Message } from "@/types/chat.type";
import { UserContact, UserShort, UserShortPrivate } from "@/types/user.type";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localstorage.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  openChatDetails: boolean;
  openChat: boolean;
  userContacts: UserContact[];
  chatMessageSelected: Message[];
  userContactSelected: UserShortPrivate | null;
  call: Call | null;
  incomingCall: Call | null;
}

const initialState: ChatState = {
  openChatDetails: true,
  openChat: false,
  userContacts: [],
  chatMessageSelected: [],
  userContactSelected: null,
  call: getLocalStorageItem<Call>("call"),
  incomingCall: null,
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenChatDetails(state, action: PayloadAction<boolean>) {
      state.openChatDetails = action.payload;
    },
    toggleOpenChatDetails(state) {
      state.openChatDetails = !state.openChatDetails;
    },
    setOpenChat(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.openChatDetails = true;
        document.body.classList.add("is-frozen");
      } else {
        document.body.classList.remove("is-frozen");
        state.userContactSelected = null;
        state.chatMessageSelected = [];
      }
      state.openChat = action.payload;
    },
    setUserContacts(state, action: PayloadAction<UserContact[]>) {
      state.userContacts = action.payload;
    },
    updateUserContactsByMessage(state, action: PayloadAction<Message>) {
      state.userContacts = state.userContacts.map((item) => {
        if (item.newMessage.id === action.payload.id) {
          return {
            ...item,
            newMessage: action.payload,
          };
        }
        return item;
      });
    },
    addUserContactNew(
      state,
      action: PayloadAction<{
        message: Message;
        userId: string;
      }>
    ) {
      const { message, userId } = action.payload;
      const index = state.userContacts.findIndex((item) => {
        const { sender, reciever } = message;
        return item.user.id === sender.id || item.user.id === reciever.id;
      });
      if (index >= 0 && state.userContacts.length > 0) {
        const contact = state.userContacts[index];

        const userContactNew: UserContact = {
          ...contact,
          totalUnreadMessage:
            contact.user.id === message.sender.id
              ? contact.totalUnreadMessage + 1
              : 0,
          newMessage: message,
        };

        state.userContacts.splice(index, 1);

        state.userContacts = [userContactNew, ...state.userContacts];
      } else if (state.userContacts.length > 0) {
        const userContactNew: UserContact = {
          user:
            message.sender.id === userId ? message.reciever : message.sender,
          totalUnreadMessage: message.sender.id === userId ? 0 : 1,
          newMessage: message,
        };
        state.userContacts = [userContactNew, ...state.userContacts];
      }
    },
    setChatMessageSelected(state, action: PayloadAction<Message[]>) {
      state.chatMessageSelected = action.payload;
    },
    addChatMessageSelectedHead(state, action: PayloadAction<Message>) {
      state.chatMessageSelected = [
        action.payload,
        ...state.chatMessageSelected,
      ];
    },
    addChatMessageSelected(state, action: PayloadAction<Message[]>) {
      state.chatMessageSelected = [
        ...state.chatMessageSelected,
        ...action.payload,
      ];
    },
    updateChatMessageSelected(state, action: PayloadAction<Message>) {
      state.chatMessageSelected = state.chatMessageSelected.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    setUserContactSelected(state, action: PayloadAction<UserShortPrivate>) {
      state.userContactSelected = action.payload;
      const index = state.userContacts.findIndex((item) => {
        return item.user.id === action.payload.id;
      });
      if (index >= 0) {
        state.userContacts[index] = {
          ...state.userContacts[index],
          totalUnreadMessage: 0,
        };
      }
    },
    setCall(state, action: PayloadAction<Call | null>) {
      state.call = action.payload;
      setLocalStorageItem("call", action.payload);
    },
    setIncomingCall(state, action: PayloadAction<Call | null>) {
      state.incomingCall = action.payload;
    },
    offCall(state) {
      state.call = null;
      state.incomingCall = null;
      removeLocalStorageItem("call");
    },
  },
});

const ChatReducer = slice.reducer;

export const {
  setOpenChatDetails,
  setOpenChat,
  toggleOpenChatDetails,
  setUserContacts,
  setChatMessageSelected,
  setUserContactSelected,
  addChatMessageSelectedHead,
  addUserContactNew,
  updateChatMessageSelected,
  updateUserContactsByMessage,
  addChatMessageSelected,
  setCall,
  setIncomingCall,
  offCall,
} = slice.actions;

export default ChatReducer;
