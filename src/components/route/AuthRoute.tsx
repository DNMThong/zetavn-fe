"use client";
import User from "@/types/user.type";
import { getSessionData } from "@/utils/session.util";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageLoader } from "../pageloader";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { isDarkTheme } = useAppSelector((selector) => selector.global);
  const router = useRouter();

  useEffect(() => {
    const userLogin = getSessionData<User>("userLogin");
    if (userLogin) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

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
