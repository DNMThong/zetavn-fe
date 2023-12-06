"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";
import { PageLoader } from "../pageloader";
import { getSessionData, setSessionData } from "@/utils/session.util";
import { setUser } from "@/redux/features/auth/auth.slice";
import { setClientStomp } from "@/redux/features/global.slice";
import { useLazyReloginQuery } from "@/redux/features/auth/auth.service";
import { API_URL } from "@/types/contants.type";
import { UserProfile } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { offCall, setCall } from "@/redux/features/chat/chat.slice";

const CallRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((selector) => selector.auth.user);

  const accessToken = useAppSelector((selector) => selector.auth.accessToken);
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [relogin] = useLazyReloginQuery();
  const subscriptions = useRef<StompSubscription[]>([]);

  const connectStomp = useCallback(() => {
    if (subscriptions.current.length > 0) {
      subscriptions.current.forEach((subscription) =>
        subscription.unsubscribe()
      );
      subscriptions.current = [];
    }

    if (accessToken && user?.id) {
      const header = {
        Authorization: `Bearer ${accessToken}`,
        saveActivityLog: "false",
      };

      const client = new Client({
        brokerURL: `ws://${API_URL._DOMAIN}/ws`,
        // debug: function (str) {
        //   console.log(str);
        // },
      });
      client.onConnect = () => {
        if (user?.id) {
          const subscribeRejectCall = client.subscribe(
            `/user/${user.id}/topic/reject-call`,
            () => {
              window.close();
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

  if (loading) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default CallRoute;
