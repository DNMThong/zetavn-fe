"use client";
import { PageLoader } from "@/components/pageloader";
import { useLazyReloginQuery } from "@/redux/features/auth/auth.service";
import { setAccessToken, setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import User from "@/types/user.type";
import { getSessionData, setSessionData } from "@/utils/session.util";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((selector) => selector.auth);
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [relogin] = useLazyReloginQuery();

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
    } else {
      handleRelogin();
    }
  }, [user, router, dispatch, relogin]);

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
