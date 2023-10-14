"use client";
import { PageLoader } from "@/components/pageloader";
import { setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import User from "@/types/user.type";
import { getSessionData } from "@/utils/session.util";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((selector) => selector.auth);
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const userLogin = getSessionData<User>("userLogin");
    if (userLogin) {
      if (!user) {
        dispatch(setUser(userLogin));
      }
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [user, router, dispatch]);

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
