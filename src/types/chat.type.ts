import {
  CallStatus,
  CallType,
  MessageCallStatus,
  MessageStatus,
  MessageType,
} from "./contants.type";
import { UserShort, UserShortPrivate } from "./user.type";

export interface Message {
  id: number;
  message: string;
  type: MessageType;
  status: MessageStatus;
  createdAt: string;
  sender: UserShortPrivate;
  reciever: UserShortPrivate;
  call: MessageCall | null;
}

export interface Call {
  user: UserShort;
  status: CallStatus;
  callType: CallType;
  roomId: string;
}

export interface IncomingCall {
  from: UserShort;
  type: CallType;
  roomId: string;
}

export interface MessageCall {
  duration: number;
  status: MessageCallStatus;
  type: CallType;
}
