"use client";
import { PageLoader } from "@/components/pageloader";
import { useLazyReloginQuery } from "@/redux/features/auth/auth.service";
import {
  addFriendRequestHead,
  addPostNotificationHead,
  removeFriendRequest,
  removePostNotification,
  setAccessToken,
  setFriends,
  setUser,
} from "@/redux/features/auth/auth.slice";
import { useUpdateReadChatMessageMutation } from "@/redux/features/chat/chat.service";
import {
  addChatMessageSelectedHead,
  addUserContactNew,
  offCall,
  setIncomingCall,
  updateChatMessageSelected,
  updateUserContactsByMessage,
} from "@/redux/features/chat/chat.slice";
import { setClientStomp } from "@/redux/features/global.slice";
import { useLazyGetFriendsQuery } from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IncomingCall, Message } from "@/types/chat.type";
import {
  API_URL,
  CallStatus,
  NotificationFriendRequest,
} from "@/types/contants.type";
import { PostNotification } from "@/types/post.type";
import { FriendRequestResponse } from "@/types/response.type";
import User, { UserProfile } from "@/types/user.type";
import { detectDeviceType, getIPAddress } from "@/utils/get-info.utils";
import { getLocalStorageItem } from "@/utils/localstorage.util";
import { getSessionData, setSessionData } from "@/utils/session.util";
import { Client, StompSubscription } from "@stomp/stompjs";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((selector) => selector.auth.user);
  const { userContactSelected, openChat, userContacts } = useAppSelector(
    (selector) => selector.chat
  );

  const accessToken = useAppSelector((selector) => selector.auth.accessToken);
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [relogin] = useLazyReloginQuery();
  const [getFriends] = useLazyGetFriendsQuery();
  const [updateReadChatMessage] = useUpdateReadChatMessageMutation();
  const clientStomp = useAppSelector((selector) => selector.global.clientStomp);
  const subscriptions = useRef<StompSubscription[]>([]);

  const connectStomp = useCallback(() => {
    if (subscriptions.current.length > 0) {
      subscriptions.current.forEach((subscription) =>
        subscription.unsubscribe()
      );
      subscriptions.current = [];
    }

    let ip_address: string | null = "";
    const device_information: string = detectDeviceType();

    getIPAddress().then((response) => {
      ip_address = response;
    });

    if (accessToken && user?.id) {
      const header = {
        Authorization: `Bearer ${accessToken}`,
        ip_address,
        device_information,
        saveActivityLog: "true",
      };

      const client = new Client({
        brokerURL: `ws://${API_URL._DOMAIN}/ws`,
        debug: function (str) {
          console.log(str);
        },
      });
      client.onConnect = () => {
        if (user?.id) {
          const subscribeFriendship = client.subscribe(
            `/user/${user.id}/topic/friendship`,
            (message) => {
              const data: FriendRequestResponse = JSON.parse(message.body);
              if (data.status === NotificationFriendRequest.CANCEL) {
                dispatch(removeFriendRequest(data));
              } else {
                dispatch(addFriendRequestHead(data));
              }
            }
          );
          subscriptions.current.push(subscribeFriendship);

          const subscribePostNotification = client.subscribe(
            `/user/${user.id}/topic/post-notification`,
            (message) => {
              const data: PostNotification = JSON.parse(message.body);
              if (data.isCancel) {
                dispatch(removePostNotification(data.id));
              } else {
                dispatch(addPostNotificationHead(data));
              }
            }
          );
          subscriptions.current.push(subscribePostNotification);

          const subscribeMessage = client.subscribe(
            `/user/${user.id}/topic/message`,
            async (data) => {
              const message: Message = JSON.parse(data.body);
              dispatch(
                addUserContactNew({
                  message: message,
                  userId: user.id,
                })
              );

              if (
                openChat &&
                userContactSelected &&
                message.sender.id === userContactSelected.id
              ) {
                dispatch(addChatMessageSelectedHead(message));
                const response = await updateReadChatMessage(
                  message.id
                ).unwrap();
                if (response.code === 201) {
                  dispatch(updateChatMessageSelected(response.data));
                  dispatch(updateUserContactsByMessage(response.data));
                }
              }
            }
          );
          subscriptions.current.push(subscribeMessage);

          const subscribeUpdateRead = client.subscribe(
            `/user/${user.id}/topic/message/update-read`,
            (data) => {
              const message: Message = JSON.parse(data.body);
              if (
                openChat &&
                userContactSelected &&
                message.reciever.id === userContactSelected.id
              ) {
                dispatch(updateChatMessageSelected(message));
              }
              dispatch(updateUserContactsByMessage(message));
            }
          );
          subscriptions.current.push(subscribeUpdateRead);

          const subscribeIncomingCall = client.subscribe(
            `/user/${user.id}/topic/incoming-call`,
            (data) => {
              const incomingCall: IncomingCall = JSON.parse(data.body);
              dispatch(
                setIncomingCall({
                  user: incomingCall.from,
                  callType: incomingCall.type,
                  roomId: incomingCall.roomId,
                  status: CallStatus.IN_COMING,
                })
              );
            }
          );
          subscriptions.current.push(subscribeIncomingCall);

          const subscribeRejectCall = client.subscribe(
            `/user/${user.id}/topic/reject-call`,
            () => {
              dispatch(offCall())
            }
          );
          subscriptions.current.push(subscribeRejectCall);
        }
      };

      client.beforeConnect = () => {
        return new Promise<void>((resolve, _) => {
          client.connectHeaders = header;
          resolve();
        });
      };

      client.onStompError = (err) => {
        console.log("ERROR!!!!!!!!!!!!!!!", err);
      };
      client.activate();
      dispatch(setClientStomp(client));
    }
  }, [
    dispatch,
    user,
    accessToken,
    userContactSelected,
    openChat,
    updateReadChatMessage,
  ]);

  useEffect(() => {
    const handleRelogin = async () => {
      try {
        const response = await relogin().unwrap();
        if (response.code === 200) {
          const {
            data: { userInfo },
          } = response;
          dispatch(setUser(userInfo));
          setSessionData("userLogin", userInfo);
          setLoading(false);
          connectStomp();
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      }
    };

    const userLogin = getSessionData<UserProfile>("userLogin");
    if (userLogin) {
      if (!user) {
        dispatch(setUser(userLogin));
      }
      setLoading(false);
      connectStomp();
    } else {
      handleRelogin();
    }
  }, [user, router, dispatch, relogin, connectStomp]);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("is-dark");
    } else {
      document.body.classList.remove("is-dark");
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const fetchQueryGetFriends = async () => {
      try {
        if (user?.id) {
          const response = await getFriends(user.id).unwrap();
          if (response.code === 200) {
            dispatch(setFriends(response.data));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchQueryGetFriends();
  }, [user, getFriends, dispatch]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkTheme ? "dark" : "light"}
      />
    </>
  );
};

export default PrivateRoute;
