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
import { setClientStomp } from "@/redux/features/global.slice";
import { useLazyGetFriendsQuery } from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { API_URL, NotificationFriendRequest } from "@/types/contants.type";
import { PostNotification } from "@/types/post.type";
import { FriendRequestResponse } from "@/types/response.type";
import User from "@/types/user.type";
import { getLocalStorageItem } from "@/utils/localstorage.util";
import { getSessionData, setSessionData } from "@/utils/session.util";
import { Client } from "@stomp/stompjs";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((selector) => selector.auth.user);
  const accessToken = useAppSelector((selector) => selector.auth.accessToken);
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [relogin] = useLazyReloginQuery();
  const [getFriends] = useLazyGetFriendsQuery();

  const connectStomp = useCallback(() => {
    console.log("accessToken", accessToken);
    if (accessToken) {
      const header = {
        Authorization: `Bearer ${accessToken}`,
      };

      const client = new Client({
        brokerURL: `ws://${API_URL._DOMAIN}/ws`,
        debug: function (str) {
          console.log(str);
        },
      });
      client.onConnect = () => {
        if (user?.id) {
          client.subscribe(`/user/${user.id}/topic/friendship`, (message) => {
            const data: FriendRequestResponse = JSON.parse(message.body);
            if (data.status === NotificationFriendRequest.CANCEL) {
              dispatch(removeFriendRequest(data));
            } else {
              dispatch(addFriendRequestHead(data));
            }
          });

          client.subscribe(
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
  }, [dispatch, user, accessToken]);

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

    const userLogin = getSessionData<User>("userLogin");
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
