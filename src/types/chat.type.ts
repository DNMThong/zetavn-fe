import { MessageStatus, MessageType } from "./contants.type";
import { UserShort, UserShortPrivate } from "./user.type";

export interface Message {
  id: number;
  message: string;
  type: MessageType;
  status: MessageStatus;
  createdAt: string;
  sender: UserShortPrivate;
  reciever: UserShortPrivate;
}
