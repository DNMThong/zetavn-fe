"use client";
import { useLazyGetContactsQuery } from "@/redux/features/chat/chat.service";
import {
  setUserContacts,
  setUserContactSelected,
} from "@/redux/features/chat/chat.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MessageType } from "@/types/contants.type";
import { UserContact, UserShortPrivate } from "@/types/user.type";
import { calculateTime } from "@/utils/calculate-time.util";
import React, { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { CiImageOn, CiVideoOn } from "react-icons/ci";

const ChatSidebar = () => {
  const [getContacts] = useLazyGetContactsQuery();

  const dispatch = useAppDispatch();
  const { openChat, userContacts, userContactSelected } = useAppSelector(
    (selector) => selector.chat
  );
  const user = useAppSelector((selector) => selector.auth.user);

  useEffect(() => {
    const fetchGetContacts = async () => {
      const response = await getContacts(user?.id || "").unwrap();

      if (response.code === 200) {
        dispatch(setUserContacts(response.data));
        if (response.data.length > 0 && !userContactSelected) {
          dispatch(setUserContactSelected(response.data[0].user));
        }
      }
    };

    if (openChat) {
      fetchGetContacts();
    }
  }, [openChat, getContacts, user, dispatch, userContactSelected]);

  const handleSelectedUserContact = (userSelected: UserShortPrivate) => {
    dispatch(setUserContactSelected(userSelected));
  };

  return (
    <div id="chat-sidebar" className="users-sidebar">
      {/* <!-- Header --> */}

      {/* <!-- User list --> */}
      <div className="conversations-list has-slimscroll-xs ">
        {userContacts.length > 0 &&
          userContacts.map((userContact) => (
            <div
              onClick={() => handleSelectedUserContact(userContact.user)}
              key={userContact.user.id + userContact.newMessage?.createdAt}
              className={`user-item ${
                userContact.user.id === userContactSelected?.id
                  ? "is-active"
                  : ""
              }`}>
              <div className="avatar-container">
                <img
                  className="user-avatar"
                  src={userContact.user.avatar || ""}
                  alt=""
                />
                <div
                  className={`user-status ${
                    userContact.user.isOnline ? "is-online" : ""
                  }`}></div>
              </div>
              <div className="content-wapper">
                <span className="content-title">
                  {userContact.user.display}
                </span>
                <div className="content-bottom">
                  {userContact.totalUnreadMessage > 0 && (
                    <span className="content-notification">
                      {userContact.totalUnreadMessage}
                    </span>
                  )}
                  <div
                    className={`content-desc ${
                      userContact.totalUnreadMessage > 0 ? "is-unread" : ""
                    }`}>
                    {userContact.newMessage.type === MessageType.TEXT &&
                      userContact.newMessage?.message}
                    {userContact.newMessage.type === MessageType.IMAGE && (
                      <span className="content-desc-item">
                        <CiImageOn />
                        <span>Hình ảnh</span>
                      </span>
                    )}
                    {userContact.newMessage.type === MessageType.VIDEO && (
                      <span className="content-desc-item">
                        <CiVideoOn />
                        <span>Video</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="display-date">
                {calculateTime(userContact.newMessage?.createdAt as string)}
              </div>
            </div>
          ))}
      </div>
      {/* <!-- Add Conversation --> */}
      <div className="footer-item">
        <div
          className="add-button modal-trigger"
          data-modal="add-conversation-modal">
          <FiUser />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
