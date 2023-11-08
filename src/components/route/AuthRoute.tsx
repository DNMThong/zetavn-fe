"use client";
import User from "@/types/user.type";
import { getSessionData, setSessionData } from "@/utils/session.util";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageLoader } from "../pageloader";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLazyReloginQuery } from "@/redux/features/auth/auth.service";
import { setAccessToken } from "@/redux/features/auth/auth.slice";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const router = useRouter();
  const [relogin] = useLazyReloginQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRelogin = async () => {
      try {
        const response = await relogin().unwrap();
        if (response.code === 200) {
          const {
            data: { access_token, userInfo },
          } = response;
          if (userInfo.isAuthorized) {
            dispatch(setAccessToken(access_token));
            setSessionData("userLogin", userInfo);
            router.push("/");
          } else {
            router.push(`/confirmation?u=${userInfo.id}`);
          }
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    const userLogin = getSessionData<User>("userLogin");
    if (userLogin) {
      router.push("/");
    } else {
      handleRelogin();
    }
  }, [router, dispatch, relogin]);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("is-dark");
    } else {
      document.body.classList.remove("is-dark");
    }
  }, [isDarkTheme]);

  if (loading) return <PageLoader />;
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

export default AuthRoute;
